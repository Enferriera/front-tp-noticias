import { useNavigate } from "react-router-dom";

type HeaderProps={
  denominacion:string,
  telefono:string,
  horaDeAtencion:string,

}


const Header = ({denominacion,telefono,horaDeAtencion}:HeaderProps) => {
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
              <form className="search-form" action="buscador.html" method="GET" >
                <label className="search-form_label">
                  <input className="search-form_input" type="text" name="buscar"  placeholder="Ingrese Texto"/>
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
