import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
    <div className='footer-container'>
        <div className='footer-icon efeito-button'><Link to="/"><i className="fa-solid fa-house"></i>Início</Link></div>
        <div className='footer-icon efeito-button'><Link to="/condicional"><i className="fa-solid fa-money-check-dollar"></i>Condicional</Link></div>
        <div className='footer-icon efeito-button'><Link to="/vendas"><i className="fa-solid fa-bag-shopping"></i>Venda</Link></div>
        <div className='footer-icon efeito-button'><Link to="/recebimentos"><i className="fa-solid fa-cash-register"></i>Recebimentos</Link></div>
    </div>
    </>
  )
}

export default Footer