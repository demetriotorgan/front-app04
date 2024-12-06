import React, { useEffect, useState } from 'react'
import './BuscaProduto.css'
import { deleteProdutoPesquisa, getProdutos } from '../../../utils/estoqueHandleApi';
import { formatarData, formatarDataEditar, formatarDataExibir, formataValor, voltarAoTopo } from '../../../utils/formatar';
import { deleteSucesso } from '../../../utils/mensagens';
import 'react-toastify/dist/ReactToastify.css';

const BuscaProduto = ({setFormData, setUpdate, setProdutoId, setPc, setPv, produtos, setProdutos, codigoProduto,setCodigoProduto}) => {
    
    const [produtoPesquisado, setProdutoPesquisado] = useState('');       


const exibirProduto = (item)=>{
    setCodigoProduto(item.codigo);
    setProdutoPesquisado(item);            
}


const updateMode =(_id, produto)=>{
    setUpdate(true)
    setProdutoId(_id)            
    setFormData({
      codigo:produto.codigo,
      descricao:produto.descricao,
      grade:produto.grade,      
      pc: setPc(produto.pc),
      pv: setPv(produto.pv),
      dataentrada: formatarDataEditar(produto.dataentrada),  
      status:produto.status,
    })
    voltarAoTopo();
  }
  

  return (
   <>    
   <div className='busca-container'>
    <div className='busca-input'>
        <label>Produto:</label>
        <input className='input-busca-codigo'
            type='text'
            name='produto'
            value={codigoProduto}
            onChange={(e)=>setCodigoProduto(e.target.value)}            
        />
    </div>
    <div className='dropdown'>
        {produtos.filter(item=>{
            const codigoBusca = codigoProduto.toLowerCase();
            const codigoCompleto = item.codigo.toLowerCase()
            return codigoBusca && codigoCompleto.startsWith(codigoBusca) && codigoCompleto !== codigoBusca;
        }).map((item, index)=>(
            <div className='dropdown-row' key={index} onClick={()=>exibirProduto(item)}>
                {item.codigo}
            </div>
        ))}
    </div>
   </div>
   <div>    
      {produtoPesquisado && codigoProduto &&
      <div className='card-produto-pesquisado'>
      <p>Codigo: {produtoPesquisado.codigo}</p>
      <p>Data de Entrada: {formatarDataExibir(produtoPesquisado.dataentrada)} </p>
      <p>Descrição: {produtoPesquisado.descricao}</p>
      <p>Grade: {produtoPesquisado.grade}</p>
      <p>PC: {formataValor(produtoPesquisado.pc)}</p>
      <p>PV: {formataValor(produtoPesquisado.pv)}</p>
      <p>Status: {produtoPesquisado.status}</p>
      <button className='buttonEditar-produto-estoque' onClick={()=>updateMode(produtoPesquisado._id, produtoPesquisado)}>Editar</button>
      <button className='buttonExcluir-produto-estoque' onClick={()=>deleteProdutoPesquisa(produtoPesquisado._id, setProdutoPesquisado, setCodigoProduto, deleteSucesso)}>Excluir</button>
      </div>
      }  
   </div>
   </>
  )
}

export default BuscaProduto