import React from 'react'
import './ModalVenda.css'
import { formatarData, formataValor } from '../../../utils/formatar'
import { addVenda, updateVenda } from '../../../utils/vendaHandleApi';

const ModalVenda = ({openModal, setOpenModal,formVenda,setFormVenda,notifyVendaSalva,notifyErroVenda,setAdicionados, produtosVendidos,setListaProdutos,setProdutosEstoque,produtosExcluidos,updateMode, vendaId,setVendas}) => {
    const handleClose = ()=>{
        setOpenModal(false)
    }

    const enviarForm = ()=>{
        console.log('Enviando Form');        
        addVenda(formVenda,notifyVendaSalva, setFormVenda, setOpenModal,notifyErroVenda,setAdicionados,produtosVendidos,setListaProdutos,setProdutosEstoque,setVendas);         
    }

    const atualizarVenda = ()=>{
        console.log('Atualiando Venda')
        updateVenda(formVenda, vendaId, setOpenModal, setFormVenda,setAdicionados,produtosExcluidos,setVendas,setListaProdutos,setProdutosEstoque,produtosVendidos);
        // console.log(produtosExcluidos);
    }
  return (
    <>
    {openModal && (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <h2>Confirmar Venda?</h2>
                    <div className='dados-venda'>
                        <h3>Cliente: {formVenda.cliente}</h3>
                        <p>Data: {formatarData(formVenda.data)}</p>                                      
                        <p>Qtd de Parcelas: {formVenda.parcelas}</p>
                        <p>Forma de Pg: {formVenda.formapagamento}</p>
                        <table className='tabelaProdutos-modal'>
                            <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>Descrição</th>
                                <th>Valor</th>
                            </tr>
                            </thead>                            
                            <tbody>
                            {formVenda.produtos.map((item, index)=>(
                                <tr key={index}>
                                   <td>{item.codigo}</td> 
                                   <td>{item.descricao}</td> 
                                   <td>{formataValor(item.pv)}</td> 
                                </tr>                                                            
                            ))}    
                            </tbody>                                                                                
                        </table>
                        <h2>Valor: {formataValor(formVenda.valor)}</h2>
                    </div>                    
                    <div className='modal-button'>
                    <button className='close-button' onClick={updateMode ? ()=>atualizarVenda() : ()=>enviarForm('')}>{updateMode ? 'Atualizar' : 'Enviar'}</button>
                    <button className='close-button' onClick={handleClose}>Cancelar</button>                                        
                    </div>
            </div>
        </div>
    )}
    </>
  )
}

export default ModalVenda