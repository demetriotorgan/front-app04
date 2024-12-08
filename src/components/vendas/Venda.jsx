import React, { useEffect, useState } from 'react'
import './Venda.css'
import { getProdutosEstoque } from '../../utils/estoqueHandleApi';
import { formataValor } from '../../utils/formatar';
import ModalVenda from './modalVenda/ModalVenda';
import { notifyErroVenda, notifyVendaSalva } from '../../utils/mensagens';
import {Bounce, ToastContainer } from 'react-toastify';


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

useEffect(()=>{
  getProdutosEstoque(setListaProdutos, setProdutosEstoque);      
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

  const submitVendas = (e)=>{
    e.preventDefault()
    setOpenModal(true);
    console.log('Enviando formVenda: ', formVenda);
    console.log('Produtos Vendidos: ',produtosVendidos);
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
            <td>{item.codigo}</td>
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
          <button type='submit' className='button-enviar' disabled = {total ? false : true} >Finalizar</button>    
          <button type='button' className='button-enviar'>Limpar Campos</button>
      </form>
   </div>
   </>
  )
}

export default Venda