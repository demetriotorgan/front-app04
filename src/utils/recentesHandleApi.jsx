import axios from 'axios'

const getVendasRecentes = async(setVendasRecentes)=>{
    try {
        const response = await axios
            .get('https://api-app03.vercel.app/produtos/venda/recentes')
            console.log('Vendas recentes',response.data);
            setVendasRecentes(response.data);
    } catch (error) {
        console.error('Erro ao carregar vendas recentes',error);
    }
}

const getRecebimentosRecentes = async(setRecebimentosRecentes)=>{
    try {
        const response = await axios
            .get('https://api-app03.vercel.app/produtos/venda/pagamentos/recentes')
            console.log('Recebimentos Recentes', response.data);
            setRecebimentosRecentes(response.data)
    } catch (error) {
        console.error('Erro ao carregar recebimentos recentes', error);
    }
}

const getCondicionaisRecentes = async(setCondicionaisRecentes)=>{
    try {
        const response = await axios
        .get('https://api-app03.vercel.app/produtos/venda/condicional/recentes')
        console.log('Condiconais recentes', response.data);
        setCondicionaisRecentes(response.data);
    } catch (error) {
        console.error('Erro ao carregar condicionais recentes',error);
    }
}

export {getVendasRecentes, getRecebimentosRecentes, getCondicionaisRecentes}