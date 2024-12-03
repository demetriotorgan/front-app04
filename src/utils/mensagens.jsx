import 'react-toastify/dist/ReactToastify.css';
import {Bounce, ToastContainer, toast } from 'react-toastify';


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

const notifyAtualizarProduto = ()=> toast.info('Produto atualizado com sucesso', {
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

const notifyAtualizarProdutoErro = ()=>toast.warn('Não foi possível atualizar produto', {
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

const notifyVendaSalva = ()=> toast.info('Venda cadastrada com sucesso', {
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
    

export{notifySucesso, notifyErro, deleteSucesso, notifyErroDelete, notifyAtualizarProduto, notifyAtualizarProdutoErro, notifyVendaSalva, notifyErroVenda}