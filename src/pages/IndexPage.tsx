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
  const [modalShow, setModalShow] = useState(false);
  const [empresaEliminar,setEmpresaEliminar]=useState<EmpresaIndex>();

  const handleEliminar=(id:number,denominacion:string)=>{
    setEmpresaEliminar({id,denominacion});
    setModalShow(true);
  }

  const handleEliminarEmpresa=async()=>{
    const response= await EmpresaService.deleteEmpresa(empresaEliminar.id);
     
     setModalShow(false);
    return response;
   }
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
       <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
{isloading?(<Loader/>):(
  empresas.map((empresa:EmpresaIndex)=>(

    <tr key={empresa.id}>
    <td>{empresa.denominacion}</td>
    <td onClick={()=>navigate(`/home/${empresa.id}`)}>{`/home/${empresa.id}`}</td>
   <td><div className='d-flex gap-2'><button className='btn btn-warning text-black ' onClick={()=>navigate(`/empresaform?id=${empresa.id}`)}>Editar</button><button className='btn btn-danger text-black ' onClick={()=>handleEliminar(empresa.id,empresa.denominacion)}>Eliminar</button></div></td>
  </tr>
  ))
)}
 
     
    </tbody>
  </Table>
  <div className={modalShow?"d-flex flex-column justify-content-between align-items-center rounded bg-dark ":"d-none flex-column justify-content-between align-items-center rounded bg-dark "} style={{width:'700px',height:'300px',position:'absolute',top:'50%',left:'50%',transform: 'translate(-50%, -50%)',zIndex:'1000',margin:'auto'}}>
                       <div className="mt-4 text-white text-center"><h6>Esta seguro que quiere eliminar la empresa</h6>
                       <h6>{empresaEliminar?.denominacion}</h6></div> 
                        <div className="d-flex gap-3 mb-3 mx-4">
                          <button className="btn btn-success text-black" onClick={()=>setModalShow(false)}>Cancelar</button>
                          <button className="btn btn-danger text-black" onClick={()=>handleEliminarEmpresa()}>Eliminar</button>
                        </div>
            </div>
  </div>
  </>
  )
}

export default IndexPage;
