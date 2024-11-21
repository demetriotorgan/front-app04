import React from 'react'
import './ModalEstoque.css'
import { formatarData, formataValor, limparCampos } from '../../../utils/formatar';
import { addForm } from '../../../utils/estoqueHandleApi';


const ModalEstoque = ({openModal, setOpenModal, formData, setFormData, setPc, setPv,notifySucesso}) => {

    const handleClose =()=>{
        setOpenModal(false);        
    };

    const enviarForm = (formData)=>{
        console.log(formData,'Enviand form....');        
        addForm(formData, notifySucesso);
        limparCampos(setFormData, setPc, setPv);
        setOpenModal(false);
    }

    
  return (
    <>
    {openModal && (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <h2>Confira os dados</h2>
                    <div className='dados-venda'>
                        <p>Codigo: {formData.codigo}</p>
                        <p>Descrição: {formData.descricao}</p>
                        <p>Grade: {formData.grade}</p>
                        <p>PC: {formataValor(formData.pc)}  </p>
                        <p>PV: {formataValor(formData.pv)}</p>
                        <p>Data Entrada: {formatarData(formData.dataentrada)}</p>
                        <p>Status: {formData.status} </p>
                    </div>
                    <div className='modal-button'>
                    <button className='close-button' onClick={()=>enviarForm(formData)}>Enviar</button>
                    <button className='close-button' onClick={handleClose}>Cancelar</button>                    
                    </div>
            </div>
        </div>
    )}
    </>
  )
}

export default ModalEstoque