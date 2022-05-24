import React, { useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CreateCustomer,getOrderStatus, CreateStudent } from '../hooks/hooks'
import { CircleNotch } from "phosphor-react";
import './index.css'
import { Formik } from 'formik';
import logo from '../content/logoproenembranco.png'
function App() {
  let orderData = getOrderStatus()
  let customer = orderData?.payload?.resource?.customer?.data 
  let paymentStatus = orderData?.payload?.resource?.status?.data?.name

  if(orderData.loading){
    return(
    <div className='container'>
    <CircleNotch weight="bold" className="animate-spin" />
    </div>
    )
  } 

  
  return (
    <Container className='d-flex justify-content-center flex-column gap-2 col-12'>
      <Col className='col-3'>
      <img src={logo} alt="logo proenem" className='img-fluid  mx-auto' />

      </Col>
    <h1 className='text-white-70 mb-4'>{`Olá, ${customer.first_name}! Vamos criar sua conta?`}</h1>
    <Formik
       initialValues={{ email:customer.email, password: '',passwordConfirmation: '', first_name:customer.first_name, cpf: customer.cpf, id:customer.id, payment: paymentStatus }}
       validate={values => {
         const errors = {};
         if (!values.password && !values.passwordConfirmation) {
           errors.password = 'O campo não pode ser vazio'; 
           errors.passwordConfirmation = 'O campo não pode ser vazio';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.password = 'Invalid email address';
         }
         return errors;
       }}
       onSubmit={(values) => {
         setTimeout(() => {
        CreateStudent(values)
          }, 2000);
          setTimeout(() => {
           window.location.href = "/IsStudent"
          }, 6000);

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
             label="Senha"
             type="password"
             name="password"
             placeholder='Coloque aqui sua senha'
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
           />
          {errors.password && touched.password && errors.password}
          <input
             type="password"
             name="passwordConfirmation"
             placeholder='Confirme aqui sua senha'
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.passwordConfirmation}
           />
          {errors.passwordConfirmation && touched.passwordConfirmation && errors.passwordConfirmation}
          {(values.passwordConfirmation !== values.password) && (touched.passwordConfirmation && touched.password) ? (<p className='text-white'>As senhas não conferem</p>):( 
           <button type="submit" disabled={isSubmitting}>
             Criar Conta
           </button>
          )}
         </form>
       )}
     </Formik> 
    </Container> 
  )
}

export default App
