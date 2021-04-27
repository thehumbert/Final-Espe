import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Departamento } from 'src/app/models/departamento';
import { ViceInvestigacion } from 'src/app/models/viceInvestigacion';
import { ViceInvestigacionService } from 'src/app/services/viceInvestigacion.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-vice-investigacion',
  templateUrl: './vice-investigacion.component.html',
  styleUrls: ['./vice-investigacion.component.css']
})
export class ViceInvestigacionComponent implements OnInit {

 

  //Crear  Vice Investigación
  
  viceInvestigacion: ViceInvestigacion;
  departamentos: Departamento[];

  constructor( private viceInvestigacionService: ViceInvestigacionService, private fb: FormBuilder ) { }

  public viceInvestigacionForm = this.fb.group({
    campos: this.fb.array(<any>[]),
    resultado: this.fb.array(<any>[]),
    campos1: this.fb.array(<any>[]),
    campos2: this.fb.array(<any>[]),
  })

  ngOnInit(): void {
    this.viceInvestigacionService.getDepartamentos("VICEINVESTIGACION").subscribe(
      res => {
        this.departamentos = res;
        for (let i = 0; i < this.departamentos.length; i++) {
          const iasaFromGroup = this.fb.group({
            codigo: '',
            departamento: this.departamentos[i].departamento,
            porcentajeCumplimiento: 0,
            categoriaEjecucion: '',
            avanceFisico: 0,
            categoriaMetas: '',
            indiceGestion: 0,
            class: ''
          });
          this.campos.push(iasaFromGroup);

          const campos1FromGroup = this.fb.group({
            codigo: '',
            departamento: this.departamentos[i].departamento,
            porcentajeCumplimiento: 0,
            categoriaEjecucion: '',
            avanceFisico: 0,
            categoriaMetas: '',
            indiceGestion: 0,
            class: ''
          });
         this.campos1.push(campos1FromGroup); 
         const campos2FromGroup = this.fb.group({
          codigo: '',
          departamento: this.departamentos[i].departamento,
          porcentajeCumplimiento: 0,
          categoriaEjecucion: '',
          avanceFisico: 0,
          categoriaMetas: '',
          indiceGestion: 0,
          class: ''
        });
       this.campos2.push(campos2FromGroup);
        }
       

        const resultadoFromGroup = this.fb.group({
          porcentajeCumplimiento: 0,
          categoriaEjecucion: '',
          avanceFisico: 0,
          categoriaMetas: '',
          indiceGestion: 0,
          class: ''
        });
        this.resultado.push(resultadoFromGroup);
      }, err => {
        console.error(err);
      }
    );

    
  }

  get campos() {
    return this.viceInvestigacionForm.get('campos') as FormArray;
  }

  get resultado() {
    return this.viceInvestigacionForm.get('resultado') as FormArray;
  }

  get campos1() {
    return this.viceInvestigacionForm.get('campos1') as FormArray;
  }

  get campos2() {
    return this.viceInvestigacionForm.get('campos2') as FormArray;
  }

  calcularPorcentajeCumplimiento(numero: number, index: number){
    let total: number = 0;
    for (let i = 0; i < this.campos.length; i++) {
      total += this.campos.value[i].porcentajeCumplimiento;
    }
    this.resultado.value[0].porcentajeCumplimiento = (total / this.campos.length) / 100;
    this.cumpleOrNotCumple(numero, index);
    this.cumpleOrNotCumpleTotal(this.resultado.value[0].porcentajeCumplimiento*100);
    this.calcularUltima();
    
  }

  calcularAvanceFisico(numero: number, index: number){
    let total: number = 0;
    for (let i = 0; i < this.campos.length; i++) {
      total += this.campos.value[i].avanceFisico;
    }
    this.resultado.value[0].avanceFisico = (total / this.campos.length)/100;
    this.cumpleOrNotCumpleAvanceFisico(numero, index);
    this.cumpleOrNotCumpleTotal(this.resultado.value[0].avanceFisico*100);
    this.calcularUltima();
  }

  calcularUltima(){
    for (let i = 0; i < this.campos.length ; i++) {
      this.campos.value[i].indiceGestion = 
      ((this.campos.value[i].porcentajeCumplimiento + this.campos.value[i].avanceFisico ) / 2) / 100; 
    }
    
    this.resultado.value[0].indiceGestion = 
    ((this.resultado.value[0].porcentajeCumplimiento + this.resultado.value[0].avanceFisico) / 2); 
    this.cumpleOrNotCumpleTotal(this.resultado.value[0].indiceGestion*100 );
  }

  cumpleOrNotCumple( numero, index ) {
    if ( numero >= 0 && numero <= 69.99) {
      this.campos1.value[index].class = 'bg-danger'
      this.campos1.value[index].categoriaEjecucion = "BAJO CUMPLIMIENTO"
    } else  if ( numero > 69.99 && numero <= 85.4){
      this.campos1.value[index].class = 'bg-warning'
      this.campos1.value[index].categoriaEjecucion = "MEDIO CUMPLIMIENTO"
    } else  if ( numero > 85.4 && numero <= 100 ){
      this.campos1.value[index].class = 'bg-success'
      this.campos1.value[index].categoriaEjecucion = "ALTO CUMPLIMIENTO"
    }else if (numero > 100 ) {

      Swal.fire(
        'Oooops!!!',
        'Verifique por favor solo se aceptan números del 0 al 100',
        'question'
      )

    }

  }

  cumpleOrNotCumplePorcentajeCumplimiento( numero, index ) {
    if ( numero >= 0 && numero <= 69.99) {
      this.campos1.value[index].class = 'bg-danger'
      this.campos1.value[index].categoriaEjecucion = "BAJO CUMPLIMIENTO"
    } else  if ( numero > 69.99 && numero <= 85.4){
      this.campos1.value[index].class = 'bg-warning'
      this.campos1.value[index].categoriaEjecucion = "MEDIO CUMPLIMIENTO"
    } else  if ( numero > 85.4 && numero <= 100 ){
      this.campos1.value[index].class = 'bg-success'
      this.campos1.value[index].categoriaEjecucion = "ALTO CUMPLIMIENTO"
    }else if (numero > 100 ) {

      Swal.fire(
        'Oooops!!!',
        'Verifique por favor solo se acepta números del 0 al 100',
        'question'
      )

    }

  }


  cumpleOrNotCumpleAvanceFisico( numero, index ) {
    if ( numero >= 0 && numero <= 69.99) {
      this.campos2.value[index].class = 'bg-danger'
      this.campos2.value[index].categoriaMetas = "METAS NO CUMPLIDAS"
    }
     else  if (  numero > 69.99 && numero <= 85.4 ){
      this.campos2.value[index].class = 'bg-warning'
      this.campos2.value[index].categoriaMetas = "MEDIO CUMPLIMIENTO"
    }
    else  if (  numero > 85.4 && numero <= 100   ){
      this.campos2.value[index].class = 'bg-success'
      this.campos2.value[index].categoriaMetas = "METAS CUMPLIDAS"
    }else if (numero > 100 ) {

      Swal.fire(
        'Oooops!!!',
        'Verifique por favor solo se aceptan números del 0 al 100',
        'question'
      )

    }

  }

  cumpleOrNotCumpleTotal( numero ) {
    if ( numero >= 0 && numero <= 69.99) {
      this.resultado.value[0].class = 'bg-danger'
      this.resultado.value[0].categoriaEjecucion = "BAJO CUMPLIMIENTO"
      this.resultado.value[0].categoriaMetas = "BAJO CUMPLIMIENTO"
    } else  if ( numero > 69.99 && numero <= 85.4){
      this.resultado.value[0].class = 'bg-warning'
      this.resultado.value[0].categoriaEjecucion= "MEDIO CUMPLIMIENTO"
      this.resultado.value[0].categoriaMetas = "MEDIO CUMPLIMIENTO"

    } else  if ( numero > 85.4 ){
      this.resultado.value[0].class = 'bg-success'
      this.resultado.value[0].categoriaEjecucion = "ALTO CUMPLIMIENTO"
      this.resultado.value[0].categoriaMetas = "ALTO CUMPLIMIENTO"

    }
  }


  createViceInvestigacion() {

    this.viceInvestigacionService.addOpcion(this.viceInvestigacionForm.value).subscribe( res => {
      console.log(res)

      Swal.fire(
        'Exito',
        'Datos guardados',
        'success',
      )

    } )


  }

}