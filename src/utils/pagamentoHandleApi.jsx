import axios from 'axios'
import { notifyErroPagamento, notifyPagamentoExcluido, notifyPagemntoSalvo } from './mensagens';
import { getVendas } from './vendaHandleApi';

const addPagamento = (_id, formPagamento, setOpenModal, setCliente, setVendas)=>{
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

export {addPagamento, excluirPagamento}