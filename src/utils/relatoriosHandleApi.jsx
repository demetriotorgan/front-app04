import axios from 'axios'

const getRelatorioPagamentos = async(setPagamentos)=>{
    try {
        const response = await axios
            .get('https://api-app03.vercel.app/produtos/venda/pagamentos/lista')
            console.log('Lista de Pagamentos ->',response.data);
            setPagamentos(response.data);            

    } catch (error) {
        console.log('Erro ao carregar lista de Pagamentos', error);        
    }
}

const getRelatorioVendas = async(setVendas)=>{
    try {
        const response = await axios
        .get('https://api-app03.vercel.app/produtos/venda')
        console.log('Lista de Vendas', response.data)
        setVendas(response.data)
    } catch (error) {
        console.log('Erro ao carregar lista de vendas', error);
    }
}

export {getRelatorioPagamentos, getRelatorioVendas}