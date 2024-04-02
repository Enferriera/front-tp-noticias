
import  { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { Empresa } from '../types/Empresa';

const validationSchema=Yup.object({
    denominacion:Yup.string().required('Ingrese una denominacion'),
    telefono:Yup.string().required('Ingrese un telefono'),
    horarioDeAtencion:Yup.string().required('Ingrese un horario'),
    quienesSomos:Yup.string().required('Ingrese una descripcion'),
    latitud:Yup.number().required('ingrese un valor de coordenada o en su defecto 0'),
    longitud:Yup.number().required('ingrese un valor de coordenada o en su defecto 0'),
    domicilio:Yup.string().required('Ingrese un domicilio'),
    email:Yup.string().email().required('Ingrese un Email valido'),
})


 const FormEmpresa=()=> {
    const location = useLocation();
    const [idEmpresa,setIdEmpresa]=useState<string>('');
    const [empresa,setEmpresa]=useState<Empresa>(null);
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const id:string = searchParams.get('id')!=null?searchParams.get('id'):'';
       setIdEmpresa(id);  
      }, [])

      const formik=useFormik({
        initialValues:{
            
            denominacion:empresa!=null?empresa.denominacion:'',
            telefono:empresa!=null?empresa.telefono:'',
            horarioDeAtencion:empresa!=null?empresa.horarioDeAtencion:'',
            quienesSomos:empresa!=null?empresa.quienesSomos:'',
            latitud:empresa!=null?empresa.latitud:0,
            longitud:empresa!=null?empresa.longitud:0,
            domicilio:empresa!=null?empresa.domicilio:'',
            email:empresa!=null?empresa.email:'',
        },
        validationSchema:validationSchema,
        onSubmit:(values)=>{
            //ACA VA UN FETCH PARA GUARDAR EMPRESA NUEVA O EDITADA
            console.log(values)
        
        }
      })
    
  return (
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
                  <label className="w-50 mb-3" htmlFor="horarioDeAtencion">
                    Horario de atencion:
                    <input className="w-50 text-primary" type="text" id="horarioDeAtencion" name="horarioDeAtencion" value={formik.values.horarioDeAtencion} onChange={formik.handleChange} />
                    {formik.touched.horarioDeAtencion && formik.errors.horarioDeAtencion ? (<div className="text-danger">{formik.errors.horarioDeAtencion}</div>) : null}

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

                  <label className="w-75 mb-3" htmlFor="quienesSomos">
                    Quienes Somos:
                    <textarea className="form-control" name="quienesSomos" value={formik.values.quienesSomos} onChange={formik.handleChange}   id="quienesSomos" style={{height:"100px"}}></textarea>
 
                    {formik.touched.quienesSomos && formik.errors.quienesSomos ? (<div className="text-danger">{formik.errors.quienesSomos}</div>) : null}

                  </label>
                 
                  <button  className="btn w-50 btn-primary btn-sm" type="submit">{idEmpresa != '' ? "Editar" : "Agregar"}</button>

                </form>

        </section>
    </main>
  )
}
export default FormEmpresa;
