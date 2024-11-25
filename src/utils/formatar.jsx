//import {format, parse} from 'date-fns'
import { format, toZonedTime } from 'date-fns-tz';



const formataValor = (valor)=>{
    return new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency:'BRL'
    }).format(valor);
};

const formatarData = (data)=>{
    const data_formatada = new Date(`${data}T00:00:00`);
    return data_formatada.toDateString();
}

const formatarDataEditar = (data)=>{        
    const timeZone = 'UTC';
    const dataZoned = toZonedTime(data,timeZone);
    return format(dataZoned, 'yyyy-MM-dd', { timeZone });
}

const formatarDataExibir = (data)=>{        
    //console.log('Data em DataExibir: ', data);
    const timeZone = 'UTC';
    const dataZoned = toZonedTime(data,timeZone);
    return format(dataZoned, 'dd LLL yyyy', { timeZone });
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

const voltarAoTopo = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};


export{formataValor, formatarData, limparCampos, formatarDataEditar,formatarDataExibir, voltarAoTopo}

//Formatar Data
// console.log('Exibir data',data);
//     const dataCompleta = new Date(`${data}T00:00:00`);
//     return format(dataCompleta, 'dd LLL yyyy',{
//         locale:ptBR
//     })