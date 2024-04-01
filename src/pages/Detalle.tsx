import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Empresa } from "../types/Empresa";
import Header from "../components/Header/Header";
import Loader from "../components/Loader/Loader";
import { Noticia } from "../types/Noticia";
import Footer from "../components/Footer/Footer";


const Detalle=()=> {

  const {id}=useParams();
const [empresa,setEmpresa]=useState<Empresa>();
const [isloading,setIsloading]=useState(true);
const [noticia,setNoticia]=useState<Noticia>();

useEffect(()=>{

  const empresaMano:Empresa={
    id: 1,
    denominacion: "Tecnologías Innovar",
    telefono: "+54 11 2345-6789",
    horarioDeAtencion: "Lunes a Viernes de 8 a 17 hs",
    quienesSomos: "Somos líderes en soluciones tecnológicas innovadoras.",
    latitud: -34.603722,
    longitud: -58.381592,
    domicilio: "Av. Siempre Viva 742, Buenos Aires",
    email: "info@innovartech.com",
    listaNoticias: [
      {
        id: 1,
        tituloNoticia: "Innovación en IA",
        resumenNoticia: "Presentamos nuestro nuevo asistente de IA.",
        imagenNoticia: "/src/assets/image/page-1_slide2.jpg",
        contenidoHTML: "<p>Descubre cómo nuestra IA puede cambiar tu vida.</p>",
        publicada: "Sí",
        fechaPublicacion: "2024-03-16"
      },
      {
        id: 2,
        tituloNoticia: "Expansión Global",
        resumenNoticia: "Anunciamos la apertura de nuevas oficinas internacionales.",
        imagenNoticia: "/src/assets/image/page-1_slide1.jpg",
        contenidoHTML: "<p>Conoce nuestras nuevas ubicaciones alrededor del mundo.</p>",
        publicada: "Sí",
        fechaPublicacion: "2024-03-17"
      }
     
    ]
  }

 const noticiaEncontrada=empresaMano.listaNoticias.find((noticia:Noticia):boolean=>noticia.id==Number(id));
    

    setEmpresa(empresaMano);
    setNoticia(noticiaEncontrada)
    setIsloading(false);
  

},[])
  const imagenPrincipalStyle = {
      height: '450px',
      backgroundImage: `url(${noticia?noticia.imagenNoticia:""})`,
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
     <Header denominacion={empresa.denominacion} telefono={empresa.telefono} horaDeAtencion={empresa.horarioDeAtencion} />
    <main>        

    <section className="well well4">
  
      <div className="container">
    <center>
      <div id="imagenPrincipal" style={imagenPrincipalStyle}>
        <div style={tituloNoticiaStyle}>
         {noticia?.tituloNoticia}                        
        </div>
      </div>
    </center>
    <h2>
          {noticia?.tituloNoticia}
        </h2>
    Fecha Publicacion: {noticia?.fechaPublicacion}
    <hr />
        <div className="row offs2">
          
          <div className="col-lg-12">
            <dl className="terms-list">
              <dt>
       {noticia?.resumenNoticia}
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
