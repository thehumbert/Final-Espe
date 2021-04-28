// import * as FileSaver from 'file-saver';
//import * as XLSX from 'xlsx';
//import { DatePipe } from '@angular/common';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GastoInversion } from '../models/gastoInversion';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GastoInversionService {

  private opcionesUrl1 =  environment.base_url + '/gastoInversion/todos';
  private opcionesUrl =  environment.base_url + '/gastoInversion';

  constructor(private http: HttpClient) { }



  getOpciones(): Observable<GastoInversion[]> {
    return this.http.get<GastoInversion[]>(this.opcionesUrl1)
  }

  getGastoInversionId(id: string): Observable<GastoInversion> {
    const url = `${this.opcionesUrl}/${id}`;
    return this.http.get<GastoInversion>(url);
  }

  getGastoInversion (usuario_id:string): Observable<GastoInversion[]> {
    return this.http.get<GastoInversion[]>(this.opcionesUrl+'?usuario_id='+usuario_id)
  } 


  addOpcion (proveedor: GastoInversion): Observable<GastoInversion> {
    return this.http.post<GastoInversion>(this.opcionesUrl, proveedor, httpOptions);
  }

  addOpcion2 (proveedor: GastoInversion): Observable<GastoInversion> {
    return this.http.post<GastoInversion>(this.opcionesUrl, proveedor, httpOptions);
  }

  deleteOpcion (opcion: GastoInversion | string): Observable<GastoInversion> {
    const id = typeof opcion === 'string' ? opcion : opcion._id;
    const url = `${this.opcionesUrl}/${id}`;

    return this.http.delete<GastoInversion>(url, httpOptions);
  }

  updateOpcion (proveedor: GastoInversion): Observable<any> {
    return this.http.put(this.opcionesUrl, proveedor, httpOptions);
  }


  buscarGastoInversion( termino: string ) {
    let url = `${ environment.base_url }/busqueda/coleccion/GastoInversion/${ termino }`;

    return this.http.get( url ).pipe(map((resp: any) => resp.indicadores ));
  }
}
