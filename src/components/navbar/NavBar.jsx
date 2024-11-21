import React from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'
import borboleta from '../../assets/borboleta.png'

const NavBar = () => {
  return (
    <>
        <nav>        
          <div className='logo'>
          <img src={borboleta} alt="" />
          <div className='logo-texto' >
          <h2>Closet</h2>
          <small>Malumi</small>
          </div>
          </div>    
        
        
            <input type='checkbox' id='sidebar-active' />
            <label htmlFor='sidebar-active' className='open-sidebar-button'>
            <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#5f6368"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
            </label>
            
            <label id='overlay' htmlFor='sidebar-active'></label>
            <div className='links-container'>
                <label htmlFor='sidebar-active' className='close-sidebar-button'>
                <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#5f6368"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                </label>
                
                <Link to="/" className='home-link link'><i className="fa-solid fa-house"></i>Início</Link>
                <Link to="/estoque" className='link'><i className="fa-solid fa-gear"></i> Estoque</Link>
                <Link to="vendas" className='link'><i className="fa-solid fa-bag-shopping"></i>Vendas</Link>
                <Link to="/condicional" className='link'><i className="fa-solid fa-money-check-dollar"></i>Condicional</Link>
                <Link to="/recebimentos" className='link'><i className="fa-solid fa-sack-dollar"></i>Recebimentos</Link>
                <Link to="/listarvendas" className='link'><i className="fa-solid fa-comments-dollar"></i>Listar Vendas</Link>
            </div>            
        </nav>
    </>
  )
}

export default NavBar