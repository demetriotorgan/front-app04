import { Outlet } from 'react-router'
import './App.css'
import NavBar from './components/navbar/NavBar'

function App() {  

  return (
    <>
    <NavBar/>    
    <Outlet/>    
    </>
  )
}

export default App
