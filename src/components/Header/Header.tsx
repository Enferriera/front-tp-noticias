import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const validationSchema=Yup.object({
  buscar:Yup.string()
})

type HeaderProps={
  idEmpresa:number,
  denominacion:string,
  telefono:string,
  horaDeAtencion:string,
  palabraBuscar:string

}


const Header = ({idEmpresa,denominacion,telefono,horaDeAtencion, palabraBuscar=''}:HeaderProps) => {
  const formik=useFormik({
    initialValues:{
      buscar:palabraBuscar
    },
    validationSchema:validationSchema,
    onSubmit:(values)=>{
     navigate(`/buscador?buscar=${values.buscar}&empresaId=${idEmpresa}`)
    }
  })
  const navigate=useNavigate();
    return (
       
        <header>  
        <div className="container top-sect">
          <div className="navbar-header">
            <h1 className="navbar-brand w-25">
              <a data-type='rd-navbar-brand text-wrap'  onClick={()=>navigate("/")}><small>{denominacion}</small></a>
            </h1>
            <a className="search-form_toggle" href="#"></a>
          </div>
  
          <div className="help-box text-right">
            <p>Telefono</p>
            <a href="callto:#">{telefono}</a>
            <small><span>Horario:</span>{horaDeAtencion}</small>
          </div>
        </div>
       
        <div id="stuck_container" className="stuck_container">
          <div className="container">   
              <nav className="navbar navbar-default navbar-static-top pull-left">            
                  <div className="">  
                    <ul className="nav navbar-nav sf-menu sf-js-enabled sf-arrows d-flex flex-row" data-type="navbar">
                      <li style={{listStyle: "none"}} className="active">
                        <a onClick={()=>navigate("/home")}>INICIO</a>
                      </li>
                      <li style={{listStyle: "none"}}>
                        <a onClick={()=>navigate("/")}>LISTA EMPRESAS</a>
                      </li>
                    </ul>                           
                  </div>
              </nav>
              <form className="search-form" onSubmit={formik.handleSubmit} method="GET" >
                <label className="search-form_label" htmlFor="buscar">
                  <input className="search-form_input" type="text" id="buscar" name="buscar" value={formik.values.buscar} onChange={formik.handleChange}  placeholder="Ingrese Texto"/>
                  {formik.touched.buscar && formik.errors.buscar?(<div className="text-danger">{formik.errors.buscar}</div>):null}
                  <span className="search-form_liveout"></span>
                </label>
                <button className="search-form_submit fa-search" type="submit"></button>
              </form>
               
          </div>
  
        </div>  
  
      </header>
           
           
    )
}

export default Header;
