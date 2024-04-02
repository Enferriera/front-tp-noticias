import {Noticia} from './Noticia'


export interface Empresa{
id:number;
denominacion:string;
telefono:string;
horario_de_atencion:string;
quienes_somos:string;
latitud:number;
longitud:number;
domicilio:string; 
email:string; 
noticias: Noticia[];
    
}