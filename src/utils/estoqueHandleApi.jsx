import axios from 'axios'

const addForm = async(formData,notifySucesso)=>{
    try {
        const response = await axios.post('https://api-app02.vercel.app/produtos', formData,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        console.log('Cadastro enviado com sucesso', response.data);
        notifySucesso();

    } catch (error) {
        console.error('Erro ao cadastrar produto', error)
    }
}

export {addForm}