import React, { useState } from 'react'
import './Recebimentos.css';
import { pagamentosPorMes } from '../../utils/pagamentoHandleApi';
import { Bounce, ToastContainer } from 'react-toastify';
import { formatarDataExibir, formataValor } from '../../utils/formatar';

const Recebimentos = () => {
  const [mes, setMes] = useState(1);
  const [ano, setAno] = useState(2024);
  const [pagamentos, setPagamentos] = useState('');

  const valorRecebido = (pagamentos)=>{
      return pagamentos.reduce((acumulador, recebido)=> acumulador + recebido.valor, 0);
  }

  const totalRecebido = (vendas)=>{
      return vendas.reduce((total, venda)=>{
        const somaPagamentos = venda.pagamentos.reduce((soma, pagamento)=> soma + pagamento.valor,0);
        return total + somaPagamentos;
      },0);
  }

  return (
    <>
    <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    transition={Bounce}
    />

      <div className='form-container'>
        <h2>Recebimentos</h2>
        <div className='form-recebimentos'>
          <label>Mês</label>
          <select
          name='mes'
          value={mes}
          onChange={(e) => setMes(e.target.value)}
          >            
          <option value="1">JAN</option>
          <option value="2">FEV</option>
          <option value="3">MAR</option>
          <option value="4">ABR</option>
          <option value="5">MAI</option>
          <option value="6">JUN</option>
          <option value="7">JUL</option>
          <option value="8">AGO</option>
          <option value="9">SET</option>
          <option value="10">OUT</option>
          <option value="11">NOV</option>
          <option value="12">DEZ</option>
          </select>
          <label>Ano</label>
          <input
          type='text'
          value={ano}
          onChange={(e)=>setAno(e.target.value)}
          />
        </div>        
        <div className='form-button'>
          <button type='button' onClick={()=>pagamentosPorMes(setPagamentos,mes, ano)}>Buscar</button>       
        </div>
      </div>
      {pagamentos ? 
      <div className='painel-pagamentos'>
        <h2>Pagamentos</h2>
        <small> <i className="fa-solid fa-sack-dollar"></i> Valor Total: {formataValor(totalRecebido(pagamentos))}</small>        
          {pagamentos.map((pagamento, index)=>(
            <div className='card-pagamento' key={index}>
            <h3>Cliente: {pagamento.nome} </h3>
            <small>Valor da Venda: {formataValor(pagamento.valor)} </small>
              {pagamento.pagamentos.map((recebido, index)=>(
                <div className='card-pagamento-info' key={index}>
                <p>Data: <strong>{formatarDataExibir(recebido.data)}</strong></p>
                <p>Valor: <strong>{formataValor(recebido.valor)}</strong></p>
                <p>Tipo: <strong>{recebido.tipo}</strong></p>                
              </div>              
              ))}        
              <div className='valor-recebido'>
                  <p>Total Recebido: <strong>{formataValor(valorRecebido(pagamento.pagamentos))}</strong></p>
                  <p>Total Restante: {formataValor(pagamento.valor - valorRecebido(pagamento.pagamentos))} </p>
                </div>      
          </div>              
          ))}          
      </div>
      : '' }
    </>
  )
}

export default Recebimentos