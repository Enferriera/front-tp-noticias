import Spinner from 'react-bootstrap/Spinner';
import './loader.css'


const Loader=()=> {
    return (
      <div className='loader'>
        <Spinner animation="border" variant="info" className='spinner-loader' />
        </div>
    )
  }
  
  export default Loader;
