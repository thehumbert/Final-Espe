import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Departamento } from 'src/app/models/departamento';
import { Latacunga } from 'src/app/models/latacunga';
import { LatacungaService } from 'src/app/services/latacunga.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-latacunga',
  templateUrl: './latacunga.component.html',
  styleUrls: ['./latacunga.component.css']
})
export class LatacungaComponent implements OnInit {

  //Crear Latacunga
  latacunga: Latacunga;
  departamentos: Departamento[];

  constructor(private latacungaService: LatacungaService, private fb: FormBuilder) { }

  public latacungaForm = this.fb.group({
    campos: this.fb.array(<any>[]),
    resultado: this.fb.array(<any>[]),
    campos1: this.fb.array(<any>[]),
    campos2: this.fb.array(<any>[]),
  })

  ngOnInit(): void {
    this.latacungaService.getDepartamentos("LATACUNGA").subscribe(
      res => {
        this.departamentos = res;
        for (let i = 0; i < this.departamentos.length; i++) {
          const latacungaFromGroup = this.fb.group({
            codigo: '',
            departamento: this.departamentos[i].departamento,
            porcentajeCumplimiento: 0,
            categoriaEjecucion: '',
            avanceFisico: 0,
            categoriaMetas: '',
            indiceGestion: 0,
            class: ''
          });
          this.campos.push(latacungaFromGroup);

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
    return this.latacungaForm.get('campos') as FormArray;
  }

  get resultado() {
    return this.latacungaForm.get('resultado') as FormArray;
  }

  get campos1() {
    return this.latacungaForm.get('campos1') as FormArray;
  }

  get campos2() {
    return this.latacungaForm.get('campos2') as FormArray;
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
        'Verifique por favor solo se acepta n??meros del 0 al 100',
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
        'Verifique por favor solo se acepta n??meros del 0 al 100',
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
        'Verifique por favor solo se acepta n??meros del 0 al 100',
        'question'
      )

    }

  }

  cumpleOrNotCumpleTotal( numero ) {
    if ( numero >= 0 && numero <= 69.99) {
      this.resultado.value[0].class = 'bg-danger'
      this.resultado.value[0].categoriaEjecucion = "BAJO CUMPLIMIENTO"
      this.resultado.value[0].categoriaMetas = "METAS NO CUMPLIDAS"
    } else  if ( numero > 69.99 && numero <= 85.4){
      this.resultado.value[0].class = 'bg-warning'
      this.resultado.value[0].categoriaEjecucion= "MEDIO CUMPLIMIENTO"
      this.resultado.value[0].categoriaMetas = "METAS PARCIALMENTE CUMPLIDAS"

    } else  if ( numero > 85.4 ){
      this.resultado.value[0].class = 'bg-success'
      this.resultado.value[0].categoriaEjecucion = "ALTO CUMPLIMIENTO"
      this.resultado.value[0].categoriaMetas = "METAS CUMPLIDAS"

    }
  }

  createLatacunga() {

    this.latacungaService.addOpcion(this.latacungaForm.value).subscribe( res => {
      console.log(res)
      Swal.fire(
        'Exito',
        'Datos guardados',
        'success',
      )

    })
  }

}