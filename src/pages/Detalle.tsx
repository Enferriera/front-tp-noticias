

const Detalle=()=> {
  const imagenPrincipalStyle = {
      height: '450px',
      backgroundImage: `url("http://localhost:82/template_html/images/page-1_slide1.jpg?1583775512626")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
  };
  const tituloNoticiaStyle = {
    textAlign: 'left',
    backgroundColor: 'rgba(1, 1, 1, 0.5)', 
    color: '#ffffff',
    fontSize: '16px',
    lineHeight: '50px',
  }
  return (
    <main>        

    <section className="well well4">
  
      <div className="container">
    <center>
      <div id="imagenPrincipal" style={imagenPrincipalStyle}>
        <div style={tituloNoticiaStyle}>
         Titulo de la Noticia                        
        </div>
      </div>
    </center>
    <h2>
          Titulo de la Noticia
        </h2>
    Fecha Publicacion: 12/02/2020
    <hr />
        <div className="row offs2">
          
          <div className="col-lg-12">
            <dl className="terms-list">
              <dt>
        Resumen de la noticia
              </dt>
      <hr />
              <dd>
        Contenido HTML de la Noticia
      </dd>
            </dl>
          </div>
        </div>
      </div>
    </section>   
    

  </main>
  
  )
}

export default Detalle;
