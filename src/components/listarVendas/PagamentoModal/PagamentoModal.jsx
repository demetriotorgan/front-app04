import React, { useState } from 'react'
import { addPagamento, updatePagamento } from '../../../utils/pagamentoHandleApi';
import { formatarDataEditar } from '../../../utils/formatar';

const PagamentoModal = ({openModal, setOpenModal, dadosVenda, setCliente, setVendas, updateMode,setUpdateMode,formPagamento,setFormPagamento,editarVenda,editarPagamentoId, valor, setValor,setEditarDataPagamento,setEditarTipoPagamento}) => {
    
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormPagamento({
            ...formPagamento,
            [name]:value
        })
    }

    const handleValor = (e)=>{
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/[^0-9.]/g, "");

        setValor(numericValue);
        setFormPagamento({
            ...formPagamento,
            valor:parseFloat(numericValue).toFixed(2)
        })
    }

    const enviarPagamento = (dadosVenda)=>{
        console.log(formPagamento);
        addPagamento(dadosVenda._id, formPagamento, setOpenModal, setCliente, setVendas,setFormPagamento,setValor, dadosVenda)
    }
    
    const handleClose = ()=>{
        setOpenModal(false);
        setUpdateMode(false);        
        setEditarDataPagamento('');
        setValor('');
        setEditarTipoPagamento('');
        setFormPagamento({
            data:'',
            valor:'',
            tipo:''
        })
        
    }

 return (
    <>
        {openModal && (
            <div className='modal-overlay'>
                <div className='modal-content'>
                    <h2>{updateMode ? 'Atualizar Pagamento' : 'Inserir Pagamento'}</h2>                    
                    <p>Venda ID: {updateMode ? editarVenda._id : dadosVenda._id} </p>
                    <p>Cliente : {updateMode ? editarVenda.cliente : dadosVenda.cliente} </p>
                    {updateMode ? <p>Pagamento Id: {editarPagamentoId}</p> : ''}
                    
                    <label>Data:</label>
                    <input 
                    type='date'
                    name='data'                    
                    value={formPagamento.data}
                    onChange={handleChange}
                    />
                    
                    <label>Valor:</label>
                    <input 
                    type='text'
                    name='valor'
                    value={valor}
                    onChange={handleValor}
                    />

                    <label>Tipo:</label>
                    <input 
                    type='text'
                    name='tipo'
                    value={formPagamento.tipo}
                    onChange={handleChange}
                    />

                    <div className='modal-button'>
                        <button className='close-button' onClick={updateMode ? ()=>updatePagamento(editarVenda._id, editarPagamentoId, formPagamento, setOpenModal, setCliente,setVendas,setFormPagamento,setValor,setUpdateMode,dadosVenda) : ()=>enviarPagamento(dadosVenda)}>{updateMode ? 'Atualizar': 'Enviar'}</button>
                        <button className='close-button' onClick={handleClose}>Cancelar</button>                                        
                    </div>
                </div>                
            </div>
        )}
    </>
  )
}

export default PagamentoModal