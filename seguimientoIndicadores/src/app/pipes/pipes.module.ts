import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { BuscadorPipe } from './buscador.pipe';


@NgModule({
  declarations: [
    ImagenPipe,
    BuscadorPipe 
 
  
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ImagenPipe,
    BuscadorPipe 
  
  ],
  providers: [
    
   
  ],
})
export class PipesModule { }
