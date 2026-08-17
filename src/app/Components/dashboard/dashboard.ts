import { Component, OnInit } from '@angular/core';
import { MovimientoService } from '../../services/firestore.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  movimientos: any[] = [];
  

  form = {
    tipo: "",
    folioNota: "",
    cliente : "",
    precio: "",
    fechaOrden: "",
    fechaEntrega: "",
    descripcion: ""
  };

  constructor(
    private movService: MovimientoService){}
  
    async ngOnInit(){
      this.movimientos =  await this.movService.obtenerMovs();
    }

    async guardarMov(){
      const data = {
        ...this.form, precio: Number(this.form.precio)
      };
      await this.movService.agregarMov(data)
      Swal.fire({
        title: "Éxito",
        text: "Documento guardado con éxito",
        icon: "success"
      })
      this.movimientos =  await this.movService.obtenerMovs();
      this.limpiarForm();
    }

    limpiarForm(){
      this.form = {
        tipo: "",
        folioNota: "",
        cliente: "",
        precio: "",
        fechaOrden: "",
        fechaEntrega: "",
        descripcion: ""

      }
    }

  async eliminarMov(id: string){
    await this.movService.borrarMov(id);
    this.movimientos = await this.movService.obtenerMovs()
  }


}
