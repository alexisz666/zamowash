import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true, // Asegúrate de que el componente sea standalone
  imports: [IonicModule, CommonModule, FormsModule], // Importa FormsModule aquí
})
export class ProductosPage implements OnInit {
  nuevoProducto = {
    nombre: '',
    descripcion: '',
    precio: null,
    stock: null,
  };

  productos: any[] = [];

  constructor(private http: HttpClient, private alertController: AlertController) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.http.get('http://localhost:3000/api/productos')
      .subscribe(
        (response: any) => {
          this.productos = response;
        },
        (error) => {
          console.error('Error al cargar los productos:', error);
        }
      );
  }

  async agregarProducto() {
    if (
      !this.nuevoProducto.nombre ||
      !this.nuevoProducto.descripcion ||
      !this.nuevoProducto.precio ||
      !this.nuevoProducto.stock
    ) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, completa todos los campos.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    this.http.post('http://localhost:3000/api/productos', this.nuevoProducto)
      .subscribe(
        (response: any) => {
          this.cargarProductos();
          this.nuevoProducto = { nombre: '', descripcion: '', precio: null, stock: null };
          this.mostrarAlerta('Éxito', 'Producto agregado correctamente.');
        },
        (error) => {
          this.mostrarAlerta('Error', 'No se pudo agregar el producto.');
        }
      );
  }

  async editarProducto(id: string, producto: any) {
    const alert = await this.alertController.create({
      header: 'Editar Producto',
      inputs: [
        { name: 'nombre', type: 'text', value: producto.nombre, placeholder: 'Nombre' },
        { name: 'descripcion', type: 'text', value: producto.descripcion, placeholder: 'Descripción' },
        { name: 'precio', type: 'number', value: producto.precio, placeholder: 'Precio' },
        { name: 'stock', type: 'number', value: producto.stock, placeholder: 'Stock' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.nombre && data.descripcion && data.precio && data.stock) {
              this.http.put(`http://localhost:3000/api/productos/${id}`, data)
                .subscribe(
                  (response: any) => {
                    this.cargarProductos();
                    this.mostrarAlerta('Éxito', 'Producto actualizado correctamente.');
                  },
                  (error) => {
                    this.mostrarAlerta('Error', 'No se pudo actualizar el producto.');
                  }
                );
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async eliminarProducto(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que quieres eliminar este producto?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.http.delete(`http://localhost:3000/api/productos/${id}`)
              .subscribe(
                (response: any) => {
                  this.cargarProductos();
                  this.mostrarAlerta('Éxito', 'Producto eliminado correctamente.');
                },
                (error) => {
                  this.mostrarAlerta('Error', 'No se pudo eliminar el producto.');
                }
              );
          },
        },
      ],
    });

    await alert.present();
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}