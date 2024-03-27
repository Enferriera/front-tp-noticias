import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Empresa } from '../types/Empresa';
import { EmpresaService } from '../utils/EmpresaService';
import { useNavigate } from 'react-router-dom';

 const IndexPage= ()=> {

  const navigate=useNavigate();
  const [empresas,setEmpresas]=useState<Empresa[]>([]);
  const [isloading,setIsloading]=useState(true);

  useEffect(()=>{

    const fetchEmpresas= async()=>{
      //const empresa=await EmpresaService.getAllEmpresas() ;
      const empresa=await fetch('src/utils/ejemplo.json');
      const data= await empresa.json();
    setEmpresas(data);
    setIsloading(false);
      
    }

    fetchEmpresas();
  
  },[])
  return (
    <div className='w-100 d-flex justify-content-center'>
    <Table className='w-75 mt-5' striped bordered hover>
    <thead>
      <tr>
        
        <th>EMPRESA</th>
        <th>VER PAGINA</th>
       
      </tr>
    </thead>
    <tbody>
{!isloading && empresas?(
  empresas.map((empresa:Empresa)=>(

    <tr key={empresa.id}>
    <td>{empresa.denominacion}</td>
    <td onClick={()=>navigate(`/home/${empresa.id}`)}>{`/home/${empresa.id}`}</td>
   
  </tr>
  ))
):(<></>)}
     
     
    </tbody>
  </Table>
  </div>
  )
}

export default IndexPage;
