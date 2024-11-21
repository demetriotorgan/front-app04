import {format} from 'date-fns'

const formataValor = (valor)=>{
    return new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency:'BRL'
    }).format(valor);
};

const formatarData = (data)=>{
    return format(new Date(data), 'dd LLL yyyy');
}

const limparCampos = (setFormData, setPc, setPv)=>{
    setFormData({
        codigo:'',
        descricao:'',
        grade:'',
        pc:'' ,
        pv:'',
        dataentrada:'',  
        status:'',
      })
      setPc('');
      setPv('');
}

export{formataValor, formatarData, limparCampos}