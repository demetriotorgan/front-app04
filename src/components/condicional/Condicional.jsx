import React, { useEffect, useState } from 'react'
import './Condicional.css'
import { getProdutosEstoque } from '../../utils/estoqueHandleApi';
import { formatarDataEditar, formatarDataExibir, formataValor, voltarAoTopo } from '../../utils/formatar';
import { saveCondicional, getCondicionais, deletarCondicional, updateCondicional } from '../../utils/condicionalHandleApi';
import { Bounce, ToastContainer } from 'react-toastify';
import ModalVendaCondicional from './modalVendaCondicional/ModalVendaCondicional';
import { notifySemCondicionaisAbertos, notifySemCondicionaisDevolvidos } from '../../utils/mensagens';

const Condicional = () => {
  const [produtosEstoque, setProdutosEstoque] = useState([]);
  const [listaProdutos, setListaProdutos] = useState([]);
  const [produto, setProduto] = useState('');
  const [adicionados, setAdicionados] = useState([]);
  const [produtosCondicional, setProdutosCondicional] = useState([]);
  const [produtosDevolvidos, setProdutosDevolvidos] = useState('');
  const [produtosExcluidos, setProdutosExcluidos] = useState([]);
  const [produtosVendido, setProdutosVendido] = useState('');
  const [listaCondicionais, setListaCondicionais] = useState([]);
  const [modeDevolucao, setModeDevolucao] = useState(false);
  const [condicionalId, setCondicionalId] = useState(''); 
  const [vendidosId, setVendidosId] = useState([]);
  const [openModalVenda, setOpenModalVenda] = useState(false);
  const [clientePesquisado, setClientePesquisado] = useState('');
  const [condicionalSelecionado, setCondicionalSelecionado] = useState('');
  const [condicionaisAbertos, setCondicionaisAbertos] = useState([]);
  const [condicionaisDevolvidos, setCondicionaisDevolvidos] = useState([]);
  const [exibirAbertos, setExibirAbertos] = useState(false);
  const [exibirDevolvidos, setExibirDevolvidos] = useState(false);

  const [formVenda, setFormVenda] = useState({
    cliente:'',
    data:'',
    valor:'',
    parcelas:'AVISTA',
    formapagamento:'PIX',
    produtos:[],
    pagamentos:[]
  });
  
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
    setProdutosEstoque(produtosEstoque.filter(produto => produto.codigo !== item.codigo));
  }

  const excluirProduto = (item)=>{
    setAdicionados(adicionados.filter(adicionado => adicionado.codigo !== item.codigo));
    setProdutosCondicional(produtosCondicional.filter(adicionado => adicionado._id !== item._id));        
    setProdutosEstoque([...produtosEstoque, item]);
  }

  const venderProduto = (item)=>{
    setProdutosVendido([...produtosVendido, item]);  
    setFormVenda((prevData)=>({
      ...prevData,            
      cliente:formCondicional.cliente,
      produtos:[...produtosVendido,item]
    }));    
    setAdicionados(adicionados.filter(adicionado => adicionado.codigo !== item.codigo));
    setVendidosId([...vendidosId, {_id:item._id}]);             
  }

  const devolucaoCondicional = (condicional)=>{
    setModeDevolucao(true);
    setFormCondicional({
      cliente:condicional.cliente,
      data:formatarDataEditar(condicional.data),
      produtos:setAdicionados(condicional.produtos)
    });
    setCondicionalId(condicional._id);
    setExibirAbertos(false);
    setExibirDevolvidos(false);
    voltarAoTopo();
  }

  const devolverProduto = (item)=>{
    setProdutosExcluidos([...produtosExcluidos, {_id:item._id}]);
    setAdicionados(adicionados.filter(adicionado => adicionado.codigo !== item.codigo));    
    setProdutosDevolvidos([...produtosDevolvidos, item]);
    setProdutosCondicional(adicionados.filter(adicionado => adicionado.codigo !== item.codigo));
  }

  const cancelarCondicional = ()=>{
    setProdutosVendido('');
    setProdutosCondicional('');
    setProdutosDevolvidos('');
    setProdutosExcluidos('');    
    setAdicionados([]);
    setVendidosId('');
    setCondicionalId('');
    setFormCondicional({
    cliente:'',
    data:'',
    produtos:''
    });
    setModeDevolucao(false);
    getProdutosEstoque(setListaProdutos, setProdutosEstoque);
    setCondicionalSelecionado('');
  }

  const condicionalPesquisado =(item)=>{
    setCondicionalSelecionado(item);
    setClientePesquisado('');
  }

  const exibirCondicionaisAbertos =()=>{    
    const abertos = listaCondicionais.filter(condicional => condicional.produtos.length !== 0);
    setCondicionaisAbertos(abertos);
    if(abertos.length == 0){
      notifySemCondicionaisAbertos();
    }
    setExibirAbertos(!exibirAbertos);        
  }

  const exibirCondicionaisDevolvidos = ()=>{    
    const devolvidos = listaCondicionais.filter(condicional => condicional.produtos.length == 0);    
    setCondicionaisDevolvidos(devolvidos); 
    if(devolvidos.length == 0){
      notifySemCondicionaisDevolvidos();
    }   
    setExibirDevolvidos(!exibirDevolvidos);    
  }
 
  const submitCondicional = (e)=>{
    e.preventDefault();
    console.log('Enviando Condiconal: ',formCondicional);        
    setProdutosDevolvidos('');
    if(modeDevolucao){      
      if(produtosVendido){
        console.log('MODAL VENDA CONDICONAL')
        console.log('ID venda: ->', vendidosId)
        console.log('Produtos para venda: ->', produtosVendido);                 
        setFormVenda((prevData)=>({
          ...prevData,
          valor: produtosVendido.reduce((soma, produto)=> soma + produto.pv,0),
        }))
        console.log(formVenda)
        setOpenModalVenda(true);
        setCondicionalSelecionado('');
      } else{
        console.log('Atualizar Condicional');
        console.log('Produtos Excluidos', produtosExcluidos);
        console.log('Produtos para Condicional ->', produtosCondicional);
        updateCondicional(condicionalId, formCondicional, produtosExcluidos, setListaProdutos, setProdutosEstoque, setFormCondicional, setAdicionados, setProdutosExcluidos,setListaCondicionais, produtosCondicional,setProdutosCondicional, setModeDevolucao,produtosExcluidos, setCondicionalSelecionado(''));        
      }
    }else{
      console.log('Produto para Condiconal: ',produtosCondicional);
      saveCondicional(formCondicional, setFormCondicional, setAdicionados, produtosCondicional,setListaProdutos, setProdutosEstoque, setListaCondicionais, setProdutosCondicional);
      setCondicionalSelecionado('');
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

  <ModalVendaCondicional 
      openModalVenda={openModalVenda} 
      setOpenModalVenda={setOpenModalVenda}           
      formVenda={formVenda}      
      setFormVenda={setFormVenda}
      formCondicional={formCondicional}
      vendidosId={vendidosId}
      setListaProdutos={setListaProdutos}
      setProdutosEstoque={setProdutosEstoque}      
      setListaCondicionais={setListaCondicionais}
      produtosVendido={produtosVendido}      
      setAdicionados={setAdicionados}
      condicionalId={condicionalId}
      setFormCondicional={setFormCondicional}
      setProdutosVendido={setProdutosVendido}
      produtosExcluidos={produtosExcluidos}
      setProdutosCondicional={setProdutosCondicional}
      setModeDevolucao={setModeDevolucao}
      setCondicionalSelecionado={setCondicionalSelecionado}
      
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
          <td>{item.codigo} {modeDevolucao ? <i className="fa-solid fa-reply-all" onClick={()=>devolverProduto(item)}></i> :<i className="fa-regular fa-trash-can" onClick={()=>excluirProduto(item)}></i>}</td>
          <td>{item.descricao}</td>
          <td>{formataValor(item.pv)} {modeDevolucao ? <i className="fa-solid fa-sack-dollar" onClick={()=>venderProduto(item)}></i> :''} </td>                            
        </tr>        
        ))}        
    </tbody>
  </table>
  <div className='totalprodutos'>
    <p>Total de Produtos: <strong>{adicionados.length}</strong></p>
  </div>
      <button type='submit' className='button-salvar-condicional' disabled = {modeDevolucao ? false : (adicionados.length === 0 ? true : false)}><i className="fa-solid fa-briefcase"></i>{modeDevolucao ? ' Atualizar Condiconal' : ' Salvar Condicional'}</button>
      <button type='button' className='button-limpar-condicional' onClick={()=>cancelarCondicional()}><i className="fa-solid fa-ban"></i> Cancelar Condicional</button>
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
        <div className='totalprodutos'>
            <p>Produtos Devolvidos: {produtosDevolvidos.length}</p>
        </div>
      <div className='cancelar-vendas'>
      <button className='button-cancelar' onClick={()=>cancelarCondicional()}>Cancelar</button>
      </div>        
    </div>
    : ''}

    {produtosVendido ? 
    <div className='painel-vendidos'>
        <h2><i className="fa-solid fa-sack-dollar"></i> Produtos Vendidos</h2>
        {produtosVendido.map((vendido, index)=>(
          <div className='card-vendido' key={index}>
              <p>Codigo: {vendido.codigo}</p>
              <p>Descrição: {vendido.descricao}</p>
              <p>Valor: {formataValor(vendido.pv)}</p>
          </div>
        ))}
      <div className='cancelar-vendas'>
      <button className='button-cancelar' onClick={()=>cancelarCondicional()}>Cancelar</button>
      </div>        
    </div>
    : ''}            

<div className='pesquisar-condicional-cliente'>
          <label>Cliente</label>
          <input 
          type='text'
          name='cliente'
          placeholder='Digite o nome do cliente'
          value={clientePesquisado}
          onChange={(e)=>setClientePesquisado(e.target.value)}
          />
            <div className='dropdown'>
              {listaCondicionais ? listaCondicionais.filter((condicional)=>{
                const nomeBusca = clientePesquisado.toLowerCase();
                const nomeCompleto = condicional.cliente.toLowerCase();
                  return nomeBusca && nomeCompleto.startsWith(nomeBusca) && nomeCompleto !== nomeBusca;
              }).map((item, index)=>(
                <div className='dropdown-row' key={index} onClick={()=>condicionalPesquisado(item)}>
                    {item.cliente}
                </div>
              )) : ''}
            </div>
          {condicionalSelecionado ? 
            <div className='card-condicional'>
            <p>Cliente: <strong>{condicionalSelecionado.cliente}</strong></p>
            <p>Data: {formatarDataExibir(condicionalSelecionado.data)} </p>
            <p>Produtos: {condicionalSelecionado.produtos.length}</p>
            <ul className='lista-condicional'>
              {condicionalSelecionado.produtos.length == 0 ? 
              <div className='condiconal-encerrado'>
                  <h3>DEVOLVIDO</h3>
              </div>
              :
              condicionalSelecionado.produtos.map((produto, index)=>(
                <li key={index}>{produto.codigo}</li>              
              ))}            
            </ul>
            <button className='button-devolucao-condicional' onClick={()=>devolucaoCondicional(condicionalSelecionado)} disabled={condicionalSelecionado.produtos.length ==0 ? true : false}><i className="fa-solid fa-rotate-left"></i> Devolução</button>
            <button className='button-excluir-condicional' onClick={()=>deletarCondicional(condicionalSelecionado._id,condicionalSelecionado.produtos, setListaCondicionais,setListaProdutos, setProdutosEstoque, setFormCondicional, setAdicionados, setCondicionalSelecionado(''))}><i className="fa-regular fa-trash-can"></i> Excluir</button>
        </div>
          :''}
    </div>
      
    <div className='painel-condicionais'>
      <h2><i className="fa-solid fa-bag-shopping"></i> Todos os Condicionais</h2>    
        <div className='pesquisar-condicional-cliente'>
          <button className='button-listarCondicionais' onClick={()=>exibirCondicionaisAbertos()}>Condicionais em Aberto</button>
          {condicionaisAbertos && exibirAbertos ? 
            condicionaisAbertos.map((condicional, index)=>(
            <div className='card-condicional' key={index}>
              <p>Cliente: <strong>{condicional.cliente}</strong></p>
              <p>Data: {formatarDataExibir(condicional.data)} </p>
              <p>Produtos: <strong>{condicional.produtos.length}</strong></p>
              <ul className='lista-condicional'>
                {condicional.produtos.length == 0 ? 
                <div className='condiconal-encerrado'>
                    <h3>DEVOLVIDO</h3>
                </div>
                :
                condicional.produtos.map((produto, index)=>(
                  <li key={index}>{produto.codigo}</li>              
                ))}            
              </ul>    
              <button className='button-devolucao-condicional' onClick={()=>devolucaoCondicional(condicional)} disabled={condicional.produtos.length ==0 ? true : false}><i className="fa-solid fa-rotate-left"></i> Devolução</button>
              <button className='button-excluir-condicional' onClick={()=>deletarCondicional(condicional._id,condicional.produtos, setListaCondicionais,setListaProdutos, setProdutosEstoque, setFormCondicional, setAdicionados, setExibirAbertos(false))}><i className="fa-regular fa-trash-can"></i> Excluir</button>
            </div>
          ))
          :''}
        </div>

        <div className='pesquisar-condicional-cliente'>
          <button className='button-listarCondicionais' onClick={()=>exibirCondicionaisDevolvidos()}>Condicionais Devolvidos</button>          
          {condicionaisDevolvidos && exibirDevolvidos ? 
            condicionaisDevolvidos.map((condicional, index)=>(
            <div className='card-condicional' key={index}>
              <p>Cliente: <strong>{condicional.cliente}</strong></p>
              <p>Data: {formatarDataExibir(condicional.data)} </p>
              <p>Produtos:</p>
              <ul className='lista-condicional'>
                {condicional.produtos.length == 0 ? 
                <div className='condiconal-encerrado'>
                    <h3>DEVOLVIDO</h3>
                </div>
                :
                condicional.produtos.map((produto, index)=>(
                  <li key={index}>{produto.codigo}</li>              
                ))}            
              </ul>    
              <button className='button-devolucao-condicional' onClick={()=>devolucaoCondicional(condicional)} disabled={condicional.produtos.length ==0 ? true : false}><i className="fa-solid fa-rotate-left"></i> Devolução</button>
              <button className='button-excluir-condicional' onClick={()=>deletarCondicional(condicional._id,condicional.produtos, setListaCondicionais,setListaProdutos, setProdutosEstoque, setFormCondicional, setAdicionados, setExibirDevolvidos(false))}><i className="fa-regular fa-trash-can"></i> Excluir</button>
            </div>
            ))
          :''}        
        </div>                
    </div>
              
      
    {/* {listaCondicionais ? 
    <div className='painel-condicionais'>
      <h2><i className="fa-solid fa-bag-shopping"></i> Todos os Condicionais</h2>
      {listaCondicionais.map((condicional, index)=>(
          <div className='card-condicional' key={index}>
          <p>Cliente: <strong>{condicional.cliente}</strong></p>
          <p>Data: {formatarDataExibir(condicional.data)} </p>
          <p>Produtos:</p>
          <ul className='lista-condicional'>
            {condicional.produtos.length == 0 ? 
            <div className='condiconal-encerrado'>
                <h3>DEVOLVIDO</h3>
            </div>
            :
            condicional.produtos.map((produto, index)=>(
              <li key={index}>{produto.codigo}</li>              
            ))}            
          </ul>
          <button className='button-devolucao-condicional' onClick={()=>devolucaoCondicional(condicional)} disabled={condicional.produtos.length ==0 ? true : false}><i className="fa-solid fa-rotate-left"></i> Devolução</button>
          <button className='button-excluir-condicional' onClick={()=>deletarCondicional(condicional._id,condicional.produtos, setListaCondicionais,setListaProdutos, setProdutosEstoque, setFormCondicional, setAdicionados)}><i className="fa-regular fa-trash-can"></i> Excluir</button>
      </div>
      ))}
    </div>
    : '' } */}
    </>
  )
}

export default Condicional