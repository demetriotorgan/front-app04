import axios from 'axios'
import { notifyAtualizarProduto, notifyAtualizarProdutoErro } from './mensagens'

const getProdutos = async (setProdutos)=>{
    axios
        .get('https://api-app03.vercel.app/produtos')
        .then(({data})=>{
            console.log('data-->', data)
            setProdutos(data)            
        })
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
        }else{
            notifyErroDelete()
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
    }
}

const editarForm = (formData, produtoId, notifyAtualizarProduto, notifyAtualizarProdutoErro, setFormData, setPc, setPv)=>{
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
            notifyAtualizarProduto()  
        })
        .catch((err)=>{
            console.log(err)
            notifyAtualizarProdutoErro()
        });
}

export {addForm, getProdutos, deleteProdutoPesquisa, deleteProdutoEstoque, editarForm}