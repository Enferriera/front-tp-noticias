
import { useEffect, useState } from "react";
import { Empresa } from "../types/Empresa";
import { Noticia } from "../types/Noticia";
import { useParams, useNavigate} from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Carousel } from "react-bootstrap";

const Home=()=> {
  const navigate=useNavigate();
  const {id}=useParams();
const [empresa,setEmpresa]=useState<Empresa>();
const [isloading,setIsloading]=useState(true);

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
    console.log(empresaMano);

    setEmpresa(empresaMano);
    setIsloading(false);
  

},[])
  return (
<>
{!isloading&&empresa?(
  <>
   <Header denominacion={empresa.denominacion} telefono={empresa.telefono} horaDeAtencion={empresa.horarioDeAtencion} />
<main>        

<section className="well well1 well1_ins1">
<Carousel>
{empresa.listaNoticias.map((noticia:Noticia)=>(
      <Carousel.Item key={noticia.id}>
    <div className="w-100 bg-dark h-100">
     
      <img src={noticia.imagenNoticia}/>
    </div>
      
        <Carousel.Caption onClick={()=>navigate(`/detalle/${noticia.id}`)} className="d-flex justify-content-center" >
          <div className="bg-primary w-50">
          <a className="text-black fw-b" onClick={()=>navigate(`/detalle/${noticia.id}`)}>{noticia.tituloNoticia}</a>
          <p className="text-black fw-b">{noticia.resumenNoticia}</p>
          </div>
       
        </Carousel.Caption>
      </Carousel.Item>
       ) )}
      </Carousel> 

</section>

<section className="well well2 wow fadeIn  bg1" data-wow-duration='3s'>
  <div className="container">
  <h2 className="txt-pr">
  Quienes Somos
  </h2>
    <div className="row">
      <div className="col">
        <p style={{textAlign:"justify"}}>
         {empresa.quienesSomos}
          </p>
      </div>
    </div>
  </div>
</section>

</main>
<Footer denominacion={empresa.denominacion} latitud={empresa.latitud} longitud={empresa.longitud} />
</>
):(<></>)}
    </>
  )
}
export default Home;