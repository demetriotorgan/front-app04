import axios from 'axios'
import { notifyAtualizarProduto, notifyAtualizarProdutoErro, notifyErroCarregarProdutos, notifyErroDelete } from './mensagens'

const getProdutos = async (setProdutos)=>{
    axios
        .get('https://api-app03.vercel.app/produtos')
        .then(({data})=>{
            console.log('data-->', data)
            setProdutos(data);                                    
        })
        .catch((err)=>{
            console.log(err)
            notifyErroCarregarProdutos();
        })
}


const getProdutosEstoque = async (setProdutos,setProdutosEstoque)=>{
    try {
        const response = await axios
        .get('https://api-app03.vercel.app/produtos')        
            console.log('data-->', response.data)
            setProdutos(response.data);                        
            const produtosEmEstoque = response.data.filter(venda => venda.status === "ESTOQUE");
            setProdutosEstoque(produtosEmEstoque);
            console.log('Produto em Estoque:', produtosEmEstoque);             
    } catch (error) {
        console.error('Erro ao carregar produtos do estoque');
        notifyErroCarregarProdutos();
    }
   
}

const addForm = async(formData,notifySucesso,notifyErro, notifyErroDelete)=>{
    try {
        const response = await axios.post('https://api-app03.vercel.app/produtos', formData,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        console.log('Cadastro enviado com sucesso', response.data);
        notifySucesso();        
    } catch (error) {
        console.error('Erro ao cadastrar produto', error)
        if(error.status === 500){
            notifyErro()
        }        
    }
}

const deleteProdutoPesquisa = (_id, setProdutoPesquisado, setCodigoProduto, deleteSucesso)=>{
    try {
        axios
            .post('https://api-app03.vercel.app/produtos/delete',{_id})
            .then((data)=>{
                console.log(data);
                setProdutoPesquisado('');
                setCodigoProduto('');                
                deleteSucesso();
            })
    } catch (error) {
        console.error('Erro ao deletar produto')
        notifyErroDelete();
    }
}

const deleteProdutoEstoque = (_id, setProdutos,deleteSucesso)=>{
    try {
        axios
            .post('https://api-app03.vercel.app/produtos/delete',{_id})
            .then((data)=>{
                console.log(data);
                getProdutos(setProdutos);                
                deleteSucesso();
            })
    } catch (error) {
        console.error('Erro ao deletar produto')
        notifyErroDelete();
    }
}

const editarForm = (formData, produtoId, notifyAtualizarProduto, notifyAtualizarProdutoErro, setFormData, setPc, setPv, setProdutos, setCodigoProduto)=>{
    axios
        .post('https://api-app03.vercel.app/produtos/update', 
            {_id: produtoId, 
                codigo: formData.codigo,
                descricao: formData.descricao,
                grade: formData.grade,
                pc: formData.pc,
                pv: formData.pv,
                dataentrada: formData.dataentrada,
                status: formData.status,
            })
        .then((data)=>{
            console.log(data);  
            setFormData({
                codigo:'',
                descricao:'',
                grade:'',      
                pc: setPc(''),
                pv: setPv(''),
                dataentrada: '',  
                status:'',
              })
            setCodigoProduto('');
            notifyAtualizarProduto(); 
            getProdutos(setProdutos);
            
        })
        .catch((err)=>{
            console.log(err)
            notifyAtualizarProdutoErro()
        });
}

export {addForm, getProdutos, getProdutosEstoque, deleteProdutoPesquisa, deleteProdutoEstoque, editarForm}