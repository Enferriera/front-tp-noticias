import { useState,useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Empresa } from "../types/Empresa";
import { Noticia } from "../types/Noticia";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Loader from "../components/Loader/Loader";

const Buscador=()=> {
const navigate=useNavigate();
const location = useLocation();
const [empresa,setEmpresa]=useState<Empresa>();
const [isloading,setIsloading]=useState(true);
const [noticias,setNoticias]=useState<Noticia[]>([]);
const [buscar,setBuscar]=useState<string>('');
const [idEmpresa,setIdEmpresa]=useState<number>();

useEffect(() => {
  const searchParams = new URLSearchParams(location.search);
  const buscar = searchParams.get('buscar');
  const empresaId=searchParams.get('empresaId');

  setBuscar(buscar);
  setIdEmpresa(Number(empresaId));
 
},[])
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

const noticiaEncontrada=empresaMano.listaNoticias;
  

  setEmpresa(empresaMano);
  setNoticias(noticiaEncontrada);
  setIsloading(false);


},[])
  return (
    <>
    {isloading?(<Loader/>):(
      <>
     <Header palabraBuscar={buscar} idEmpresa={empresa.id} denominacion={empresa.denominacion} telefono={empresa.telefono} horaDeAtencion={empresa.horarioDeAtencion} />
    
      <main>

        <section className="well well4">

          <div className="container">

            <h2>
              Texto Buscado
            </h2>
            <div className="row offs2">

              <table className="table" width="90%" align="center">
                <tbody >
                  {noticias.map(noticia=>(
                     <tr>
                     <td>
                       <a onClick={()=>navigate(`/detalle/${noticia.id}`)}>
                         <img width="250px" className="imgNoticia" src={noticia.imagenNoticia} alt={noticia.tituloNoticia} />
                       </a>
                     </td>
                     <td width="25"></td>
                     <td style={{textAlign:'justify'}} valign="top">
                       <a style={{textAlign:'justify', fontSize:'20px'}} onClick={()=>navigate(`/detalle/${noticia.id}`)} className="banner">
                        {noticia.tituloNoticia}								</a>
                       <div className="verOcultar">
                         {noticia.resumenNoticia}<a onClick={()=>navigate(`/detalle/${noticia.id}`)} style={{color:'blue'}}> Leer Mas - 2020-02-14</a>
                       </div>
                     </td>
                     <td>
                      <div className="d-flex gap-2"><button className="btn btn-warning btn-sm text-black" >Eitar Noticia</button>
                      <button className="btn btn-danger btn-sm text-black" >Eliminar Noticia</button></div>
                     </td>
                   </tr>
                  ))}
                 
                </tbody>
              </table>
              <hr />
            </div>
          </div>
        </section>


      </main>
      <Footer denominacion={empresa.denominacion}   />
  </>
  )}
  </>)
}

export default Buscador;
