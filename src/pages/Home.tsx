


const Home=()=> {
  return (
<>
<main>        

<section className="well well1 well1_ins1">
  <div className="camera_container">
    <div id="camera" className="camera_wrap">
      <div data-src="images/page-1_slide1.jpg">
        <div className="camera_caption fadeIn">
          <div className="jumbotron jumbotron1">
            <em>
              <a href="detalle.html">Titulo Noticia</a>
            </em>
            <div className="wrap">
              <p>
                Resumen
              </p>
              <a href="detalle.html" className="btn-link fa-angle-right"></a>
            </div>  
          </div>
        </div>
      </div>
      <div data-src="images/page-1_slide2.jpg">
        <div className="camera_caption fadeIn">
          <div className="jumbotron jumbotron2">
            <em>
              Titulo Noticia
            </em>
            <div className="wrap">
              <p>
                Resumen
              </p>
              <a href="#" className="btn-link hov_prime fa-angle-right"></a>
            </div>  
          </div>
        </div>
      </div>
      <div data-src="images/page-1_slide3.jpg">
        <div className="camera_caption fadeIn">
          <div className="jumbotron">
            <em>
              Titulo Noticia
            </em>
            <div className="wrap">
              <p>
                Resumen
              </p>
              <a href="#" className="btn-link fa-angle-right"></a>
            </div>  
          </div>
        </div>
      </div>
    </div>
  </div>

</section>

<section className="well well2 wow fadeIn  bg1" data-wow-duration='3s'>
  <div className="container">
  <h2 className="txt-pr">
  Quienes Somos
  </h2>
    <div className="row">
      <div className="col">
        <p style={{textAlign:"justify"}}>
          Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt. Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  </div>
</section>

</main>

    </>
  )
}
export default Home;