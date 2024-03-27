import { Route, Routes } from "react-router-dom";
import IndexPage from "../pages/IndexPage";
import Home from "../pages/Home";
import Detalle from "../pages/Detalle";
import Buscador from "../pages/Buscador";
import Tiny from "../pages/Tiny";



 const AppRoutes :React.FC= ()=> {
  return (
    
    <Routes>
        <Route path="/" element={<IndexPage/>}/>
        <Route path="/home/:id" element={<Home/>}/>
        <Route path="/detalle" element={<Detalle/>}/>
        <Route path="/buscador" element={<Buscador/>}/>
        <Route path="/tiny" element={<Tiny/>}/>
        

    </Routes>
    
  )
}

export default AppRoutes;
