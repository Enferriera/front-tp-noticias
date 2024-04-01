import { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Loader from '../components/Loader/Loader';
import { Empresa } from '../types/Empresa';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Noticia } from '../types/Noticia';

const validationSchema = Yup.object({

  tituloNoticia: Yup.string().required('Ingrese un titulo'),
  resumenNoticia: Yup.string().required('Ingrese un resumen'),
  imagenNoticia: Yup.string().url().required('Ingrese una url valida'),
  contenidoHTML: Yup.string().required("Ingrese una noticia"),
  fechaPublicacion: Yup.date().required("Elija una fecha"),

})


const Tiny = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [empresa, setEmpresa] = useState<Empresa>();
  const[noticia,setNoticia]=useState<Noticia>();
  const [isloading, setIsloading] = useState(true);
  const editorRef = useRef(null);
  const log = () => {
    alert("Hola")
    console.log(editorRef.current)
    if (editorRef.current) {
      console.log(editorRef.current);
    }
  };

  const formik = useFormik({
    initialValues: {
      id: null,
      tituloNoticia: id!=null?noticia?.tituloNoticia:'',
      resumenNoticia:id!=null?noticia?.resumenNoticia: '',
      imagenNoticia: id!=null?noticia?.imagenNoticia:'',
      contenidoHTML: id!=null?noticia?.contenidoHTML:'',
      publicada:id!=null?noticia?.publicada:'',
      fechaPublicacion:id!=null?noticia?.fechaPublicacion:''
      
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      navigate(`/buscador`)
    }
  })

  useEffect(() => {

    const empresaMano: Empresa = {
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




    setEmpresa(empresaMano);

    setIsloading(false);


  }, [])
  return (
    <>
      {isloading ? (<Loader />) : (
        <>
          <Header idEmpresa={empresa.id} denominacion={empresa.denominacion} telefono={empresa.telefono} horaDeAtencion={empresa.horarioDeAtencion} />
          <main>
            <section className='d-flex justify-content-center my-3'>
              <div className='w-75'>
                <form onSubmit={formik.handleSubmit} >
                  <label className="w-100 mb-3" htmlFor="tituloNoticia">
                    Titulo noticia:
                    <input className="w-75 text-primary" type="text" id="tituloNoticia" name="tituloNoticia" value={formik.values.tituloNoticia} onChange={formik.handleChange} />

                    {formik.touched.tituloNoticia && formik.errors.tituloNoticia ? (<div className="text-danger">{formik.errors.tituloNoticia}</div>) : null}

                  </label>

                  <label className="w-100 mb-3" htmlFor="resumenNoticia">
                    Resumen noticia:
                    <input className="w-75 text-primary" type="text" id="resumenNoticia" name="resumenNoticia" value={formik.values.resumenNoticia} onChange={formik.handleChange} />
                    {formik.touched.resumenNoticia && formik.errors.resumenNoticia ? (<div className="text-danger">{formik.errors.resumenNoticia}</div>) : null}

                  </label>
                  <label className="w-100 mb-3" htmlFor="imagenNoticia">
                    Imagen noticia:
                    <input className="w-75 text-primary" type="url" id="imagenNoticia" name="imagenNoticia" value={formik.values.imagenNoticia} onChange={formik.handleChange} />
                    {formik.touched.imagenNoticia && formik.errors.imagenNoticia ? (<div className="text-danger">{formik.errors.imagenNoticia}</div>) : null}

                  </label>
                  <label className="w-100 mb-3" htmlFor="fechaPublicacion">
                    Fecha publicacion:
                    <input className="w-50 text-primary" type="date" id="fechaPublicacion" name="fechaPublicacion" value={formik.values.fechaPublicacion} onChange={formik.handleChange} />
                    {formik.touched.fechaPublicacion && formik.errors.fechaPublicacion ? (<div className="text-danger">{formik.errors.fechaPublicacion}</div>) : null}

                  </label>

                  <label className="w-100 mb-3" htmlFor="publicada">
                    Publicada:

                    <select className="w-25 text-primary" id='publicada' name="publicidad" value={formik.values.publicada} onChange={formik.handleChange}>
                      <option value="Y">Y</option>
                      <option value="N">N</option>
                    </select>
                  </label>

                  <label className="w-100 mb-3" htmlFor="empresa">
                    Empresa:
                    <select className="w-50 text-primary" id='empresa' name="empresa" onChange={formik.handleChange} >
                      <option value="Y">Y</option>
                      <option value="N">N</option>
                    </select>
                  </label>
                  <Editor
                    apiKey='ypxoh9xdlqcje7t1acradvy3x44k8kmvj1v1892jbct36xwa'
                    init={{
                      plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                      toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                      tinycomments_mode: 'embedded',
                      tinycomments_author: 'Author name',
                      mergetags_list: [
                        { value: 'First.Name', title: 'First Name' },
                        { value: 'Email', title: 'Email' },
                      ],
                      ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                    }}
                    initialValue={id != null ? formik.values.contenidoHTML : "Welcome to TinyMCE!"}
                  />
                  <button onClick={() => log}>Enviar</button>
                  <button className="btn btn-primary btn-sm" type="submit">{id != null ? "Editar" : "Agregar"}</button>

                </form>


              </div>
            </section>
          </main>
          <Footer denominacion={empresa.denominacion} />
        </>
      )}
    </>
  )
}

export default Tiny;
