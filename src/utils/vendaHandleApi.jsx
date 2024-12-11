import axios from 'axios'
import { notifyErroAtualizarVenda, notifyStatusAtualizado, notifyVendaAtualizada, notifyVendaExcluida } from './mensagens';
import { getProdutosEstoque } from './estoqueHandleApi';
import { updateProdutosListaPagamentos } from './pagamentoHandleApi';

const getVendas = async(setVendas)=>{
    axios
        .get('https://api-app03.vercel.app/produtos/venda')
        .then(({data})=>{
            console.log('Vendas ->', data)
            setVendas(data);
        })
}

const addVenda = async(formVenda,notifyVendaSalva,setFormVenda, setOpenModal,notifyErroVenda,setAdicionados, produtosVendidos,setListaProdutos,setProdutosEstoque,setVendas)=>{
    try {        
        const response = await axios.post('https://api-app03.vercel.app/produtos/venda/save', {
            cliente:formVenda.cliente,
            data:formVenda.data,
            valor:formVenda.valor,
            parcelas:formVenda.parcelas,
            formapagamento:formVenda.formapagamento,
            produtos:formVenda.produtos,
            pagamentos:formVenda.pagamentos,
        })        
        console.log('Venda cadastrada com sucesso', response.data)
        notifyVendaSalva();
        updateStatus(produtosVendidos,setListaProdutos,setProdutosEstoque);
        setOpenModal(false);
        setFormVenda({
            cliente:'',
            data:'',
            valor:'',
            parcelas:'',
            formapagamento:'',
            produtos:'',
            pagamentos:[]
        });
        setAdicionados([]); 
        getVendas(setVendas);
    } catch (error) {
        notifyErroVenda();
        console.error('Erro ao cadastrar venda', error)
        setOpenModal(false);
    }
}

const deleteVenda = (_id, setVendas, setCliente, setVendaPesquisada,produtosExcluidos,setListaProdutos,setProdutosEstoque)=>{
    try {
        console.log(_id);
        axios
            .delete(`https://api-app03.vercel.app/produtos/venda/${_id}`)
            .then((data)=>{
                console.log('Venda excluida com sucesso ->')
                console.log(data)
                getVendas(setVendas);
                setCliente('');
                setVendaPesquisada('');
                notifyVendaExcluida();
                devolucaoProdutosEstoque(produtosExcluidos,setVendas,setListaProdutos,setProdutosEstoque)
            })
    } catch (error) {
        console.error('Erro ao excluir venda');
    }
}

const updateStatus = async (produtosVendidos,setListaProdutos,setProdutosEstoque)=>{
    try {
        console.log('Produtos Vendidos', produtosVendidos)
        const response = await axios
            .put('https://api-app03.vercel.app/produtos/venda',
                {
                    produtos:produtosVendidos
                })                
                    console.log('Status Atualizados')
                    console.log(response.data);
                    notifyStatusAtualizado();
                    getProdutosEstoque(setListaProdutos,setProdutosEstoque);
                                
    } catch (error) {
        console.log('Erro ao atualizar status: ',error);
    }
}

const updateVenda = (formVenda, vendaId, setOpenModal, setFormVenda,setAdicionados,produtosExcluidos,setVendas,setListaProdutos,setProdutosEstoque,produtosVendidos)=>{
    try {
        console.log(formVenda, vendaId)
        axios
            .post('https://api-app03.vercel.app/produtos/venda/update',{
                _id:vendaId,
                    cliente:formVenda.cliente,
                    data:formVenda.data,
                    valor:formVenda.valor,
                    parcelas:formVenda.parcelas,
                    formapagamento:formVenda.formapagamento,
                    produtos:formVenda.produtos,
                    pagamentos:formVenda.pagamentos
            })
            .then((data)=>{
                updateProdutosListaPagamentos(formVenda,vendaId);
                console.log('Venda Atualizada')
                console.log(data)
                setOpenModal(false);
                setFormVenda({
                    cliente:'',
                    data:'',
                    valor:'',
                    parcelas:'',
                    formapagamento:'',
                    produtos:'',
                    pagamentos:[]
                });
                setAdicionados([]);
                if(produtosExcluidos.length !==0){
                    devolucaoProdutosEstoque(produtosExcluidos,setVendas,setListaProdutos,setProdutosEstoque)
                }                
                getVendas(setVendas);
                if(produtosVendidos.length !==0){
                updateStatus(produtosVendidos,setListaProdutos,setProdutosEstoque)
                }
                notifyVendaAtualizada();                
            })
            .catch((err)=>{
                console.log('Erro ao atualizar venda', err);
                notifyErroAtualizarVenda();
            })

    } catch (error) {
        
    }
}

const devolucaoProdutosEstoque = async(produtosExcluidos,setVendas,setListaProdutos,setProdutosEstoque)=>{
try {
    console.log('Produtos a devolver: ',produtosExcluidos);
    const response = await axios
    .put('https://api-app03.vercel.app/produtos/venda/devolucao',
        {
            produtos: produtosExcluidos
        })
        console.log('Proutos devolvidos ao estoque')
        console.log(response.data)
        getVendas(setVendas);
        getProdutosEstoque(setListaProdutos,setProdutosEstoque);
        notifyStatusAtualizado();
} catch (error) {
    console.error(error);
}
}

export {addVenda, getVendas, deleteVenda, updateStatus, updateVenda}