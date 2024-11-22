import React, { useEffect, useState } from 'react'
import './CarregarProdutos.css'
import { getProdutos } from '../../../utils/estoqueHandleApi';
import { formatarData, formataValor } from '../../../utils/formatar';

const CarregarProdutos = () => {
    const [produtos, setProdutos] = useState([]);
    const [exibirProdutos, setExibirProdutos] = useState(false);

useEffect(()=>{
    getProdutos(setProdutos);
},[]);

const totalProdutos = (produtos)=>{
    return produtos.length;
}

const valorEstoque = (produtos)=>{
    return produtos.reduce((acumulador, produto)=> acumulador + produto.pc ,0);
}

const contarEstoque = (produtos)=>{
    return produtos.filter(item => item.status === 'ESTOQUE').length;
}

const contarCondicional = (produtos)=>{
    return produtos.filter(item => item.status === 'CONDICIONAL').length;
}

  return (
    <>
    <div className='painel-estoque'>
        <div className='card-info'>
            <h2 className='card-info-titulo'>Informações do Estoque</h2>
            <p>Total de produtos: {totalProdutos(produtos)} </p>
            <p>Valor em Estoque: {formataValor(valorEstoque(produtos))} </p>
            <p>Produtos em Estoque: {contarEstoque(produtos)} </p>
            <p>Produtos em Condicional: {contarCondicional(produtos)} </p>
        </div>
        <button className='button-produtos' onClick={()=>setExibirProdutos(!exibirProdutos)}>Carregar Produtos</button>
    </div>
    
    {produtos && exibirProdutos &&    
    <div className='card-produto'>
        <h2>Produtos em Estoque</h2>
        {produtos.map((produto, index)=>(
            <div key={index} className='produto'>
            <p><strong>Codigo:</strong> {produto.codigo}</p>
            <p><strong>Data de Entrada</strong>: {formatarData(produto.dataentrada)}</p>
            <p><strong>Descrição:</strong> {produto.descricao}</p>
            <p><strong>PC:</strong> {formataValor(produto.pc)}</p>
            <p><strong>PV:</strong> {formataValor(produto.pv)}</p>
            <p><strong>Status:</strong> {produto.status}</p>
            </div>
        ))}
    </div>
    }

    </>
  )
}

export default CarregarProdutos