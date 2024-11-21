import React from 'react'
import './Inicio.css'
import { Link } from 'react-router-dom'

const Inicio = () => {
  return (
  <>
    <div className="menu-container">
      <div className="menu-item item1"><Link to="/vendas"><i className="fa-solid fa-bag-shopping"></i>Cadastrar Venda</Link></div>
      <div className="menu-item item2"><Link to="/listarvendas"><i className="fa-solid fa-comments-dollar"></i>Listar Vendas</Link></div>
      <div className="menu-item item3"><Link to="/estoque"><i className="fa-solid fa-gear"></i>Estoque</Link></div>
      <div className="menu-item item4"><Link to="/condicional"><i className="fa-solid fa-money-check-dollar"></i>Condicionais</Link></div>
    </div>
    <div className='info-container'>
      <h3><i className="fa-solid fa-cart-plus"></i>Vendas Recentes</h3>      
      <div className='recentes'>        
        <div className='card-recente'>
          <h4>Cliente:</h4>    
          <p>Valor:</p>
          <p>Data:</p>
        </div>
        <div className='card-recente'>
          <h4>Cliente:</h4>    
          <p>Valor:</p>
          <p>Data:</p>
        </div>
        <div className='card-recente'>
          <h4>Cliente:</h4>    
          <p>Valor:</p>
          <p>Data:</p>
        </div>
      </div>
      <Link to="/vendas"><button className='button-info' type='button'>Ver Vendas</button></Link>
      </div>

    <div className='info-container'>
    <h3><i className="fa-solid fa-sack-dollar"></i>Recebimentos Recentes</h3>
      <div className='recentes'>        
        <div className='card-recente'>
          <h4>Cliente:</h4>    
          <p>Valor:</p>
          <p>Data:</p>
        </div>
        <div className='card-recente'>
          <h4>Cliente:</h4>    
          <p>Valor:</p>
          <p>Data:</p>
        </div>
        <div className='card-recente'>
          <h4>Cliente:</h4>    
          <p>Valor:</p>
          <p>Data:</p>
        </div>        
      </div>      
      <Link to="/recebimentos"><button className='button-info' type='button'>Ver Recebimentos</button></Link>
    </div>

    <div className='info-container'>
    <h3><i className="fa-solid fa-money-check-dollar"></i>Últimos Condicionais</h3>
      <div className='recentes'>        
        <div className='card-recente'>
          <h4>Cliente:</h4>    
          <p>Valor:</p>
          <p>Data:</p>
        </div>
      </div>
      <Link to="/condicional"><button className='button-info' type='button'>Ver Condicionais</button></Link>
    </div>
  </>
  )
}

export default Inicio