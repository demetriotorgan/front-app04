import axios from 'axios'
import { notifyStatusAtualizado, notifyVendaExcluida } from './mensagens';
import { getProdutosEstoque } from './estoqueHandleApi';

const getVendas = async(setVendas)=>{
    axios
        .get('https://api-app03.vercel.app/produtos/venda')
        .then(({data})=>{
            console.log('Vendas ->', data)
            setVendas(data);
        })
}

const addVenda = async(formVenda,notifyVendaSalva,setFormVenda, setOpenModal,notifyErroVenda,setAdicionados, produtosVendidos,setListaProdutos,setProdutosEstoque)=>{
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
    } catch (error) {
        notifyErroVenda();
        console.error('Erro ao cadastrar venda', error)
        setOpenModal(false);
    }
}

const deleteVenda = (_id, setVendas, setCliente, setVendaPesquisada)=>{
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
            })
    } catch (error) {
        console.error('Erro ao excluir venda');
    }
}

const updateStatus = async (produtosVendidos,setListaProdutos,setProdutosEstoque)=>{
    try {
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

export {addVenda, getVendas, deleteVenda, updateStatus}