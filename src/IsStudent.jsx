import React,{useEffect} from 'react';
import { CreateCustomer, getOrderStatus, setOrderStatus,   } from '../hooks/hooks'
import { CircleNotch } from "phosphor-react";
import { Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'


function IsStudent() {
  const orderStatus = getOrderStatus()
  
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

  if(orderStatus?.payload !== 4){
    return( 
      <div>
        <p>{`${customer?.first_name}Parece que seu pagamento não foi efetivado, ProAluno! Aguarde o email de confirmação.`}</p>
      </div>
      );
}
    setOrderStatus(true)
    return(
      <Container>
        <Row>
          <Col className='d-flex flex-column'>
      <h2 className='text-center text-uppercase mb-5 text-black-60 fs-6 lh-sm'>{`Olá ${customer?.first_name}! Que legal, voce é um ProAluno, vamos conhecer a plataforma?`}</h2>
              <iframe width="350" height="260" src="https://www.youtube.com/embed/YL2UJz4RiCA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <a href="https://proenem.com.br" className='mt-5'>Ir para plataforma</a>
        </Col>
        </Row>
      </Container>
    )
  }



export default IsStudent;