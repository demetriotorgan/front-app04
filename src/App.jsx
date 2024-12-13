import { Outlet } from 'react-router'
import './App.css'
import NavBar from './components/navbar/NavBar'
import Footer from './components/footer/Footer'

function App() {  

  return (
    <>
    <NavBar/>    
    <Outlet/> 
    <Footer/>   
    </>
  )
}

export default App
