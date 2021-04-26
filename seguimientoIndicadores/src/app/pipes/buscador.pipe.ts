import { isNgTemplate } from '@angular/compiler';
import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';


@Pipe({
  name: 'buscador'
})
export class BuscadorPipe implements PipeTransform {
    
    transform( arreglo: any[], texto: string): any {
        if (texto ===''){
            return arreglo;
        }
        texto = texto.toLowerCase();

        return arreglo.filter( item => {
            return item.Partida.toLowerCase()
            .includes(texto);
        });
        }
        
}  
    



