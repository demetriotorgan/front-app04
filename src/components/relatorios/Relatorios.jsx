import React, { useEffect, useState } from 'react'
import './Relatorios.css'
import { getRelatorioPagamentos, getRelatorioVendas } from '../../utils/relatoriosHandleApi';
import pagamentosPDF from '../../utils/pagamentosRelatorio';
import { formatarDataExibir, formataValor } from '../../utils/formatar';
import vendasRelatorio from '../../utils/vendasRelatorio';

const Relatorios = () => {
    const [pagamentos, setPagamentos] = useState([]);
    const [vendas, setVendas] = useState([]);    

useEffect(()=>{
    getRelatorioPagamentos(setPagamentos);
    getRelatorioVendas(setVendas);
},[])

    const gerarRelatorioRecebimentos = (pagamentos)=>{
        const pdfPagamentos = pagamentos.map(pagamento =>{
            return {
                cliente: pagamento.cliente,
                data:formatarDataExibir(pagamento.data),
                valor:formataValor(pagamento.valor)
            }
        })
        //console.log(pdfPagamentos)
        pagamentosPDF(pdfPagamentos);
    }

    const gerarRelatorioVendas = (vendas)=>{
        const pdfVendas = vendas.map(venda=>{
            return{
                cliente:venda.cliente,
                data:formatarDataExibir(venda.data),
                valor:formataValor(venda.valor)
            }
        })
        vendasRelatorio(pdfVendas);
    }

  return (
    <>
    <div className='painel-relatorios'>
        <h2>Relatórios</h2>
        <div className='relatorios'>
            <p className="shrink-button" onClick={()=>gerarRelatorioRecebimentos(pagamentos)}><i className="fa-regular fa-file-pdf"></i> Recebimentos</p>
            <p className="shrink-button" onClick={()=>gerarRelatorioVendas(vendas)}><i className="fa-regular fa-file-pdf"></i> Vendas</p>            
        </div>
    </div>
    </>
  )
}

export default Relatorios