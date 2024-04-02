import { Noticia } from "../types/Noticia";

const BASE_URL="http://localhost:8080/api";

export const NoticiaService={

    getAllNoticias:async ():Promise<Noticia[]>=>{
        const response=await fetch(`${BASE_URL}/noticias`);
        const data=await response.json();
        return data;
    },
    getOneNoticia:async (id:number):Promise<Noticia>=>{
        const response=await fetch(`${BASE_URL}/noticias/${id}`);
        const data=await response.json();
        return data;
    },
    createNoticia:async (noticia:Noticia):Promise<Noticia>=>{
        const response=await fetch(`${BASE_URL}/noticias`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(noticia)
        });
        const data=await response.json();
        return data;
    },
    updateNoticia:async (id:number,noticia:Noticia):Promise<Noticia>=>{
        const response=await fetch(`${BASE_URL}/noticias/${id}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(noticia)
        });
        const data=await response.json();
        return data;
    },

    deleteEmpresa:async (id:number):Promise<void>=>{
        const response=await fetch(`${BASE_URL}/noticias/${id}`,{
            method:"DELETE"
           
        });
        const data=await response.json();
        return data;
    },
    getHomeNoticias:async (id:number):Promise<Noticia[]>=>{
        const response=await fetch(`${BASE_URL}/noticias/ultimasNoticias/${id}`);
        const data=response.json();
        return data;
    },
    getNoticiasSearchByPalabra:async(id:number,palabras:string):Promise<Noticia[]>=>{
        const response=await fetch(`${BASE_URL}/noticias/search?id=${id}&&palabras=${palabras}`);
        const data=response.json();
        return data;
    }

}