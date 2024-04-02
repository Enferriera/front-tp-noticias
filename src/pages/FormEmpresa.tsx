
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Empresa } from '../types/Empresa';
import { EmpresaService } from '../utils/EmpresaService';
import Loader from '../components/Loader/Loader';

const validationSchema = Yup.object({
  denominacion: Yup.string().required('Ingrese una denominacion'),
  telefono: Yup.string().required('Ingrese un telefono'),
  horario_de_atencion: Yup.string().required('Ingrese un horario'),
  quienes_somos: Yup.string().required('Ingrese una descripcion'),
  latitud: Yup.number().required('ingrese un valor de coordenada o en su defecto 0'),
  longitud: Yup.number().required('ingrese un valor de coordenada o en su defecto 0'),
  domicilio: Yup.string().required('Ingrese un domicilio'),
  email: Yup.string().email().required('Ingrese un Email valido'),
})


const FormEmpresa = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [idEmpresa, setIdEmpresa] = useState<string>('');
  const [empresa, setEmpresa] = useState<Empresa>(null);
  const [isloading, setIsloading] = useState(true);

  const formik = useFormik({
    initialValues: {

      denominacion: empresa != null ? empresa.denominacion : '',
      telefono: empresa != null ? empresa.telefono : '',
      horario_de_atencion: empresa != null ? empresa.horario_de_atencion : '',
      quienes_somos: empresa != null ? empresa.quienes_somos : '',
      latitud: empresa != null ? empresa.latitud : 0,
      longitud: empresa != null ? empresa.longitud : 0,
      domicilio: empresa != null ? empresa.domicilio : '',
      email: empresa != null ? empresa.email : '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {

      const empresaLista: Empresa = {
        id: idEmpresa != '' ? Number(idEmpresa) : 0,
        denominacion: values.denominacion,
        telefono: values.telefono,
        horario_de_atencion: values.horario_de_atencion,
        quienes_somos: values.quienes_somos,
        latitud: values.latitud,
        longitud: values.longitud,
        domicilio: values.domicilio,
        email: values.email,
        noticias: []
      }


       empresaLista.id == 0 ? await EmpresaService.createEmpresa(empresaLista) :await  EmpresaService.updateEmpresa(empresaLista.id, empresaLista);

      navigate('/');

    }
  })
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id: string = searchParams.get('id') != null ? searchParams.get('id') : '';
    setIdEmpresa(id);
    id == '' ? setIsloading(false) : null;
  }, [])

  useEffect(() => {
    const fetchEmpresa = async (idConsulta) => {
      console.log(idEmpresa);
      const empresaGet = await EmpresaService.getOneEmpresa(Number(idConsulta));

      setEmpresa(empresaGet);
      formik.setValues({
        denominacion: empresaGet.denominacion,
        telefono: empresaGet.telefono,
        horario_de_atencion: empresaGet.horario_de_atencion,
        quienes_somos: empresaGet.quienes_somos,
        latitud: empresaGet.latitud,
        longitud: empresaGet.longitud,
        domicilio: empresaGet.domicilio,
        email: empresaGet.email,
      });
      setIsloading(false);
      console.log(empresaGet);

    }
    idEmpresa != '' ? fetchEmpresa(idEmpresa) : null;
  }, [idEmpresa])





  return (
    <>
      {isloading ? (<Loader />) : (
        <>
          <main >
            <section className='w-100 my-5 d-flex justify-content-center align-items-centers'>
              <form onSubmit={formik.handleSubmit} className='d-flex flex-column w-75' >
                <label className="w-50 mb-3" htmlFor="denominacion">
                  Denominacion:
                  <input className="w-75 text-primary" type="text" id="denominacion" name="denominacion" value={formik.values.denominacion} onChange={formik.handleChange} />

                  {formik.touched.denominacion && formik.errors.denominacion ? (<div className="text-danger">{formik.errors.denominacion}</div>) : null}

                </label>

                <label className="w-50 mb-3" htmlFor="domicilio">
                  Domicilio:
                  <input className="w-75 text-primary" type="text" id="domicilio" name="domicilio" value={formik.values.domicilio} onChange={formik.handleChange} />
                  {formik.touched.domicilio && formik.errors.domicilio ? (<div className="text-danger">{formik.errors.domicilio}</div>) : null}

                </label>
                <label className="w-50 mb-3" htmlFor="email">
                  Email :
                  <input className="w-50 text-primary" type="email" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} />
                  {formik.touched.email && formik.errors.email ? (<div className="text-danger">{formik.errors.email}</div>) : null}

                </label>
                <label className="w-50 mb-3" htmlFor="horario_de_atencion">
                  Horario de atencion:
                  <input className="w-50 text-primary" type="text" id="horario_de_atencion" name="horario_de_atencion" value={formik.values.horario_de_atencion} onChange={formik.handleChange} />
                  {formik.touched.horario_de_atencion && formik.errors.horario_de_atencion ? (<div className="text-danger">{formik.errors.horario_de_atencion}</div>) : null}

                </label>

                <label className="w-50 mb-3" htmlFor="telefono">
                  Telefono:
                  <input className="w-50 text-primary" type="text" id="telefono" name="telefono" value={formik.values.telefono} onChange={formik.handleChange} />
                  {formik.touched.telefono && formik.errors.telefono ? (<div className="text-danger">{formik.errors.telefono}</div>) : null}

                </label>

                <label className="w-50 mb-3" htmlFor="latitud">
                  Latitud:
                  <input className="w-50 text-primary" type="number" id="latitud" name="latitud" value={formik.values.latitud} onChange={formik.handleChange} />
                  {formik.touched.latitud && formik.errors.latitud ? (<div className="text-danger">{formik.errors.latitud}</div>) : null}

                </label>

                <label className="w-50 mb-3" htmlFor="longitud">
                  Longitud:
                  <input className="w-50 text-primary" type="number" id="longitud" name="longitud" value={formik.values.longitud} onChange={formik.handleChange} />
                  {formik.touched.longitud && formik.errors.longitud ? (<div className="text-danger">{formik.errors.longitud}</div>) : null}

                </label>

                <label className="w-75 mb-3" htmlFor="quienes_somos">
                  Quienes Somos:
                  <textarea className="form-control" name="quienes_somos" value={formik.values.quienes_somos} onChange={formik.handleChange} id="quienes_somos" style={{ height: "100px" }}></textarea>

                  {formik.touched.quienes_somos && formik.errors.quienes_somos ? (<div className="text-danger">{formik.errors.quienes_somos}</div>) : null}

                </label>

                <button className={idEmpresa != '' ? "btn w-50 btn-warning btn-sm" : "btn w-50 btn-success text-black btn-sm"} type="submit">{idEmpresa != '' ? "Editar" : "Agregar"}</button>

              </form>

            </section>
          </main>
        </>)}
    </>
  )
}
export default FormEmpresa;
