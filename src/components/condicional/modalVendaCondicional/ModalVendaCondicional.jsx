import React, { useEffect, useState } from 'react'
import './ModalVendaCondicional.css'
import { formataValor } from '../../../utils/formatar';
import { addVendaCondicional } from '../../../utils/condicionalHandleApi';

const ModalVendaCondicional = ({openModalVenda, setOpenModalVenda,formVenda,setFormVenda,formCondicional, vendidosId,setListaProdutos,setProdutosEstoque,setListaCondicionais,produtosVendido, setAdicionados,condicionalId,setFormCondicional,setProdutosVendido,produtosExcluidos,setProdutosCondicional,setModeDevolucao,setCondicionalSelecionado}) => {
    
    const handleClose =()=>{
        setOpenModalVenda(false);        

    };

    const handleForm = (e)=>{
        const {name, value} = e.target;
        setFormVenda((prevData)=>({
            ...prevData,
            [name]:value
        }))
    }

    const enviarFormVenda = (e)=>{
        e.preventDefault();
        console.log('Enviando Venda: ->', formVenda);
        console.log('Form Condicional: ->', formCondicional);
        console.log('Ids Vendidos: ->', vendidosId);
        addVendaCondicional(formVenda,vendidosId,setListaProdutos,setProdutosEstoque,setOpenModalVenda,setAdicionados,setListaCondicionais,produtosVendido, formCondicional,condicionalId,setFormCondicional,setProdutosVendido,produtosExcluidos,setProdutosCondicional, setModeDevolucao(false), setCondicionalSelecionado(''));
    }
  return (
    <>
    {openModalVenda && (
    <div className='modal-overlay'>        
            <div className='modal-content'>
                <h2>Venda de Condicional</h2>
                <form onSubmit={enviarFormVenda}>
                    <div className='dados-venda'>                                            
                        <label>Cliente</label>
                        <input
                        type='text'
                        name='cliente'
                        value={formVenda.cliente}
                        onChange={handleForm}
                        required
                        />

                        <label>Data: </label>
                        <input 
                        type='date'
                        name='data'
                        value={formVenda.data}
                        onChange={handleForm}
                        required
                        />
                        
                        <label>Parcelas: </label>
                        <select          
                            name='parcelas'  
                            value={formVenda.parcelas}                          
                            onChange={handleForm}
                            >
                                <option value="AVISTA">A VISTA</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>            
                            </select>    
                        
                        <label>Forma Pagamento:</label>
                        <select                     
                            name='formapagamento'                            
                            value={formVenda.formapagamento}
                            onChange={handleForm}
                            >
                                <option value="PIX">PIX</option>            
                                <option value="DINHEIRO">DINHEIRO</option>            
                                <option value="CARTÃO">CARTÃO</option>                
                            </select>
                <table className="styled-table">
                    <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Desc</th>
                        <th>Valor</th>                
                    </tr>
                    </thead>
                    <tbody className='lista-condicional'>      
                    {formVenda.produtos.map((produto, index)=>(
                        <tr key={index}>
                        <td>{produto.codigo}</td>
                        <td>{produto.descricao}</td>
                        <td>{produto.pv}</td>          
                        </tr>                                             
                    ))}                        
                    </tbody>                                        
                </table>
                <h2 className='valor-venda'><i className="fa-solid fa-cash-register"></i> {formataValor(formVenda.valor)}</h2>                
                    </div>   
                    <div className='modal-button'>
                    <button className='close-button' type='submit'>Enviar</button>
                    <button className='close-button' onClick={handleClose}>Cancelar</button>                                        
                    </div>                    
                </form>                    
            </div>            
    </div>        
        )}
    </>
  )
}

export default ModalVendaCondicional