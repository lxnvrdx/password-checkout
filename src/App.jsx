import React from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CreateCustomer } from '../hooks/hooks'
import { CircleNotch } from "phosphor-react";
import './index.css'
import { Formik } from 'formik';
import { SendData} from './SendData'
function App() {
  const data = CreateCustomer()
  let customer = data?.payload?.resource
  if(customer === undefined){
  customer = data?.payload
  }


  if(data.loading){
    return(
    <div className='container'>
    <CircleNotch weight="bold" className="animate-spin" />
    </div>
    )
  } 


  return (
    <Container className='d-flex justify-content-center flex-column gap-2 col-12'>
    <h1 className='text-dark'>{`Olá, ${customer.first_name}! Vamos criar sua conta?`}</h1>
    <Formik
       initialValues={{ email:customer.email, password: '',first_name:customer.first_name, cpf: customer.cpf, id:customer.id, payment: false }}
       validate={values => {
         const errors = {};
         if (!values.password) {
           errors.email = 'O campo não pode ser vazio';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         SendData(values)
         setTimeout(() => {
          window.location.href = "/IsStudent"
         }, 500);

       }}
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit}>
           <input
             type="email"
             name="email"
             placeholder={customer.email}
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
             disabled={true}
           />
           {errors.email && touched.email && errors.email}
           <input
             type="password"
             name="password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
           />
          {errors.password && touched.password && errors.password}
           <button type="submit" disabled={isSubmitting}>
             Criar Conta
           </button>
         </form>
       )}
     </Formik> 
    </Container> 
  )
}

export default App
