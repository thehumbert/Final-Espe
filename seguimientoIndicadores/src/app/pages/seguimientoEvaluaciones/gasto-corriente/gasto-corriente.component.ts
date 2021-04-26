import { Component, OnInit, Input, NgZone  } from '@angular/core';
import * as XLSX from 'xlsx';
import { GastoCorriente } from 'src/app/models/gastoCorriente';
import { GastoCorrienteService } from 'src/app/services/gastoCorriente.service';


declare var $: any;

@Component({
  selector: 'app-gasto-corriente',
  templateUrl: './gasto-corriente.component.html',
  styleUrls: ['./gasto-corriente.component.css']
})
export class GastoCorrienteComponent implements OnInit {

  @Input() 
  asignado = [];
  organismos = [];
  cont = 0;
  valores = [];
  sumatoria = 0;
  sumatoriadatos = 0; 

  constructor() { }
  buscadorAsignado ='';
  pageActual: number =1;
  ngOnInit(): void {
  }

  buscar (event ){
    this.buscadorAsignado = event.detail.value;
  }
  // subir archivo Ecxel
  onFileChange(evt: any) {
    var fileName = evt.target.files[0].name;
      $('.custom-file-label').html(fileName);

    const target : DataTransfer =  <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      
      const bstr: string = e.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      wb.SheetNames.forEach(sheet => {
        let rowObject = XLSX.utils.sheet_to_json(wb.Sheets[sheet]);
        this.asignado=rowObject;
        
      })
      console.log(this.asignado);
 
    };
    reader.readAsBinaryString(target.files[0]);
  }

}
