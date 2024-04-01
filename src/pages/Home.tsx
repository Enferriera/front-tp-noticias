
import { useEffect, useState } from "react";
import { Empresa } from "../types/Empresa";
import { Noticia } from "../types/Noticia";
import { useParams, useNavigate} from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Carousel } from "react-bootstrap";
import Loader from "../components/Loader/Loader";


const Home=()=> {
  const navigate=useNavigate();
  const {id}=useParams();
const [empresa,setEmpresa]=useState<Empresa>();
const [isloading,setIsloading]=useState(true);

useEffect(()=>{

  const empresaMano:Empresa[]=[
    {
      id: 1,
      denominacion: "Tecnologías Innovar",
      telefono: "+54 11 2345-6789",
      horarioDeAtencion: "Lunes a Viernes de 8 a 17 hs",
      quienesSomos: "Somos líderes en soluciones tecnológicas innovadoras.",
      latitud: -32.89090600081773, 
      longitud: -68.83632831023758,
      domicilio: "Av. Siempre Viva 742, Buenos Aires",
      email: "info@innovartech.com",
      listaNoticias: [
        {
          id: 1,
          tituloNoticia: "Innovación en IA",
          resumenNoticia: "Presentamos nuestro nuevo asistente de IA.",
          imagenNoticia: "/src/assets/image/page-1_slide1.jpg",
          contenidoHTML: "<p>Descubre cómo nuestra IA puede cambiar tu vida.</p>",
          publicada: "Sí",
          fechaPublicacion: "2024-03-16"
        },
        {
          id: 2,
          tituloNoticia: "Expansión Global",
          resumenNoticia: "Anunciamos la apertura de nuevas oficinas internacionales.",
          imagenNoticia: "/src/assets/image/page-1_slide2.jpg",
          contenidoHTML: "<p>Conoce nuestras nuevas ubicaciones alrededor del mundo.</p>",
          publicada: "Sí",
          fechaPublicacion: "2024-03-17"
        },
        {
          id: 3,
          tituloNoticia: "Evento de Tecnología",
          resumenNoticia: "Participaremos en el principal evento de tecnología del año.",
          imagenNoticia: "/src/assets/image/page-1_slide3.jpg",
          contenidoHTML: "<p>Únete a nosotros en este evento inolvidable.</p>",
          publicada: "Sí",
          fechaPublicacion: "2024-03-18"
        },
        {
          id: 4,
          tituloNoticia: "Premio a la Innovación",
          resumenNoticia: "Hemos sido galardonados con el premio a la innovación tecnológica.",
          imagenNoticia: "/src/assets/image/page-1_slide2.jpg",
          contenidoHTML: "<p>Estamos orgullosos de recibir este reconocimiento.</p>",
          publicada: "Sí",
          fechaPublicacion: "2024-03-19"
        },
        {
          id: 5,
          tituloNoticia: "Nueva Línea de Productos",
          resumenNoticia: "Lanzamos una nueva línea de productos eco-amigables.",
          imagenNoticia: "/src/assets/image/page-1_slide1.jpg",
          contenidoHTML: "<p>Explora nuestra nueva gama de productos sostenibles.</p>",
          publicada: "Sí",
          fechaPublicacion: "2024-03-20"
        }
      ]
    },
    {
        id: 2,
        denominacion: "Empresa 1",
        telefono: "123456789",
        horarioDeAtencion: "9:00 - 18:00",
        quienesSomos: "Somos una empresa dedicada a...",
        latitud: 40.7128,
        longitud: -74.006,
        domicilio: "123 Calle Principal",
        email: "info@empresa1.com",
        listaNoticias: [
          {
            id: 6,
            tituloNoticia: "Noticia 1",
            resumenNoticia: "Resumen de la Noticia 1",
            imagenNoticia: "/src/assets/image/page-1_slide3.jpg",
            contenidoHTML: "<p>Contenido HTML de la Noticia 1</p>",
            publicada: "Sí",
            fechaPublicacion: "2024-03-27"
          },
          {
            id: 7,
            tituloNoticia: "Noticia 2",
            resumenNoticia: "Resumen de la Noticia 2",
            imagenNoticia: "/src/assets/image/page-1_slide2.jpg",
            contenidoHTML: "<p>Contenido HTML de la Noticia 2</p>",
            publicada: "Sí",
            fechaPublicacion: "2024-03-26"
          },
          {
            id: 8,
            tituloNoticia: "Noticia 3",
            resumenNoticia: "Resumen de la Noticia 3",
            imagenNoticia: "/src/assets/image/page-1_slide3.jpg",
            contenidoHTML: "<p>Contenido HTML de la Noticia 3</p>",
            publicada: "Sí",
            fechaPublicacion: "2024-03-25"
          },
          {
            id: 9,
            tituloNoticia: "Noticia 4",
            resumenNoticia: "Resumen de la Noticia 4",
            imagenNoticia: "/src/assets/image/page-1_slide1.jpg",
            contenidoHTML: "<p>Contenido HTML de la Noticia 4</p>",
            publicada: "Sí",
            fechaPublicacion: "2024-03-24"
          },
          {
            id: 10,
            tituloNoticia: "Noticia 5",
            resumenNoticia: "Resumen de la Noticia 5",
            imagenNoticia: "/src/assets/image/page-1_slide2.jpg",
            contenidoHTML: "<p>Contenido HTML de la Noticia 5</p>",
            publicada: "Sí",
            fechaPublicacion: "2024-03-23"
          }
        ]
      }
  ];


  const empresaEncontrada:Empresa=empresaMano.find((empresa:Empresa):boolean=>empresa.id==Number(id));
 
    console.log(empresaEncontrada);

    setEmpresa(empresaEncontrada);
    setIsloading(false);
  

},[])
  return (
<>
{isloading?(<Loader/>):(
  <>
   <Header idEmpresa={empresa.id} denominacion={empresa.denominacion} telefono={empresa.telefono} horaDeAtencion={empresa.horarioDeAtencion} />
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
)}
    </>
  )
}
export default Home;