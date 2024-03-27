
const Buscador=()=> {
  return (
    <>
      <main>

        <section className="well well4">

          <div className="container">

            <h2>
              Texto Buscado
            </h2>
            <div className="row offs2">

              <table width="90%" align="center">
                <tbody>
                  <tr>
                    <td>
                      <a href="detalle.html">
                        <img width="250px" className="imgNoticia" src="http://localhost:82/template_html/images/page-1_slide1.jpg?1583775512626" alt="" />
                      </a>
                    </td>
                    <td width="25"></td>
                    <td style={{textAlign:'justify'}} valign="top">
                      <a style={{textAlign:'justify', fontSize:'20px'}} href="detalle.html" className="banner">
                        Titulo									</a>
                      <div className="verOcultar">
                        Resumen de la Noticia<a href="detalle.html" style={{color:'blue'}}> Leer Mas - 2020-02-14</a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr />
            </div>
          </div>
        </section>


      </main>
    </>
  )
}

export default Buscador;
