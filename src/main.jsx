import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import App from './App.jsx'
import Inicio from './components/inicio/Inicio.jsx'
import Estoque from './components/estoque/Estoque.jsx'
import Condicional from './components/condicional/Condicional.jsx'
import Venda from './components/vendas/Venda.jsx'
import ListarVendas from './components/listarVendas/ListarVendas.jsx'
import Recebimentos from './components/recebimentos/Recebimentos.jsx'
import Relatorios from './components/relatorios/Relatorios.jsx'

const router = createBrowserRouter([
  {   
    path:"/",
    element: <App />,
    children:[
      {
        path:"/",
        element:<Inicio/>
      },
      {
        path:"/estoque",
        element: <Estoque />
      },
      {
        path:"/condicional",
        element: <Condicional />
      },
      {
        path:"/vendas",
        element: <Venda />
      },
      {
        path:"/listarvendas",
        element:<ListarVendas/>
      },
      {
        path:"/recebimentos",
        element:<Recebimentos/>
      },
      {
        path:"/relatorios",
        element:<Relatorios/>
      }
    ]
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider 
    router={router} 
    future={{
      v7_startTransition:true,
    }}
   />
  </StrictMode>,
)
