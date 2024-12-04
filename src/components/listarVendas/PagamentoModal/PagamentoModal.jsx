import React, { useState } from 'react'
import { addPagamento } from '../../../utils/pagamentoHandleApi';

const PagamentoModal = ({openModal, setOpenModal, dadosVenda, setCliente, setVendas}) => {
    const [valor, setValor] = useState('');
    const [formPagamento, setFormPagamento] = useState({        
        data:'',
        valor:'',
        tipo:''
    })

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
        addPagamento(dadosVenda._id, formPagamento, setOpenModal, setCliente, setVendas)
    }
    const handleClose = ()=>{
        setOpenModal(false);
    }
  return (
    <>
        {openModal && (
            <div className='modal-overlay'>
                <div className='modal-content'>
                    <h2>Inserir Pagamento</h2>                    
                    <p>Venda ID: {dadosVenda._id} </p>
                    <p>Cliente : {dadosVenda.cliente} </p>
                    
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
                        <button className='close-button' onClick={()=>enviarPagamento(dadosVenda)}>Enviar</button>
                        <button className='close-button' onClick={handleClose}>Cancelar</button>                                        
                    </div>
                </div>                
            </div>
        )}
    </>
  )
}

export default PagamentoModal