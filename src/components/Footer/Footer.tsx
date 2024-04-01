

type FooterProps={
  denominacion:string,
  latitud:number,
  longitud:number,

}
const Footer= ({denominacion,longitud=0,latitud=0}:FooterProps)=> {
  return (
    <footer>
       {longitud*latitud!=0?( 
        <>
        {console.log(latitud)}
        <section className="well well2 wow fadeIn  bg1" data-wow-duration='3s'>
        <div className="container">
        <h2 className="txt-pr">
        Donde estamos
        </h2>
        </div>
    </section>
	<div className="map">
    
    <iframe src={"https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11270.125646913215!2d"+longitud+"!3d"+latitud+"!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sar!4v1615335513448!5m2!1ses-419!2sar"} width="1600" height="400" style={{border:"0"}}  loading="lazy"></iframe>
    </div>
    </>
):(<></>)}
    <section className="well1">
      <div className="container"> 
            <p className="rights">
              {denominacion}  &#169; <span id="copyright-year"></span>
              <a href="index-5.html">Privacy Policy</a>
             
            </p>          
      </div> 
    </section>    
    </footer>
  )
}

export default Footer;
