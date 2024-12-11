import axios from 'axios'
import { notifyErroAtualizarPagamento, notifyErroAtualizarPagamentoNaLista, notifyErroPagamento, notifyPagamentoAtualizadoNaLista, notifyPagamentoDaListaExcluido, notifyPagamentoExcluido, notifyPagamentoInseridoNaLista, notifyPagamentosEncontrados, notifyPagemntoAtualizado, notifyPagemntoSalvo, notifySemPagamentosRegistrados } from './mensagens';
import { getVendas } from './vendaHandleApi';

const addPagamento = (_id, formPagamento, setOpenModal, setCliente, setVendas,setFormPagamento,setValor,dadosVenda)=>{
    axios
        .put(`https://api-app03.vercel.app/produtos/venda/${_id}/pagamentos`,
            {
                pagamentos:[{
                data:formPagamento.data,
                valor:formPagamento.valor,
                tipo:formPagamento.tipo
                }]
            })
            .then((data)=>{                
                addPagamentoNaLista(dadosVenda,formPagamento);
                console.log('Pagamento cadastrado com sucesso -->');
                console.log(data);
                setOpenModal(false);
                setCliente('');
                setFormPagamento({
                    data:'',
                    valor:'',
                    tipo:''
                });
                setValor('');
                getVendas(setVendas);
                notifyPagemntoSalvo();
            })
            .catch((err)=>{
                console.log(err)
                notifyErroPagamento();
                setOpenModal(false);
                setCliente('');                
            })
}

const excluirPagamento = (vendaId, pagamentoId, setVendas,setCliente)=>{
try {
    axios
        .delete(`https://api-app03.vercel.app/produtos/venda/${vendaId}/pagamentos/${pagamentoId}`)
        .then((data)=>{
            console.log(data);
            getVendas(setVendas);
            setCliente('');
            notifyPagamentoExcluido();
        })
} catch (error) {
    console.error('Erro ao excluir pagamento');
}
}

const updatePagamento = (vendaId, pagamentoId, formPagamento, setOpenModal, setCliente, setVendas,setFormPagamento,setValor,setUpdateMode,dadosVenda)=>{
    try {
        axios
        .put(`https://api-app03.vercel.app/produtos/venda/${vendaId}/pagamentos/${pagamentoId}`,
            {
                novoPagamento: {
                    data: formPagamento.data , 
                    valor: formPagamento.valor,
                    tipo: formPagamento.tipo
                }
            })
            .then((data)=>{
                updatePagamentoNaLista(vendaId,dadosVenda,formPagamento);
                console.log('Pagamento atualizado com sucesso');
                console.log(data);
                getVendas(setVendas);
                setOpenModal(false);
                setCliente('');
                setFormPagamento({
                    data:'',
                    valor:'',
                    tipo:''
                })
                setValor('');
                setUpdateMode(false);
                notifyPagemntoAtualizado();
            })
    } catch (error) {
        console.error('Erro ao atualizar pagamento')
        notifyErroAtualizarPagamento();
    }
            
}

const pagamentosPorMes = (setPagamentos,mes, ano)=>{
    try {
        axios
            .get(`https://api-app03.vercel.app/produtos/venda/busca?mes=${mes}&ano=${ano}`)
            .then(({data})=>{
                console.log('Pagamentos: ',data);
                setPagamentos(data)
                if(data.length == 0){
                    // console.log('Sem pagamentos registrados')
                    notifySemPagamentosRegistrados();
                    setPagamentos('');
                }else{
                    notifyPagamentosEncontrados();
                }
            })
    } catch (error) {
        console.error('Erro ao carregar pagamentos')   
    }
}

//--------------------Lista de Pagamentos-------------------//

const getListaPagamentos = async(setPagamentosCliente)=>{
    try {
        const response = await axios
            .get('https://api-app03.vercel.app/produtos/venda/pagamentos/lista')
            console.log('Lista de Pagamentos ->',response.data);
            setPagamentosCliente(response.data);

    } catch (error) {
        console.log('Erro ao carregar lista de Pagamentos', error);        
    }
}

const addPagamentoNaLista = async(dadosVenda, formPagamento)=>{
    try {
        const response = await axios
            .post('https://api-app03.vercel.app/produtos/venda/pagamentos',{               
                    vendaid:dadosVenda._id,
                    cliente: dadosVenda.cliente,
                    data:formPagamento.data,
                    valor: formPagamento.valor,
                    tipo: formPagamento.tipo,
                    produtos: dadosVenda.produtos                   
            })
            console.log('Pagamento inserido na Lista de Pagamento', response.data);
            notifyPagamentoInseridoNaLista();
    } catch (error) {
        console.log(error);
    }
}

const updatePagamentoNaLista = async(vendaId, dadosVenda, formPagamento)=>{
    try {
        console.log('VendaId Pagamento', vendaId)
        console.log('Dados da venda', dadosVenda)
        console.log('formPagamento', formPagamento)
        axios.post('https://api-app03.vercel.app/produtos/venda/pagamentos/lista/update',{
                vendaid: vendaId,
                cliente: dadosVenda.cliente,
                data: formPagamento.data,
                valor: formPagamento.valor,
                tipo: formPagamento.tipo,
                produtos: dadosVenda.produtos
        })
        .then((data)=>{
            console.log('Pagamento Atualizado com sucesso', data)
            notifyPagamentoAtualizadoNaLista();
        })            
    } catch (error) {
        console.log(error);
        notifyErroAtualizarPagamentoNaLista();
    }
}

const deletePagamentoNaLista = async(_id,setPagamentosCliente)=>{
    try {
        console.log(_id)
        axios
            .post('https://api-app03.vercel.app/produtos/venda/pagamentos/lista/delete',{_id})
            .then((data)=>{
                console.log('Pagamento Excluido da lista com sucesso', data);
                getListaPagamentos(setPagamentosCliente);
                notifyPagamentoDaListaExcluido();
            })
    } catch (error) {
        console.log('Erro ao excluir pagamento da Lista',error)
    }
}

const updateProdutosListaPagamentos = async(formVenda,vendaId)=>{
    try {
        axios
            .post('https://api-app03.vercel.app/produtos/venda/pagamentos/lista/update',{
                vendaid: vendaId,
                cliente: formVenda.cliente,
                data: formVenda.data,                
                produtos: formVenda.produtos
            })
            .then((data)=>{
                console.log('Produtos da lista de pagamentos atualizados',data)
                
            })
    } catch (error) {
        console.log(error)
    }
}

export {addPagamento, excluirPagamento, updatePagamento, pagamentosPorMes,getListaPagamentos,addPagamentoNaLista, updatePagamentoNaLista,deletePagamentoNaLista,updateProdutosListaPagamentos}