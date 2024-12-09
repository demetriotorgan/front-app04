import axios from 'axios'
import { notifyCondicionalAtualizado, notifyCondicionalExcluido, notifyCondiconalSalvo, notifyStatusCondicional } from './mensagens';
import { getProdutosEstoque } from './estoqueHandleApi';

const getCondicionais = async(setListaCondicionais)=>{
    try {
        const response = await axios
        .get('https://api-app03.vercel.app/produtos/venda/condicional')        
        console.log('Condicionais ->', response.data)
        setListaCondicionais(response.data);        
    } catch (error) {
        console.log('Erro ao carregar condicionais: ',error);
    }
}

const saveCondicional = async(formCondicional, setFormCondicional, setAdicionados, produtosCondicional,setListaProdutos, setProdutosEstoque,setListaCondicionais,setProdutosCondicional)=>{
    try {
        const response = await axios.post('https://api-app03.vercel.app/produtos/venda/condicional/save', formCondicional,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        console.log('Condiconal Cadastrado com sucesso', response.data);
        setFormCondicional({
            cliente:'',
            data:'',
            produtos:''
        })
        setAdicionados([]);
        entradaCondiconal(produtosCondicional,setListaProdutos, setProdutosEstoque,setListaCondicionais,setProdutosCondicional);
        getCondicionais(setListaCondicionais);
        notifyCondiconalSalvo();
    } catch (error) {
        console.log(error);
    }
}

const entradaCondiconal = async(produtosCondicional,setListaProdutos, setProdutosEstoque,setListaCondicionais,setProdutosCondicional)=>{
    try {
        console.log('Produtos para condicional:', produtosCondicional);
        const response = await axios
        .put('https://api-app03.vercel.app/produtos/venda/condicional/entrada',
            {
                produtos: produtosCondicional
            })
            console.log('Produtos salvos como condicionais')
            console.log(response.data)
            setProdutosCondicional('');
            getProdutosEstoque(setListaProdutos, setProdutosEstoque);            
            getCondicionais(setListaCondicionais);
            notifyStatusCondicional();

    } catch (error) {
        console.log(error);
    }
}

const deletarCondicional = (_id, condicionalProdutos, setListaCondicionais,setListaProdutos, setProdutosEstoque, setFormCondicional, setAdicionados)=>{
    const extrairId = (produtos)=>{
        return produtos.map(produto => ({_id:produto._id}))
    }
    const condicionaisId = extrairId(condicionalProdutos);
    console.log('Lista de Produtos em Condiconal: ',condicionaisId);
    try {
        console.log(_id)
        axios
            .post('https://api-app03.vercel.app/produtos/venda/condicional/delete',{_id})
            .then((data)=>{
                console.log(data);
                if(condicionalProdutos.length !==0){
                    devolucaoCondicional(condicionaisId,setListaProdutos, setProdutosEstoque,setListaCondicionais);
                }
                getCondicionais(setListaCondicionais);
                setFormCondicional({
                    cliente:'',
                    data:'',
                    produtos:''
                })
                setAdicionados([]);
                notifyCondicionalExcluido();
            })
    } catch (error) {
        console.log(error);
    }
}

const devolucaoCondicional = async(produtosCondiconal,setListaProdutos, setProdutosEstoque,setListaCondicionais)=>{
try {
    const response = await axios
        .put('https://api-app03.vercel.app/produtos/venda/devolucao',
            {
                produtos:produtosCondiconal
            })
            console.log('Produtos devolvidos ao estoque')
            console.log(response.data)
            getProdutosEstoque(setListaProdutos, setProdutosEstoque);
            notifyStatusCondicional();
            getCondicionais(setListaCondicionais);
} catch (error) {
    console.log(error);
}
}

const updateCondicional = (condicionalId, formCondicional,produtosExcluidos,setListaProdutos, setProdutosEstoque,setFormCondicional, setAdicionados, setProdutosExcluidos,setListaCondicionais, produtosCondicional,setProdutosCondicional,setModeDevolucao)=>{
    try {
        console.log('Condicional ID -> ', condicionalId);
        console.log('Form Condicional ->', formCondicional);
        axios
            .put('https://api-app03.vercel.app/produtos/venda/condicional/update',
                {
                    _id: condicionalId,
                    cliente: formCondicional.cliente,
                    data: formCondicional.data,
                    produtos: formCondicional.produtos
                })
                .then((data)=>{
                    console.log('Condicional Atualizado ->', data)
                    setFormCondicional({
                        cliente:'',
                        data:'',
                        produtos:''
                    });
                    setAdicionados([]);
                    setProdutosExcluidos([]);
                    if(produtosExcluidos.length !==0){
                        devolucaoCondicional(produtosExcluidos, setListaProdutos, setProdutosEstoque,setListaCondicionais);
                    }
                    if(produtosCondicional.length !==0){
                        entradaCondiconal(produtosCondicional,setListaProdutos, setProdutosEstoque,setListaCondicionais,setListaCondicionais,setProdutosCondicional)
                    }
                    getCondicionais(setListaCondicionais);
                    setModeDevolucao(false);
                    notifyCondicionalAtualizado();
                })
    } catch (error) {
        console.log(error);
    }
}
export {saveCondicional, entradaCondiconal, getCondicionais, deletarCondicional, devolucaoCondicional, updateCondicional}