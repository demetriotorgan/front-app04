import React, { useEffect, useState } from 'react'
import './Venda.css'
import { getProdutosEstoque } from '../../utils/estoqueHandleApi';
import { formatarDataEditar, formatarDataExibir, formataValor, voltarAoTopo } from '../../utils/formatar';
import ModalVenda from './modalVenda/ModalVenda';
import { notifyErroVenda, notifyVendaSalva } from '../../utils/mensagens';
import {Bounce, ToastContainer } from 'react-toastify';
import { getVendas } from '../../utils/vendaHandleApi';


const Venda = () => {
  const [formVenda, setFormVenda] = useState({
    cliente:'',
    data:'',
    valor:'',
    parcelas:'AVISTA',
    formapagamento:'PIX',
    produtos:'',
    pagamentos:[]
  });

  const [listaProdutos, setListaProdutos] = useState([]);
  const [produto, setProduto] = useState('');
  const [adicionados, setAdicionados] = useState([]);
  const [total, setTotal] = useState(0);
  const [openModal, setOpenModal] = useState(false);  
  const [produtosVendidos, setProdutosVendidos] = useState([]);
  const [produtosEstoque, setProdutosEstoque] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [produtosExcluidos, setProdutosExcluidos] = useState([]);
  const [vendaId, setVendaId] = useState('');
  const [clientePesquisado, setClientePesquisado] = useState('');
  const [vendaPesquisada, setVendaPesquisada] = useState('');

useEffect(()=>{
  getProdutosEstoque(setListaProdutos, setProdutosEstoque);      
  getVendas(setVendas);
},[]);

useEffect(()=>{
  setTotal(adicionados.reduce((soma, produto)=> soma + produto.pv,0))
  setFormVenda((prevData)=>({
    ...prevData,
    produtos:[...adicionados],
    valor:total
  }));      
},[adicionados,total]);

  const addProduto = (item)=>{    
    setProdutosVendidos([...produtosVendidos, {_id:item._id}]);
    setAdicionados([...adicionados, item]);        
    setProdutosEstoque(produtosEstoque.filter(produto => produto.codigo !== item.codigo));
    setProduto('');
    console.log('Lista de Adicionados ', adicionados);      
  }

  const handleFormVenda = (e)=>{
    const {name, value} = e.target;
    setFormVenda((prevData)=>({
      ...prevData,
      [name]:value
    }))
  }

  const atualizarVenda = (venda)=>{
    setUpdateMode(true);
    setFormVenda({
    cliente:venda.cliente,
    data:formatarDataEditar(venda.data),
    valor:'',
    parcelas: venda.parcelas,
    formapagamento:venda.formapagamento,
    produtos:setAdicionados(venda.produtos),
    pagamentos:venda.pagamentos
    });
    setVendaId(venda._id);
    voltarAoTopo();    
    setProdutosVendidos('');
    setVendaPesquisada('');
  }  

  const excluirProduto = (codigo,id)=>{
      setAdicionados(adicionados.filter(adicionado => adicionado.codigo !==codigo));
      setProdutosExcluidos([...produtosExcluidos, {_id:id}]);
  }

  const limparCampos = ()=>{
    setFormVenda({
    cliente:'',
    data:'',
    valor:'',
    parcelas:'AVISTA',
    formapagamento:'PIX',
    produtos:'',
    pagamentos:[]
    })
    setUpdateMode(!updateMode);
    setAdicionados([]);
  }

  const exibirVendaPesquisada =(item)=>{
    setVendaPesquisada(item);
    setClientePesquisado('');
  }

  const submitVendas = (e)=>{
    e.preventDefault()
    setOpenModal(true);
    setVendaPesquisada('');
    console.log('Enviando formVenda: ', formVenda);
    // console.log('Produtos Vendidos: ',produtosVendidos);
    console.log('Produtos Excluidos', produtosExcluidos);
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

   <ModalVenda
   openModal={openModal}
   setOpenModal={setOpenModal}
   formVenda={formVenda}
   setFormVenda={setFormVenda}
   notifyVendaSalva={notifyVendaSalva}
   notifyErroVenda={notifyErroVenda}
   setAdicionados={setAdicionados}
   produtosVendidos={produtosVendidos}
   setListaProdutos={setListaProdutos}
   setProdutosEstoque={setProdutosEstoque}
   produtosExcluidos={produtosExcluidos}
   updateMode={updateMode}
   vendaId={vendaId}   
   setVendas={setVendas}
   setProdutosExcluidos={setProdutosExcluidos}
   setProdutosVendidos={setProdutosVendidos}
   setUpdateMode={setUpdateMode}
   />
   <div className='form-container'>
    <h2>Cadastrar Venda</h2>
      <form className='form-venda' onSubmit={submitVendas}>
          <label>Cliente</label>
          <input 
          type='text'
          name='cliente'
          value={formVenda.cliente}
          onChange={handleFormVenda}
          required
          />    
          <label>Data</label>
          <input 
          type='date'
          name='data'
          value={formVenda.data}
          onChange={handleFormVenda}
          required
          />    
          <label>Parcelas</label>
          <select          
          name='parcelas'
          value={formVenda.parcelas}
          onChange={handleFormVenda}          
          >
            <option value="AVISTA">A VISTA</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>            
          </select>    

          <label>Forma de Pagamento</label>
          <select                     
          name='formapagamento'
          value={formVenda.formapagamento}
          onChange={handleFormVenda}
          >
            <option value="PIX">PIX</option>            
            <option value="DINHEIRO">DINHEIRO</option>            
            <option value="CARTÃO">CARTÃO</option>                
          </select>

          <label>Produto</label>
          <input 
          className='input-busca-produto'
          type='text'
          name='produto'
          value={produto}
          onChange={(e)=>setProduto(e.target.value)}
          />
          <div className='dropdown'>
              {produtosEstoque.filter(item =>{
                const searchTerm =  produto.toLowerCase();
                const fullName = item.codigo.toLowerCase();
                return searchTerm && fullName.startsWith(searchTerm) && fullName !== searchTerm;
              }).map((item, index)=>(
                <div className='dropdown-row' key={index} onClick={()=>addProduto(item)}>
                  <div className='lista-produtos'>
                    {item.codigo}
                    <button 
                      className='botao-adicionar-produto' 
                      onClick={()=>addProduto(item)}>
                      <i className="fa-solid fa-cart-plus"></i>
                    </button>
                  </div>
                </div>
              ))}
          </div>
            <div className='produtos-vendidos'>
      <table className="styled-table">
    <thead>
      <tr>
        <th>Codigo</th>
        <th>Descrição</th>
        <th>Valor</th>        
      </tr>
    </thead>
    <tbody>      
        {adicionados.map((item, index)=>(
          <tr key={index}>
            <td>{item.codigo} <i className="fa-regular fa-trash-can" onClick={()=>excluirProduto(item.codigo, item._id)}></i></td>
            <td>{item.descricao}</td>
            <td>{formataValor(item.pv)}</td>
          </tr>
        ))}
        <tr>
          <td></td>
          <td>Total</td>
          <td>{formataValor(total)}</td>
        </tr>              
    </tbody>
  </table>
    </div>
          <button type='submit' className='button-enviar' disabled = {total ? false : true} >{updateMode ? 'Atualizar' : 'Salvar'}</button>    
          <button type='button' className='button-enviar' onClick={()=>limparCampos()}>Limpar Campos</button>
      </form>
   </div>
  
   <div className='pesquisar-venda-cliente'>
          <label>Cliente</label>
          <input 
          type='text'
          name='cliente'
          placeholder='Digite o nome do cliente'
          value={clientePesquisado}
          onChange={(e)=>setClientePesquisado(e.target.value)}
          />
          <div className='dropdown'>
              {vendas.filter(venda =>{
                const nomeBusca = clientePesquisado.toLowerCase();
                const nomeCompleto = venda.cliente.toLowerCase();
                  return nomeBusca && nomeCompleto.startsWith(nomeBusca) && nomeCompleto !== nomeBusca;
              }).map((item, index)=>(
                <div className='dropdown-row' key={index} onClick={()=>exibirVendaPesquisada(item)}>
                    {item.cliente}
                </div>
              ))}
          </div>
          {vendaPesquisada ? 
            <div className='card-venda'>
            <p>Cliente: <strong>{vendaPesquisada.cliente}</strong></p>
            <p>Data: {formatarDataExibir(vendaPesquisada.data)}</p>
            <p>Valor: {formataValor(vendaPesquisada.valor)}</p>
            <button type='button' className='button-editar-venda' onClick={()=>atualizarVenda(vendaPesquisada)}>Editar Venda</button>
            </div>
          :''}          
    </div>

   <div className='painel-vendas'>
        <h2>Vendas</h2>
        {vendas ?
        vendas.map((venda, index)=>(
          <div className='card-venda' key={index}>
          <p>Cliente: <strong>{venda.cliente}</strong></p>
          <p>Data: {formatarDataExibir(venda.data)}</p>
          <p>Valor: {formataValor(venda.valor)}</p>
          <button type='button' className='button-editar-venda' onClick={()=>atualizarVenda(venda)}>Editar Venda</button>
          </div>
        ))        
         :''}
   </div>
   </>
  )
}

export default Venda