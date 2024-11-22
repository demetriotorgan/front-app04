import React, { useEffect, useState } from 'react'
import './BuscaProduto.css'
import { getProdutos } from '../../../utils/estoqueHandleApi';
import { formatarData, formataValor } from '../../../utils/formatar';

const BuscaProduto = () => {
    const [produtos, setProdutos] = useState([]);
    const [codigoProduto, setCodigoProduto] = useState('');
    const [produtoPesquisado, setProdutoPesquisado] = useState('');    

useEffect(()=>{
    getProdutos(setProdutos);    
},[]);

const exibirProduto = (item)=>{
    setCodigoProduto(item.codigo);
    setProdutoPesquisado(item);        
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
      <p>Data de Entrada: {formatarData(produtoPesquisado.dataentrada)} </p>
      <p>Descrição: {produtoPesquisado.descricao}</p>
      <p>PC: {formataValor(produtoPesquisado.pc)}</p>
      <p>PV: {formataValor(produtoPesquisado.pv)}</p>
      <p>Status: {produtoPesquisado.status}</p>
      </div>
      }  
   </div>
   </>
  )
}

export default BuscaProduto