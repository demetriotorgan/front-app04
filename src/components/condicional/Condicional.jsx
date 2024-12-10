import React, { useEffect, useState } from 'react'
import './Condicional.css'
import { getProdutosEstoque } from '../../utils/estoqueHandleApi';
import { formatarDataEditar, formatarDataExibir, formataValor, voltarAoTopo } from '../../utils/formatar';
import { saveCondicional, getCondicionais, deletarCondicional, updateCondicional } from '../../utils/condicionalHandleApi';
import { Bounce, ToastContainer } from 'react-toastify';

const Condicional = () => {
  const [produtosEstoque, setProdutosEstoque] = useState([]);
  const [listaProdutos, setListaProdutos] = useState([]);
  const [produto, setProduto] = useState('');
  const [adicionados, setAdicionados] = useState([]);
  const [produtosCondicional, setProdutosCondicional] = useState([]);
  const [produtosDevolvidos, setProdutosDevolvidos] = useState('');
  const [produtosExcluidos, setProdutosExcluidos] = useState([]);
  const [produtoVendido, setProdutoVendido] = useState([]);
  const [listaCondicionais, setListaCondicionais] = useState([]);
  const [modeDevolucao, setModeDevolucao] = useState(false);
  const [condicionalId, setCondicionalId] = useState('');

  const [formCondicional, setFormCondicional] = useState({
    cliente:'',
    data:'',
    produtos:''
  })

  useEffect(()=>{
    getProdutosEstoque(setListaProdutos, setProdutosEstoque);
    getCondicionais(setListaCondicionais);
  },[]);

  useEffect(()=>{
    setFormCondicional((prevData)=>({
      ...prevData,
      produtos:[...adicionados]
    }))
  },[adicionados])

  const handleFormCondicional = (e)=>{
    const {name, value} = e.target;
    setFormCondicional((prevData)=>({
      ...prevData, 
      [name]:value
    }))
  }

  const addProduto = (item)=>{
    setAdicionados([...adicionados, item]);
    setProdutosCondicional([...produtosCondicional, {_id:item._id}]);
    setProduto('');
  }

  const excluirProduto = (codigo, id)=>{
    setAdicionados(adicionados.filter(adicionado => adicionado.codigo !== codigo));
    setProdutosCondicional(produtosCondicional.filter(adicionado => adicionado._id !==id));        
  }

  const venderProduto = ()=>{
    
  }

  const devolucaoCondicional = (condicional)=>{
    setModeDevolucao(true);
    setFormCondicional({
      cliente:condicional.cliente,
      data:formatarDataEditar(condicional.data),
      produtos:setAdicionados(condicional.produtos)
    });
    setCondicionalId(condicional._id);
    voltarAoTopo();
  }

  const devolverProduto = (item)=>{
    setProdutosExcluidos([...produtosExcluidos, {_id:item._id}]);
    setAdicionados(adicionados.filter(adicionado => adicionado.codigo !== item.codigo));    
    setProdutosDevolvidos([...produtosDevolvidos, item]);
    setProdutosCondicional(adicionados.filter(adicionado => adicionado.codigo !== item.codigo));
  }

  const submitCondicional = (e)=>{
    e.preventDefault();
    console.log('Enviando Condiconal: ',formCondicional);    
    // console.log('Produtos Vendidos: ', produtoVendido);
    setProdutosDevolvidos('');
    if(modeDevolucao){
      console.log('Atualizar Condicional');
      console.log('Produtos Excluidos', produtosExcluidos);
      console.log('Produtos para Condicional ->', produtosCondicional);
      updateCondicional(condicionalId, formCondicional, produtosExcluidos, setListaProdutos, setProdutosEstoque, setFormCondicional, setAdicionados, setProdutosExcluidos,setListaCondicionais, produtosCondicional,setProdutosCondicional, setModeDevolucao, setProdutoVendido, setProdutosDevolvidos);
    }else{
      console.log('Produto para Condiconal: ',produtosCondicional);
      saveCondicional(formCondicional, setFormCondicional, setAdicionados, produtosCondicional,setListaProdutos, setProdutosEstoque, setListaCondicionais, setProdutosCondicional);
    }    
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

    <div className='form-container'>
      <h2>Cadastrar Condicional</h2>        
        <form onSubmit={submitCondicional}>
          <label>Cliente</label>
          <input
          type='text'
          name='cliente'
          value={formCondicional.cliente}
          onChange={handleFormCondicional}
          required
          />

          <label>Data</label>
          <input 
          type='date'
          name='data'
          value={formCondicional.data}
          onChange={handleFormCondicional}
          required
          />
          
          <label>Produtos</label>
          <input 
          type='text'
          name='produtos'          
          value={produto}
          onChange={(e)=>setProduto(e.target.value)}
          />
          <div className='dropdown'>
          {produtosEstoque.filter(item => {
            const searchTerm = produto.toLowerCase();
            const fullName = item.codigo.toLowerCase();
              return searchTerm && fullName.startsWith(searchTerm) && fullName !== searchTerm;
          }).map((item, index)=>(
            <div className='dropdown-row' key={index} onClick={()=>addProduto(item)}>
              <div className='lista-produtos'>
                {item.codigo}
              </div>

            </div>
          ))}
          </div>
<table className="styled-table">
    <thead>
      <tr>
        <th>Codigo</th>
        <th>Desc</th>
        <th>Valor</th>                
      </tr>
    </thead>
    <tbody className='lista-condicional'>      
        {adicionados.map((item, index)=>(
          <tr key={index}>
          <td>{item.codigo} {modeDevolucao ? <i className="fa-solid fa-reply-all" onClick={()=>devolverProduto(item)}></i> :<i className="fa-regular fa-trash-can" onClick={()=>excluirProduto(item.codigo, item._id)}></i>}</td>
          <td>{item.descricao}</td>
          <td>{formataValor(item.pv)} <i className="fa-solid fa-sack-dollar" onClick={()=>venderProduto(item.codigo, item)}></i></td>          
        </tr>
        ))}        
    </tbody>
  </table>
  <button type='submit' className='button-salvar-condicional' disabled = {modeDevolucao ? false : (adicionados.length === 0 ? true : false)}>{modeDevolucao ? 'Atualizar Condiconal' : 'Salvar Condicional'}</button>
        </form>    
    </div>

    {produtosDevolvidos ?
    <div className='painel-devolucao'>
        <h2> <i className="fa-solid fa-reply-all"></i> Devolvendo Produtos</h2>
        {produtosDevolvidos.map((produto, index)=>(
            <div className='card-devolucao' key={index}>
                <p>Código: <strong>{produto.codigo}</strong> </p>
                <p>Descrição: {produto.descricao}</p>
                <p>Valor: {formataValor(produto.pv)}</p>
            </div>
        ))}                
    </div>
    : ''}

    {listaCondicionais ? 
    <div className='painel-condicionais'>
      <h2><i className="fa-solid fa-bag-shopping"></i> Todos os Condicionais</h2>
      {listaCondicionais.map((condicional, index)=>(
          <div className='card-condicional' key={index}>
          <p>Cliente: <strong>{condicional.cliente}</strong></p>
          <p>Data: {formatarDataExibir(condicional.data)} </p>
          <p>Produtos:</p>
          <ul className='lista-condicional'>
            {condicional.produtos.map((produto, index)=>(
              <li key={index}>{produto.codigo}</li>
            ))}
          </ul>
          <button className='button-devolucao-condicional' onClick={()=>devolucaoCondicional(condicional)}>Devolução</button>
          <button className='button-excluir-condicional' onClick={()=>deletarCondicional(condicional._id,condicional.produtos, setListaCondicionais,setListaProdutos, setProdutosEstoque, setFormCondicional, setAdicionados)}>Excluir</button>
      </div>
      ))}
    </div>
    : '' }
    </>
  )
}

export default Condicional