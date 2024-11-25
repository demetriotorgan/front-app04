import React, { useEffect, useState } from 'react'
import './CarregarProdutos.css'
import { deleteProdutoEstoque, getProdutos } from '../../../utils/estoqueHandleApi';
import { formatarDataEditar, formatarDataExibir, formataValor, voltarAoTopo } from '../../../utils/formatar';
import 'react-toastify/dist/ReactToastify.css';
import { deleteSucesso } from '../../../utils/mensagens';

const CarregarProdutos = ({setFormData,setUpdate,setProdutoId,setPc,setPv}) => {
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

const updateMode = (_id, produto)=>{
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
            <p><strong>Data de Entrada</strong>: {formatarDataExibir(produto.dataentrada)}</p>
            <p><strong>Descrição:</strong> {produto.descricao}</p>
            <p><strong>Grade: </strong>{produto.grade}</p>
            <p><strong>PC:</strong> {formataValor(produto.pc)}</p>
            <p><strong>PV:</strong> {formataValor(produto.pv)}</p>
            <p><strong>Status:</strong> {produto.status}</p>
            <button className='buttonEditar-produto' onClick={()=>updateMode(produto._id, produto)}>Editar</button>
            <button className='buttonExcluir-produto-estoque' onClick={()=>deleteProdutoEstoque(produto._id, setProdutos, deleteSucesso)}>Excluir</button>
            </div>
        ))}
    </div>
    }

    </>
  )
}

export default CarregarProdutos