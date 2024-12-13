import axios from 'axios'

const verificaConexaoComDB = async(setIsConnect)=>{
    try {
        const response = await axios
            .get('https://api-app03.vercel.app/produtos/venda/conexao')
            console.log('Conectado ao MongoDB');
            setIsConnect(true);

    } catch (error) {
        console.log('Erro com a conexão do banco de dados');
    }
}

export {verificaConexaoComDB}