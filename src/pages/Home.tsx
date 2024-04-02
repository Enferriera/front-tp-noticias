
import { useEffect, useState } from "react";
import { Empresa } from "../types/Empresa";
import { Noticia } from "../types/Noticia";
import { useParams, useNavigate} from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Carousel } from "react-bootstrap";
import Loader from "../components/Loader/Loader";
import { EmpresaService } from "../utils/EmpresaService";
import { NoticiaService } from "../utils/NoticiaService";


const Home=()=> {
  const navigate=useNavigate();
  const {id}=useParams();
const [empresa,setEmpresa]=useState<Empresa>();
const [noticias,setNoticias]=useState<Noticia[]>([]);
const [isloading,setIsloading]=useState(true);

useEffect(()=>{
 const buscarEmpresaYNoticias=async()=>{
  const empresaHome=await EmpresaService.getOneEmpresa(Number(id));
  setEmpresa(empresaHome);
  console.log(empresaHome)
  const noticiasHome=await NoticiaService.getHomeNoticias(empresaHome.id)
  setNoticias(noticiasHome);
  setIsloading(false);
 }

    buscarEmpresaYNoticias();
   
  

},[])
  return (
<>
{isloading?(<Loader/>):(
  <>
   <Header idEmpresa={empresa.id} denominacion={empresa.denominacion} telefono={empresa.telefono} horaDeAtencion={empresa.horario_de_atencion} />
<main>        

<section className="well well1 well1_ins1">

<Carousel>
{noticias.map((noticia:Noticia)=>(
      <Carousel.Item key={noticia.id}>
    <div className="w-100 bg-dark h-100">
   
      <img src={noticia.imagen}/>
    </div>
      
        <Carousel.Caption onClick={()=>navigate(`/detalle/${noticia.id}`)} className="d-flex justify-content-center" >
          <div className="bg-primary w-50">
          <a className="text-black fw-b" onClick={()=>navigate(`/detalle/${noticia.id}`)}>{noticia.titulo}</a>
          <p className="text-black fw-b">{noticia.resumen}</p>
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
         {empresa.quienes_somos}
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