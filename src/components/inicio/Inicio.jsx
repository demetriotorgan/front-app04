import React, { useEffect, useState } from 'react'
import './Inicio.css'
import { Link } from 'react-router-dom'
import { getCondicionaisRecentes, getRecebimentosRecentes, getVendasRecentes } from '../../utils/recentesHandleApi';
import { formatarDataEditar, formatarDataExibir, formataValor, voltarAoTopo } from '../../utils/formatar';

const Inicio = () => {
  const [vendasRecentes, setVendasRecentes] = useState([]);
  const [recebimentosRecentes, setRecebimentosRecentes] = useState([]);
  const [condicionaisRecentes, setCondicionaisRecentes] = useState([]);

  useEffect(()=>{
    getVendasRecentes(setVendasRecentes);
    getRecebimentosRecentes(setRecebimentosRecentes);
    getCondicionaisRecentes(setCondicionaisRecentes);
  },[]);

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
            {vendasRecentes.map((venda, index)=>(
              <div className='card-recente' key={index}>
                    <p className='recentes-cliente'><i className="fa-solid fa-person-circle-plus"></i><strong> {venda.cliente}</strong></p>    
                    <p>Valor: {formataValor(venda.valor)}</p>
                    <p>Data: {formatarDataExibir(venda.data)}</p>
              </div>
            ))}        
        <Link to="/vendas"><button className='button-info' type='button'>Ver Vendas</button></Link>        
        </div>
    </div>
    
    <div className='info-container'>
    <h3><i className="fa-solid fa-sack-dollar"></i>Recebimentos Recentes</h3>
      <div className='recentes'>        
            {recebimentosRecentes.map((recebimento, index)=>(
              <div className='card-recente' key={index}>
              <p className='recentes-cliente'><i className="fa-solid fa-person-circle-plus"></i><strong> {recebimento.cliente}</strong></p>    
              <p>Valor: {formataValor(recebimento.valor)}</p>
              <p>Data: {formatarDataExibir(recebimento.data)}</p>
            </div>  
            ))}
      </div>      
      <Link to="/recebimentos"><button className='button-info' type='button'>Ver Recebimentos</button></Link>
    </div>

    <div className='info-container'>
    <h3><i className="fa-solid fa-money-check-dollar"></i>Últimos Condicionais</h3>
      <div className='recentes'>        
            {condicionaisRecentes.map((condicional, index)=>(
              <div className='card-recente' key={index}>
                <p className='recentes-cliente'><i className="fa-solid fa-person-circle-plus"></i><strong> {condicional.cliente}</strong></p>                
                <p>Data: {formatarDataExibir(condicional.data)}</p>
                <p className={condicional.produtos.length == 0 ? 'recentes-condicional-concluido' : 'recentes-condicional-devolvido'}>Condicional: {condicional.produtos.length == 0 ? 'Devolvido' : 'Em Aberto'}</p>
              </div>
            ))}
      </div>
      <Link to="/condicional"><button className='button-info' type='button'>Ver Condicionais</button></Link>
    </div>    
  </>
  )
}

export default Inicio