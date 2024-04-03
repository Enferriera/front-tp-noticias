import { Empresa } from "../types/Empresa.ts";
import { EmpresaIndex } from "../types/EmpresaIndex.ts";


const BASE_URL="http://localhost:8080/api";

export const EmpresaService={

    getAllEmpresas:async ():Promise<Empresa[]>=>{
        const response=await fetch(`${BASE_URL}/empresas`);
        const data=await response.json();
        return data;
    },
    getOneEmpresa:async (id:number):Promise<Empresa>=>{
        const response=await fetch(`${BASE_URL}/empresas/${id}`);
        const data=await response.json();
        return data;
    },
    createEmpresa:async (empresa:Empresa):Promise<Empresa>=>{
        const { id, ...empresaSinId } = empresa;
        const response=await fetch(`${BASE_URL}/empresas`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(empresaSinId)
        });
        const data=await response.json();
        return data;
    },
    updateEmpresa:async (id:number,empresa:Empresa):Promise<Empresa>=>{
        const response=await fetch(`${BASE_URL}/empresas/${id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(empresa)
        });
        const data=await response.json();
        return data;
    },

    deleteEmpresa:async (id:number):Promise<void>=>{
        const response=await fetch(`${BASE_URL}/empresas/${id}`,{
            method:"DELETE"
           
        });
      
    },
    getEmpresasIndex:async ():Promise<EmpresaIndex[]>=>{
        const response=await fetch(`${BASE_URL}/empresas/listaIndex`);
        const data=await response.json();
        return data;
    }


}