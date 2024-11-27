import axios from 'axios'

const addVenda = async(formVenda)=>{
    try {
        const response = await axios.post('https://api-app03.vercel.app/venda', formVenda,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        console.log('Venda cadastrada com sucesso', response.data)
    } catch (error) {
        console.error('Erro ao cadastrar produto', error)
    }
}

export {addVenda}