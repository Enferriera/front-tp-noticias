import { Route, Routes } from "react-router-dom";
import IndexPage from "../pages/IndexPage";
import Home from "../pages/Home";
import Detalle from "../pages/Detalle";
import Buscador from "../pages/Buscador";
import Tiny from "../pages/Tiny";
import Error from "../pages/Error";
import FormEmpresa from "../pages/FormEmpresa";



 const AppRoutes :React.FC= ()=> {
  return (
    
    <Routes>
        <Route path="/" element={<IndexPage/>}/>
        <Route path="/home/:id" element={<Home/>}/>
        <Route path="/detalle/:id" element={<Detalle/>}/>
        <Route path="/buscador" element={<Buscador/>}/>
        <Route path="/tiny" element={<Tiny/>}/>
        <Route path="/empresaform" element={<FormEmpresa/>}/>
        <Route path="/*" element={<Error/>}/>
        

    </Routes>
    
  )
}

export default AppRoutes;
