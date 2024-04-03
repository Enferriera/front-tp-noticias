import { useEffect, useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Loader from '../components/Loader/Loader';
import { Empresa } from '../types/Empresa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Noticia } from '../types/Noticia';
import { NoticiaService } from '../utils/NoticiaService';
import { EmpresaService } from '../utils/EmpresaService';
import { EmpresaIndex } from '../types/EmpresaIndex';
import {format} from 'date-fns';

const validationSchema = Yup.object({

  titulo: Yup.string().required('Ingrese un titulo'),
  resumen: Yup.string().required('Ingrese un resumen'),
  imagen: Yup.string().url().required('Ingrese una url valida'),
  contenido_html: Yup.string().required("Ingrese una noticia"),
  fecha: Yup.string().required("Elija una fecha"),

})


const Tiny = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [idNoticia, setIdNoticia] = useState<string>('');
  const [empresa, setEmpresa] = useState<Empresa>(null);
  const [empresaSelect, setEmpresaSelect] = useState<EmpresaIndex>();
  const [noticia, setNoticia] = useState<Noticia>(null);
  const [isloading, setIsloading] = useState(true);
  const [contenido, setContenido] = useState<string>('');
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
      titulo: idNoticia != '' ? noticia?.titulo : '',
      resumen: idNoticia != '' ? noticia?.resumen : '',
      imagen: idNoticia != '' ? noticia?.imagen : '',
      contenido_html: idNoticia != '' ? noticia?.contenido_html : '',
      publicada: idNoticia != '' ? noticia?.publicada : '',
      fecha: idNoticia != '' ? noticia?.fecha :  format(new Date(), 'yyyy-MM-dd'),
      idEmpresa: idNoticia != '' ? noticia?.idEmpresa : ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      handleContentHTML();

      const noticiaLista: Noticia = {
        id: idNoticia != '' ? Number(idNoticia) : 0,
        titulo: values.titulo,
        resumen: values.resumen,
        imagen: values.imagen,
        contenido_html: values.contenido_html,
        publicada: values.publicada,
        fecha: values.fecha,
        idEmpresa: Number(values.idEmpresa)
      }

      noticiaLista.id == 0 ? await NoticiaService.createNoticia(noticiaLista) : await NoticiaService.updateNoticia(noticiaLista.id, noticiaLista);
      navigate('/');
    }
  })




  const handleEditorChange = (content, editor) => {

    formik.setFieldValue('contenido_html', content);

  };

  const handleContentHTML = () => {
    // console.log(formik.values)
    

  };

  useEffect(() => {

    const fetchEmpresas = async () => {
      const empresaIndex = await EmpresaService.getEmpresasIndex();
      const searchParams = new URLSearchParams(location.search);
      const id: string = searchParams.get('id') != null ? searchParams.get('id') : '';
      setIdNoticia(id);



      setEmpresaSelect(empresaIndex);
      id == '' && empresaIndex != null ? setIsloading(false) : null;
     


    }

    fetchEmpresas();
   

  }, [])

  useEffect(() => {

    const noticiaEditar = async () => {
      const noticiaEditar = await NoticiaService.getOneNoticia(idNoticia);
      setNoticia(noticiaEditar);

    }

    idNoticia != '' ? (noticiaEditar()) : null;

  }, [idNoticia])

  useEffect(() => {
    const empresaNoticia = async () => {
      const empresaNoti = await EmpresaService.getOneEmpresa(noticia?.idEmpresa);
      setEmpresa(empresaNoti)


    }
    noticia != null ? (
      empresaNoticia()) : null;
  }, [noticia])

  useEffect(() => {

    if (empresa != null) {
      formik.setValues({
        id: idNoticia != '' ? noticia?.id : null,
        titulo: idNoticia != '' ? noticia?.titulo : '',
        resumen: idNoticia != '' ? noticia?.resumen : '',
        imagen: idNoticia != '' ? noticia?.imagen : '',
        contenido_html: idNoticia != '' ? noticia?.contenido_html : '',
        publicada: idNoticia != '' ? noticia?.publicada : 'N',
        fecha: idNoticia != '' ? noticia?.fecha.split('T')[0] :  format(new Date(), 'yyyy-MM-dd'),
        idEmpresa: idNoticia != '' ? noticia?.idEmpresa : empresaSelect[0]?.id
      });

      setIsloading(false)
    }
  }, [empresa,empresaSelect])

  return (
    <>
      {isloading ? (<Loader />) : (
        <>
          {empresa != null ? (<Header idEmpresa={empresa.id} denominacion={empresa.denominacion} telefono={empresa.telefono} horaDeAtencion={empresa.horario_de_atencion} />) : (<></>)}
          <main>
            <section className='d-flex justify-content-center my-3'>
              <div className='w-75'>
                <form  onSubmit={(e)=>{
               e.preventDefault()
                handleContentHTML();
                console.log(formik.values);
                formik.handleSubmit()}} method={idNoticia!=''?'put':'post'}>
                  <label className="w-100 mb-3" htmlFor="titulo">
                    Titulo noticia:
                    <input className="w-75 text-primary" type="text" id="titulo" name="titulo" value={formik.values.titulo} onChange={formik.handleChange} />

                    {formik.touched.titulo && formik.errors.titulo ? (<div className="text-danger">{formik.errors.titulo}</div>) : null}

                  </label>

                  <label className="w-100 mb-3" htmlFor="resumen">
                    Resumen noticia:
                    <input className="w-75 text-primary" type="text" id="resumen" name="resumen" value={formik.values.resumen} onChange={formik.handleChange} />
                    {formik.touched.resumen && formik.errors.resumen ? (<div className="text-danger">{formik.errors.resumen}</div>) : null}

                  </label>
                  <label className="w-100 mb-3" htmlFor="imagen">
                    Imagen noticia:
                    <input className="w-75 text-primary" type="url" id="imagen" name="imagen" value={formik.values.imagen} onChange={formik.handleChange} />
                    {formik.touched.imagen && formik.errors.imagen ? (<div className="text-danger">{formik.errors.imagen}</div>) : null}

                  </label>
                  <label className="w-100 mb-3" htmlFor="fecha">
                    Fecha publicacion:
                    <input className="w-50 text-primary" type="date" id="fecha" name="fecha" value={formik.values.fecha} onChange={formik.handleChange} />
                    {formik.touched.fecha && formik.errors.fecha ? (<div className="text-danger">{formik.errors.fecha}</div>) : null}

                  </label>

                  <label className="w-100 mb-3" htmlFor="publicada">
                    Publicada:

                    <select className="w-25 text-primary" id='publicada' name="publicada" value={formik.values.publicada} onChange={formik.handleChange}>
                      <option>Elija una opcion</option>
                      <option value="S">S</option>
                      <option value="N">N</option>
                    </select>
                  </label>

                  <label className="w-100 mb-3" htmlFor="idEmpresa">
                    Empresa:
                    <select className="w-50 text-primary" id='idEmpresa' name="idEmpresa" value={formik.values.idEmpresa} onChange={formik.handleChange} >
                     <option>Elija una empresa</option>
                      {empresaSelect!=null?(
                        empresaSelect.map(empresaInd => (
                        <>
                          <option key={empresaInd.id} value={empresaInd.id}>{empresaInd.denominacion}</option>
                        </>
                      ))):(<></>)}

                    </select>
                  </label>
                  <Editor
                    apiKey="ypxoh9xdlqcje7t1acradvy3x44k8kmvj1v1892jbct36xwa"
                    initialValue={idNoticia != '' ? formik.values.contenido_html : "<p>Escriba aqui</p>"}
                    init={{
                      height: 500,
                      menubar: true,
                      plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                      ],
                      toolbar:
                        'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                    onEditorChange={handleEditorChange}
                  />
                 
                  <button type="submit"  className={idNoticia != '' ? "mt-3 btn w-50 btn-warning btn-sm" : "mt-3 btn w-50 btn-success text-black btn-sm"}>{idNoticia != '' ? "Editar" : "Agregar"}</button>

                </form>


              </div>
            </section>
          </main>
          {empresa != null ? (<Footer denominacion={empresa.denominacion} />) : (<></>)}

        </>
      )}
    </>
  )
}

export default Tiny;