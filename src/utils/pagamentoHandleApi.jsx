import axios from 'axios'
import { notifyErroPagamento, notifyPagemntoSalvo } from './mensagens';
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

export {addPagamento}