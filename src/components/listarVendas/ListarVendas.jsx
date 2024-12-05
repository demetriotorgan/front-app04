import React, { useEffect, useState } from 'react'
import { deleteVenda, getVendas } from '../../utils/vendaHandleApi';
import './ListarVendas.css'
import { formatarDataExibir, formataValor } from '../../utils/formatar';
import SemPagamento from './SemPagamento/SemPagamento';
import PagamentoModal from './PagamentoModal/PagamentoModal';
import { Bounce, ToastContainer } from 'react-toastify';
import { excluirPagamento } from '../../utils/pagamentoHandleApi';

const ListarVendas = () => {
  const [vendas, setVendas] = useState([]);
  const [cliente, setCliente] = useState('');
  const [vendaPesquisada, setVendaPesquisada] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [dadosVenda, setDadosVenda] = useState('');
  const [exibirVendas, setExibirVendas] = useState(false);

  useEffect(()=>{
    getVendas(setVendas);
  },[])

  const exibirVenda = (item)=>{
    setVendaPesquisada(item);
    setCliente(item.cliente);
  }

  const totalPagamentos = (pagamentos)=>{
      return pagamentos.reduce((acumulador, pagamento)=>acumulador + pagamento.valor,0)
  }

  const cadastrarPagamento = (venda)=>{
    setDadosVenda(venda);
    setOpenModal(true);
  }
  return (
    <>
      <PagamentoModal
      openModal={openModal}
      setOpenModal={setOpenModal}
      dadosVenda={dadosVenda}
      setCliente={setCliente}
      setVendas={setVendas}
      />
      
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
        <h2>Buscar Venda</h2>
        <label>Cliente</label>
        <input           
          type='text'
          name='cliente'
          placeholder='Digite o nome do cliente'
          value={cliente}
          onChange={(e)=>setCliente(e.target.value)}
          required
          />    
          <div className='dropdown'>
          {vendas.filter(item=>{
            const codigoBusca = cliente.toLowerCase();
            const codigoCompleto = item.cliente.toLowerCase()
            return codigoBusca && codigoCompleto.startsWith(codigoBusca) && codigoCompleto !== codigoBusca;
        }).map((item, index)=>(
            <div className='dropdown-row' key={index} onClick={()=>exibirVenda(item)}>
              <div className='cliente-venda-info'>
                <p>{item.cliente}</p>
                <p>{formataValor(item.valor)}</p>
                <p>{formatarDataExibir(item.data)}</p>
              </div>
                
            </div>
        ))}
      </div>
      </div>    

      {vendaPesquisada && cliente &&
      <div className='card-venda-pesquisada'>        
        <p><strong>Cliente:</strong> {vendaPesquisada.cliente}</p>        
        <p><strong>Data:</strong> {formatarDataExibir(vendaPesquisada.data)}</p>
        <p><strong>Produtos</strong></p>
        <table className='tabelaProdutos-modal'>
                            <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Descrição</th>
                                <th>Valor</th>
                            </tr>
                            </thead>                            
                            <tbody>
                            {vendaPesquisada.produtos.map((item, index)=>(
                                <tr key={index}>
                                   <td>{item.codigo}</td> 
                                   <td>{item.descricao}</td> 
                                   <td>{formataValor(item.pv)}</td>                                    
                                </tr>                                                                                                                       
                            ))}    
                            </tbody>                                                                                
                        </table>    
          <h3 className='valor-venda'>Valor: {formataValor(vendaPesquisada.valor)}</h3>
          <h1>Pagamentos</h1>
          {vendaPesquisada.pagamentos.length ? 
          vendaPesquisada.pagamentos.map((pagamento, index)=>(
            <div className='pagamento-venda' key={index}>              
              <div className='info-pagamento'>
                <p>Valor: {formataValor(pagamento.valor)}</p>
                <p>Data: {formatarDataExibir(pagamento.data)}</p>
                <p>Forma: {pagamento.tipo}</p>                
                <button className='button-excluir-pagamento' onClick={()=>excluirPagamento(vendaPesquisada._id,pagamento._id, setVendas, setCliente)}>Excluir Pagamento</button>
              </div>              
            </div>            
          ))
          :
          <div className='inserir-pagamento'>
                  <SemPagamento data={vendaPesquisada.data} />
                  <button className='botao-adicionar-pagamento' onClick={()=>cadastrarPagamento(vendaPesquisada)}>Adicionar Pagamento</button> 
              </div>
          }
          {vendaPesquisada.pagamentos.length ?          
          <div className='total-pagamentos'>
             <h3>Valor Pago:</h3>
             <h3 className='valor-pago'>{formataValor(totalPagamentos(vendaPesquisada.pagamentos))}</h3>
             <h3>Valor Restante:</h3>
             <h3 className='valor-restante'> {formataValor((vendaPesquisada.valor)-(totalPagamentos(vendaPesquisada.pagamentos)))}</h3>
              <div className='inserir-pagamento'>
                  <button className='botao-adicionar-pagamento' onClick={()=>cadastrarPagamento(vendaPesquisada)}>Adicionar Pagamento</button> 
              </div>
          </div>          
          :''
          }
      </div>
      }
      
      <div className='form-container'>
        <h2>Listar Vendas</h2>
        <button className='botao-listar-vendas' onClick={()=>setExibirVendas(!exibirVendas)}>Exibir</button>
      </div>
      {exibirVendas &&
      <div className='painel-vendas'>
        {vendas.map((venda, index)=>(
          <div className='card-venda' key={index}>
              <h4>Cliente: {venda.cliente}</h4>
              <p>Data: {formatarDataExibir(venda.data)}</p>
              <p>Valor: {formataValor(venda.valor)}</p>
              <p>Parcelas: {venda.parcelas}</p>
              <p>Pagamentos Realizados: {venda.pagamentos.length}</p>
              <p>Total Pago: {formataValor(totalPagamentos(venda.pagamentos))}</p>
              <div>
                {totalPagamentos(venda.pagamentos) >= venda.valor ? 
                <p className='status-venda-encerrada'> <i className="fa-solid fa-hand-holding-dollar"></i>Venda Encerrada</p> :
                <p className='status-venda-aberta'>Venda em Aberto</p>}
              </div>
              <button className='botao-exlcuir-venda' onClick={()=>deleteVenda(venda._id, setVendas, setCliente, setVendaPesquisada)}>Excluir Venda</button>
          </div>
        ))}
      </div>
}
    </>
  )
}

export default ListarVendas