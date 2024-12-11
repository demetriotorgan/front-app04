import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer, toast } from 'react-toastify';


const notifySucesso = () => toast.success('Produto cadastrado com sucesso', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const notifyErro = () => toast.error('Codigo do produto já existente', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const notifyErroDelete = () => toast.error('Não foi possível cadastrar novo produto', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});


const deleteSucesso = () => toast.success('Produto excluido com sucesso', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const notifyAtualizarProduto = () => toast.info('Produto atualizado com sucesso', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const notifyAtualizarProdutoErro = () => toast.warn('Não foi possível atualizar produto', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const notifyVendaSalva = () => toast.info('Venda cadastrada com sucesso', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const notifyErroVenda = () => toast.error('Não foi possível cadastrar nova venda', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const notifyVendaExcluida = () => toast.warn('Venda excluida com sucesso', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const notifyPagemntoSalvo = () => toast.info('Pagamento cadastrado com sucesso', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const notifyErroPagamento = () => toast.error('Não foi possível cadastrar novo pagamento', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const notifyPagamentoExcluido = () => toast.warn('Pagamento excluido com sucesso', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const notifyPagemntoAtualizado = () => toast.info('Pagamento Atualizado com sucesso', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const notifyErroAtualizarPagamento = () => toast.error('Não foi possível cadastrar novo pagamento', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const notifyStatusAtualizado = () => toast.warn('Status do produto atualizado', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const notifySemPagamentosRegistrados = () => toast.error('Sem pagamentos registrados neste período', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const notifyPagamentosEncontrados = () => toast.info('Pagamentos encontrados neste período', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const notifyVendaAtualizada = () => toast.info('Venda atualizada com sucesso', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const notifyErroAtualizarVenda = () => toast.error('Erro ao atualizar venda', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const notifyErroCarregarProdutos = () => toast.error('Erro ao carregar produtos do estoque', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const notifyCondiconalSalvo = () => toast.success('Condiconal salvo com sucesso', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const notifyStatusCondicional = () => toast.info('Status dos produtos alterado para Condiconal', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const notifyCondicionalExcluido = () => toast.warn('Condicional excluido com sucesso', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const notifyCondicionalAtualizado = () => toast.success('Condicional atualizado', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const notifyPagamentoInseridoNaLista = () => toast.success('Pagamento inserido na lista de Pagamentos com sucesso', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const notifyPagamentoAtualizadoNaLista = () => toast.info('Pagamento atualizado na lista com sucesso', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const notifyErroAtualizarPagamentoNaLista = () => toast.error('Codigo do produto já existente', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

const notifyPagamentoDaListaExcluido = () => toast.error('Pagamento excludi da lista de Pagamentos com sucesso', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
});

export { notifySucesso, notifyErro, deleteSucesso, notifyErroDelete, notifyAtualizarProduto, notifyAtualizarProdutoErro, notifyVendaSalva, notifyErroVenda, notifyVendaExcluida, notifyPagemntoSalvo, notifyErroPagamento, notifyPagamentoExcluido, notifyPagemntoAtualizado, notifyErroAtualizarPagamento, notifyStatusAtualizado, notifySemPagamentosRegistrados, notifyPagamentosEncontrados, notifyVendaAtualizada, notifyErroAtualizarVenda, notifyErroCarregarProdutos, notifyCondiconalSalvo, notifyStatusCondicional, notifyCondicionalExcluido, notifyCondicionalAtualizado, notifyPagamentoInseridoNaLista, notifyPagamentoAtualizadoNaLista, notifyErroAtualizarPagamentoNaLista,notifyPagamentoDaListaExcluido}