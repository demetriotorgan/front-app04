import React, { useEffect, useState } from 'react'
import { deleteVenda, getVendas } from '../../utils/vendaHandleApi';
import './ListarVendas.css'
import { formatarDataEditar, formatarDataExibir, formataValor, voltarAoTopo } from '../../utils/formatar';
import SemPagamento from './SemPagamento/SemPagamento';
import PagamentoModal from './PagamentoModal/PagamentoModal';
import { Bounce, ToastContainer } from 'react-toastify';
import { excluirPagamento } from '../../utils/pagamentoHandleApi';
import { getProdutosEstoque } from '../../utils/estoqueHandleApi';

const ListarVendas = () => {
  const [vendas, setVendas] = useState([]);
  const [cliente, setCliente] = useState('');
  const [vendaPesquisada, setVendaPesquisada] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [dadosVenda, setDadosVenda] = useState('');
  const [exibirVendas, setExibirVendas] = useState(false);  

  const [editarVenda, setEditarVenda] = useState('');  
  const [editarPagamentoId, setEditarPagamentoId] = useState('');  
  const [editarDataPagamento, setEditarDataPagamento]= useState('');
  const [valor, setValor] = useState('');
  const [editarTipoPagamento, setEditarTipoPagamento]= useState('');
  const [updateMode, setUpdateMode] = useState(false);    
  const [listaProdutos,setListaProdutos] = useState([]);
  const [produtosEstoque, setProdutosEstoque] = useState([]);

  const [formPagamento, setFormPagamento] = useState({            
    data:'',
    valor:'',
    tipo:''
})

useEffect(()=>{
    getProdutosEstoque(setListaProdutos, setProdutosEstoque);      
    getVendas(setVendas);
  },[])

  const exibirVenda = (item)=>{
    setVendaPesquisada(item);
    setCliente(item.cliente);
    voltarAoTopo();
  }

  const totalPagamentos = (pagamentos)=>{
      return pagamentos.reduce((acumulador, pagamento)=>acumulador + pagamento.valor,0)
  }

  const cadastrarPagamento = (venda)=>{
    setDadosVenda(venda);
    setOpenModal(true);
    setFormPagamento({
      data:'',
      valor:'',
      tipo:''
    });
  }

  useEffect(()=>{
    setFormPagamento({
      data: editarDataPagamento,
      valor: valor,
      tipo: editarTipoPagamento
    });    
  },[updateMode]);

  const editarPagamento = (vendaAlterar, tipoPagamento, pagamentoId, valorPagamento, dataPagamento)=>{        
    setEditarVenda(vendaAlterar);
    setEditarPagamentoId(pagamentoId);    
    setEditarDataPagamento(formatarDataEditar(dataPagamento));
    setValor(valorPagamento)
    setEditarTipoPagamento(tipoPagamento)
    setDadosVenda(vendaAlterar);
    setUpdateMode(true);
    setOpenModal(true);    
  }

  const extrairIds = (produtos)=>{
    return produtos.map(produto => ({_id: produto._id}));
  }

  const excluirVenda = (venda)=>{    
    deleteVenda(venda._id, setVendas, setCliente, setVendaPesquisada,extrairIds(venda.produtos),setListaProdutos,setProdutosEstoque);    
    //venda._id, setVendas, setCliente, setVendaPesquisada
  }

  return (
    <>
      <PagamentoModal
      openModal={openModal}
      setOpenModal={setOpenModal}
      dadosVenda={dadosVenda}
      setCliente={setCliente}
      setVendas={setVendas}      
      updateMode={updateMode}    
      setUpdateMode={setUpdateMode}
      formPagamento={formPagamento}
      setFormPagamento={setFormPagamento}
      editarVenda={editarVenda}
      editarPagamentoId={editarPagamentoId}
      valor={valor}
      setValor={setValor}
      setEditarDataPagamento={setEditarDataPagamento}
      setEditarTipoPagamento={setEditarTipoPagamento}      
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
                <button className='button-editar-pagamento' onClick={()=>editarPagamento(vendaPesquisada, pagamento.tipo, pagamento._id, pagamento.valor, pagamento.data)}>Editar Pagamento</button>
              </div>              
            </div>            
          ))
          :
          <div className='inserir-pagamento'>
                  <SemPagamento data={vendaPesquisada.data} />
                  <button className='botao-adicionar-pagamento' onClick={()=>cadastrarPagamento(vendaPesquisada)}><i className="fa-solid fa-comment-dollar"></i> Adicionar Pagamento</button> 
                  <button className='botao-cancelar' onClick={()=>setCliente('')}><i className="fa-solid fa-ban"></i> Cancelar</button>
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
                  <button className='botao-cancelar' onClick={()=>setCliente('')}><i className="fa-solid fa-ban"></i> Cancelar</button>
              </div>
          </div>          
          :''
          }
      </div>
      }

    <div className='tabela-venda-clientes'>
        <h2>Clientes</h2>
          <table className="styled-table-cliente">
          <thead>          
            <tr>
              <th>Nome</th>
              <th>Data</th>
              <th>Valor</th>              
            </tr>
          </thead>
          <tbody className='lista-condicional'>      
            {vendas.map((venda, index)=>(
              <tr key={index}>
                <td>{venda.cliente}<br/> <i className="fa-solid fa-eye" onClick={()=>exibirVenda(venda)}></i></td>
                <td>{formatarDataExibir(venda.data)}</td>
                <td>{formataValor(venda.valor)}</td>                          
              </tr>
            ))} 
          </tbody>
        </table>
    </div>
      
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
              <p className='valor-venda'>Valor:{formataValor(venda.valor)}</p>
              <p>Parcelas: {venda.parcelas}</p>
              <p>Pagamentos Realizados: {venda.pagamentos.length}</p>
              <p className='total-pago-venda'>Total Pago: {formataValor(totalPagamentos(venda.pagamentos))}</p>
              <div>
    <table className="styled-table">
    <thead>
      <tr>
        <th>Codigo</th>
        <th>Descrição</th>
        <th>Valor</th>                
      </tr>
    </thead>
    <tbody className='lista-condicional'>      
        {venda.produtos.map((item, index)=>(
          <tr key={index}>
          <td>{item.codigo} </td>
          <td>{item.descricao}</td>
          <td>{formataValor(item.pv)}</td>          
        </tr>
        ))}        
    </tbody>
  </table>
                {totalPagamentos(venda.pagamentos) >= venda.valor ? 
                <p className='status-venda-encerrada'> <i className="fa-solid fa-hand-holding-dollar"></i>Venda Encerrada</p> :
                <p className='status-venda-aberta'>Venda em Aberto</p>}
              </div>
              <button className='botao-exlcuir-venda' onClick={()=>excluirVenda(venda)}>Excluir Venda</button>
          </div>
        ))}
      </div>
}
    </>
  )
}

export default ListarVendas