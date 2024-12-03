import axios from 'axios'

const addVenda = async(formVenda,notifyVendaSalva,setFormVenda, setOpenModal,notifyErroVenda,setAdicionados)=>{
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

export {addVenda}