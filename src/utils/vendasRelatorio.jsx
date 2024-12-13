import pdfMake from "pdfmake/build/pdfmake";

const vendasRelatorio = (vendas)=>{
    const reportTitle = [{
        text: 'Vendas',
        fontSize: 15,
        bold:'true',
        margin:[15,20, 15, 45 ]
    }];

    const dados = vendas.map((venda)=>{
        return [
            {text:venda.cliente, fontSize:10, margin:[15,5,0,2]},
            {text:venda.data, fontSize:10, margin:[15,5,0,2]},
            {text:venda.valor, fontSize:10, margin:[15,5,0,2]}
        ]
    })

    const details = [
        {
            table: {
                headerRows: 1,
                widths: ['*', '*', '*'],
                body:[
                    [
                        {text:'Cliente', style: 'tableHeader', fontSize:15},
                        {text:'Data', style: 'tableHeader', fontSize:15},
                        {text:'Valor', style: 'tableHeader', fontSize:15}
                    ],
                    ...dados
                ]
            },
            layout: 'lightHorizontalLines'
            //'headerLineOnly'
        }
    ];
    const rodape = (currentPage, pageCount)=>{
        return [
            {
                text: currentPage + '/' + pageCount,
                alignment: 'right',
                fontSize: 9,                
                margin:[0,10, 20, 0 ]
            }
        ]
    }

    const docDefinitions = {
            pageSize: 'A4',
            pageMargins: [15,50, 15, 40],
            header: [reportTitle],
            content: [details],
            footer: rodape
        }
        pdfMake.createPdf(docDefinitions).download();
}

export default vendasRelatorio