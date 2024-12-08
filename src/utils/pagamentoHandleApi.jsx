import axios from 'axios'
import { notifyErroAtualizarPagamento, notifyErroPagamento, notifyPagamentoExcluido, notifyPagamentosEncontrados, notifyPagemntoAtualizado, notifyPagemntoSalvo, notifySemPagamentosRegistrados } from './mensagens';
import { getVendas } from './vendaHandleApi';

const addPagamento = (_id, formPagamento, setOpenModal, setCliente, setVendas,setFormPagamento,setValor)=>{
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

const updatePagamento = (vendaId, pagamentoId, formPagamento, setOpenModal, setCliente, setVendas,setFormPagamento,setValor,setUpdateMode)=>{
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

export {addPagamento, excluirPagamento, updatePagamento, pagamentosPorMes}