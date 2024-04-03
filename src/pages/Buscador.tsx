import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Empresa } from "../types/Empresa";
import { Noticia } from "../types/Noticia";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Loader from "../components/Loader/Loader";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";
import EliminarModal from "../components/EliminarModal/EliminarModal";
import { EmpresaService } from "../utils/EmpresaService";
import { NoticiaService } from "../utils/NoticiaService";

const Buscador = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [empresa, setEmpresa] = useState<Empresa>();
  const [isloading, setIsloading] = useState(true);
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [buscar, setBuscar] = useState<string>('');
  const [idEmpresa, setIdEmpresa] = useState<number>(0);
  const [tituloEliminar, setTituloEliminar] = useState<string>('');
  const [idNoticiaEliminar, setIdNoticiaEliminar] = useState<number>(0);
  const [modalShow, setModalShow] = useState(false);

  const handleEliminar = (id: number, titulo: string) => {

    console.log(id);
    console.log(titulo);
    console.log(true);
    setIdNoticiaEliminar(id);
    setTituloEliminar(titulo);
    setModalShow(true);

  }

  const handleEliminarNoticia=async()=>{
   const response= await NoticiaService.deleteNoticia(idNoticiaEliminar);
    
    setModalShow(false);
   return response;
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const palabraBuscar = searchParams.get('palabras');
    const empresaId = searchParams.get('id');

    setBuscar(palabraBuscar);
    setIdEmpresa(Number(empresaId));

    const getEmpresa = async () => {
      const empresaBuscar = await EmpresaService.getOneEmpresa(Number(empresaId));
      setEmpresa(empresaBuscar);
      const listaNoticia=  palabraBuscar == "" ? empresaBuscar.noticias : await NoticiaService.getNoticiasSearchByPalabra(empresaId, palabraBuscar)
       setNoticias(listaNoticia);

      setIsloading(false);
    }


    getEmpresa();


  }, [location.search])

  return (
    <>
      {isloading ? (<Loader />) : (
        <>
          <Header palabraBuscar={buscar} idEmpresa={empresa.id} denominacion={empresa.denominacion} telefono={empresa.telefono} horaDeAtencion={empresa.horario_de_atencion} />

          <main>

            <section className="well well4">
              <div className="w-100 d-flex justify-content-center">
                <button className="btn btn-success " onClick={()=>navigate('/tiny')}>Nueva Noticia</button>
              </div>
              <div className="container">

                <h2>
                  Texto Buscado
                </h2>
                <div className="row offs2">

                  <table className="table" width="90%" align="center">
                    <tbody >
                      {noticias.map(noticia => (
                        <tr key={noticia.id}>
                          <td>
                            <a onClick={() => navigate(`/detalle/${noticia.id}`)}>
                              <img width="250px" className="imgNoticia" src={noticia.imagen} alt={noticia.titulo} />
                            </a>
                          </td>
                          <td width="25"></td>
                          <td style={{ textAlign: 'justify' }} valign="top">
                            <a style={{ textAlign: 'justify', fontSize: '20px' }} onClick={() => navigate(`/detalle/${noticia.id}`)} className="banner">
                              {noticia.titulo}								</a>
                            <div className="verOcultar">
                              {noticia.resumen}<a onClick={() => navigate(`/detalle/${noticia.id}`)} style={{ color: 'blue' }}> Leer Mas - 2020-02-14</a>
                            </div>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button className="btn btn-warning btn-sm text-black" onClick={() => navigate(`/tiny?id=${noticia.id}`)} >Eitar Noticia</button>
                              <button onClick={() => handleEliminar(noticia.id, noticia.titulo)} className="btn btn-danger btn-sm text-black" >Eliminar Noticia</button>
                            </div>
                          </td>
                        </tr>
                      ))}

                    </tbody>
                  </table>
                  <hr />
                </div>
              </div>
            </section>


            <div className={modalShow?"d-flex flex-column justify-content-between align-items-center rounded bg-dark ":"d-none flex-column justify-content-between align-items-center rounded bg-dark "} style={{width:'700px',height:'300px',position:'absolute',top:'50%',left:'50%',transform: 'translate(-50%, -50%)',zIndex:'1000',margin:'auto'}}>
                       <div className="mt-4 text-white text-center"><h6>Esta seguro que quiere eliminar la noticia</h6>
                       <h6>{tituloEliminar}</h6></div> 
                        <div className="d-flex gap-3 mb-3 mx-4">
                          <button className="btn btn-success text-black" onClick={()=>setModalShow(false)}>Cancelar</button>
                          <button className="btn btn-danger text-black" onClick={()=>handleEliminarNoticia()}>Eliminar</button>
                        </div>
            </div>

           
          </main>
          <Footer denominacion={empresa.denominacion} />
        </>
      )}
    </>)
}

export default Buscador;
