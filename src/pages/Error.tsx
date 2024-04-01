
import { useNavigate } from 'react-router-dom';
const Error=()=> {

  const navigate = useNavigate();

  
  return (
    <>
    <div className='d-flex justify-content- center align-items-start' style={{backgroundImage:"url('src/assets/image/error-404.jpg')",width:"100%",height:"100vh",backgroundPosition:"cover",backgroundRepeat:"no-repeat"}} >
     <button className="btn btn-primary mt-4 "onClick={()=>navigate(-1)}>Retroceder</button>
   </div>

    </>
  )
}
export default Error;
