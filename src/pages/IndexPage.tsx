import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { EmpresaIndex } from '../types/EmpresaIndex';
import { EmpresaService } from '../utils/EmpresaService';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

 const IndexPage= ()=> {

  const navigate=useNavigate();
  const [empresas,setEmpresas]=useState<EmpresaIndex[]>([]);
  const [isloading,setIsloading]=useState(true);

  useEffect(()=>{

    const fetchEmpresas= async()=>{
      const empresa=await EmpresaService.getEmpresasIndex() ;
     
    setEmpresas(empresa);
    setIsloading(false);
    console.log(empresa);
      
    }

    fetchEmpresas();
  
  },[])
  return (
    <>
    <div className='d-flex justify-content-center mt-4'><button className='btn  btn-success btn-sm text-black' onClick={()=>navigate('/empresaform/')}>Nueva Empresa</button></div>
    <div className='w-100 d-flex justify-content-center'>
    <Table className='w-75 mt-5' striped bordered hover>
    <thead>
      <tr>
        
        <th>EMPRESA</th>
        <th>VER PAGINA</th>
       
      </tr>
    </thead>
    <tbody>
{isloading?(<Loader/>):(
  empresas.map((empresa:EmpresaIndex)=>(

    <tr key={empresa.id}>
    <td>{empresa.denominacion}</td>
    <td onClick={()=>navigate(`/home/${empresa.id}`)}>{`/home/${empresa.id}`}</td>
   
  </tr>
  ))
)}
     
     
    </tbody>
  </Table>
  </div>
  </>
  )
}

export default IndexPage;
