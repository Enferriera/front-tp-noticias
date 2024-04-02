import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Empresa } from "../types/Empresa";
import Header from "../components/Header/Header";
import Loader from "../components/Loader/Loader";
import { Noticia } from "../types/Noticia";
import Footer from "../components/Footer/Footer";
import { NoticiaService } from "../utils/NoticiaService";
import { EmpresaService } from "../utils/EmpresaService";


const Detalle=()=> {

  const {id}=useParams();
const [empresa,setEmpresa]=useState<Empresa>();
const [isloading,setIsloading]=useState(true);
const [noticia,setNoticia]=useState<Noticia>();

useEffect(()=>{

 const detalleNoticia=async()=>{
  const detalle=await NoticiaService.getOneNoticia(Number(id));
  setNoticia(detalle);
  const empresaNoticia= await EmpresaService.getOneEmpresa(detalle.idEmpresa);
  setEmpresa(empresaNoticia)
  setIsloading(false);
 }
 detalleNoticia();
   
},[])
  const imagenPrincipalStyle = {
      height: '450px',
      backgroundImage: `url(${noticia?noticia.imagen:""})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
  };
  const tituloNoticiaStyle = {
    textAlign: 'left',
    backgroundColor: 'rgba(1, 1, 1, 0.5)', 
    color: '#ffffff',
    fontSize: '16px',
    lineHeight: '50px',
  }
  return (
    <>
    {isloading?(<Loader/>):(
      <>
     <Header idEmpresa={empresa.id} denominacion={empresa.denominacion} telefono={empresa.telefono} horaDeAtencion={empresa.horario_de_atencion} />
    <main>        

    <section className="well well4">
  
      <div className="container">
    <center>
      <div id="imagenPrincipal" style={imagenPrincipalStyle}>
        <div style={tituloNoticiaStyle}>
         {noticia?.titulo}                        
        </div>
      </div>
    </center>
    <h2>
          {noticia?.titulo}
        </h2>
    Fecha Publicacion: {noticia?.fecha.toLocaleString()}
    <hr />
        <div className="row offs2">
          
          <div className="col-lg-12">
            <dl className="terms-list">
              <dt>
       {noticia?.resumen}
              </dt>
      <hr />
              <dd dangerouslySetInnerHTML={{ __html:noticia?.contenidoHTML}}>
               
        
      </dd>
            </dl>
          </div>
        </div>
      </div>
    </section>   
    

  </main>
  <Footer denominacion={empresa.denominacion}   />
  </>
  )}
  </>)
}

export default Detalle;
