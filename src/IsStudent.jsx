import React,{useEffect, useState} from 'react';
import { CreateCustomer, getOrderStatus, setOrderStatus,   } from '../hooks/hooks'
import { CircleNotch } from "phosphor-react";
import { Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

import logo from '../content/logoproenembranco.png'


function IsStudent() {
  let orderData = getOrderStatus()
  let orderStatus = orderData?.payload?.resource?.status?.data?.id
  let orderName = orderData?.payload?.resource?.status?.data?.name
  let customer = orderData?.payload?.resource?.customer?.data



  if(orderData.loading){
    return(
    <div className='container'>
    <CircleNotch weight="bold" className="animate-spin" />
    </div>
    )
  } 
  if(orderName !== undefined){
    setOrderStatus(orderName)

  if(orderStatus !== 4){
    return( 
      <Container>
          <Row className='d-flex flex-column '>
          <Col className='d-flex flex-column justify-content-start' >
        <p className='text-center fs-4 fw-light'>{`${customer?.first_name}, Parece que seu pagamento não foi efetivado! Aguarde o email de confirmação.`}</p>
        </Col>
        </Row>
      </Container> 
      );
}
if(orderStatus === 4){
    return(
      <Container>
        <Row style={{ width:'100%', height:'80vh'}} className="d-flex flex-column justify-content-center">
       
          <Col  className='d-flex flex-column justify-content-start'>
      <h2 className='text-center text-uppercase mb-5 text-black-60 fs-6 lh-sm'>{`Olá ${customer?.first_name}! Que legal, você é ProAluno(a), vamos conhecer a plataforma?`}</h2>
              <iframe className="mx-auto videoplayer" style={{ borderRadius: 4}} src="https://www.youtube.com/embed/YL2UJz4RiCA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <a href="https://proenem.com.br" className='mt-5 mx-auto text-decoration-none text-white py-3 px-4' style={{background:'purple', borderRadius: 4}}>Ir para plataforma</a>
        </Col>
        </Row>
      </Container>
    )
  }}else{
    return(
      <div className='container'>
      <CircleNotch weight="bold" className="animate-spin" />
      </div>
      )
  }}

export default IsStudent;