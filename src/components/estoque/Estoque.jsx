import React, { useState } from 'react'
import './Estoque.css'
import ModalEstoque from './modalEstoque/ModalEstoque';
import { limparCampos } from '../../utils/formatar';
import CarregarProdutos from './carregarProdutos/CarregarProdutos';
import BuscaProduto from './buscaProduto/BuscaProduto';
import { notifyAtualizarProduto, notifyAtualizarProdutoErro, notifyErro, notifyErroDelete, notifySucesso } from '../../utils/mensagens';
import 'react-toastify/dist/ReactToastify.css';
import {Bounce, ToastContainer, toast } from 'react-toastify';
import { editarForm } from '../../utils/estoqueHandleApi';

const Estoque = () => {
const [formData, setFormData] = useState({
  codigo:'',
  descricao:'',
  grade:'',
  pc:'' ,
  pv:'',
  dataentrada:'',  
  status:'',
});

const [pc, setPc] = useState('');
const [pv, setPv] = useState('');
const [openModal, setOpenModal] = useState(false);
const [update, setUpdate] = useState(false);
const [produtoId, setProdutoId] = useState('');


const handleChange = (e)=>{
  const {name, value} = e.target;
  setFormData({
    ...formData,
    [name]:value
  })
}

const handlePC = (e)=>{
  const inputValue = e.target.value;
  const numericValue = inputValue.replace(/[^0-9.]/g, "");
  
  setPc(numericValue);  
  setFormData({
    ...formData,
    pc:parseFloat(numericValue).toFixed(2)
  })
}

const handlePV = (e)=>{
  const inputValue = e.target.value;
  const numericValue = inputValue.replace(/[^0-9.]/g,"");
  
  setPv(numericValue);
  setFormData({
    ...formData,
    pv:parseFloat(numericValue).toFixed(2)
  })
}

const handleSubmit = (e)=>{    
    e.preventDefault();
    console.log(formData);
    setOpenModal(true);
}
  //---------------------------------------------
  return (
    <>
    <ModalEstoque 
    openModal={openModal} 
    setOpenModal={setOpenModal} 
    formData={formData} 
    setFormData={setFormData} 
    setPc={setPc}
    setPv={setPv}
    notifySucesso={notifySucesso}
    notifyErro={notifyErro}
    notifyErroDelete={notifyErroDelete}
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
      <form onSubmit={handleSubmit}>
        <h2 className='form-title'>Novo Produto</h2>
        <label>Código</label>
            <input
            type='text'
            name='codigo'
            value={formData.codigo}
            onChange={handleChange}
            required
            />
        

        <label>Descrição</label>
            <input
            type='text'
            name='descricao'
            value={formData.descricao}
            onChange={handleChange}
            required
            />       

        <label>Grade</label>          
            <input
            type='text'
            name='grade'
            value={formData.grade}
            onChange={handleChange}
            required
            />      

        <label>P.C</label>
            <input
            type='text'
            name='pc'
            value={pc}
            onChange={handlePC}
            required
            />        

        <label>P.V</label>
            <input
            type='text'
            name='pv'
            value={pv}
            onChange={handlePV}
            required
            />       

        <label>Data Entrada</label>
            <input
            type='date'
            name='dataentrada'
            value={formData.dataentrada}
            onChange={handleChange}
            required
            />        

        <div className='radio-group'>
          <label>
            Estoque
            <input 
            type='radio'
            name='status'
            value='ESTOQUE'
            checked={formData.status === 'ESTOQUE'}
            onChange={handleChange}
            required
            />
          </label>

          <label>
            Condicional
            <input 
            type='radio'
            name='status'
            value='CONDICIONAL'
            checked={formData.status === 'CONDICIONAL'}
            onChange={handleChange}
            required
            />
          </label>

          <label>
            Vendido
            <input 
            type='radio'
            name='status'
            value='VENDIDO'
            checked={formData.status === 'VENDIDO'}
            onChange={handleChange}
            required
            />
          </label>          
        </div>
        {update ? '' : <button className='button-enviar' type='submit'>Enviar</button>}                
        <button 
          className='button-enviar' 
          type='button'           
          onClick={update ? ()=>editarForm(formData, produtoId, notifyAtualizarProduto, notifyAtualizarProdutoErro, setFormData, setPc, setPv) : ()=>limparCampos(setFormData, setPc, setPv)}>
            {update ? "Atualizar" : "Limpar Campos"}
        </button>
      </form>
      
    </div>
    <BuscaProduto     
    setFormData={setFormData}     
    setUpdate={setUpdate} 
    setProdutoId={setProdutoId}     
    setPc={setPc} 
    setPv={setPv}     
    />
    <CarregarProdutos
    setFormData={setFormData}     
    setUpdate={setUpdate} 
    setProdutoId={setProdutoId}     
    setPc={setPc} 
    setPv={setPv}     
    />
    </>
  )
}

export default Estoque