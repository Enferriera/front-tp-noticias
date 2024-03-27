import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Empresa } from '../types/Empresa';
import { EmpresaService } from '../utils/EmpresaService';

 const IndexPage= ()=> {

  const [empresas,setEmpresas]=useState<Empresa[]>([]);
  const [isloading,setIsloading]=useState(true);

  useEffect(()=>{

    const fetchEmpresas= async()=>{
      const empresa=await fetch('../utils/ejemplo.json');
      const data=empresa.json();
     
      console.log(data);
      // setEmpresas(data);
      // setIsloading(false);
      
    }

    fetchEmpresas();
  
  },[])
  return (
    
    <Table striped bordered hover>
    <thead>
      <tr>
        
        <th>EMPRESA</th>
        <th>VER PAGINA</th>
       
      </tr>
    </thead>
    <tbody>

      <tr>
        <td>1</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
     
    </tbody>
  </Table>
  )
}

export default IndexPage;
