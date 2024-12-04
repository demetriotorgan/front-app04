import { differenceInDays } from 'date-fns';
import React, { useState } from 'react'

const SemPagamento = ({data}) => {
    const [diaAtual, setDiaAtual] = useState(new Date());

    const calcularDias = (data)=>{
        return differenceInDays(diaAtual,data).toString();
    }
  return (
    <>
    <p>***Sem Pagamentos***</p>
    <p>Dias: {calcularDias(data)} dia(s) sem pagamento</p>
    </>
  )
}

export default SemPagamento