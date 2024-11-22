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


export{notifySucesso, notifyErro, deleteSucesso}