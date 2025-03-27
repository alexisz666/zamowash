import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ProductosPage implements OnInit {
  productos: any[] = []; // Lista de productos

  constructor(private http: HttpClient, private alertController: AlertController) {}

  ngOnInit() {
    this.cargarProductos(); // Cargar productos al iniciar la página
  }

  // Cargar productos desde el backend
  cargarProductos() {
    this.http.get('http://localhost:3000/api/productos')
      .subscribe(
        (response: any) => {
          this.productos = response; // Asignar los productos a la lista
        },
        (error) => {
          console.error('Error al cargar los productos:', error);
        }
      );
  }

  // Método para comprar un producto
  async comprarProducto(producto: any) {
    if (producto.stock <= 0) {
      this.mostrarAlerta('Error', 'No hay suficiente stock para este producto.');
      return;
    }

    const alert = await this.alertController.create({
      header: 'Confirmar compra',
      message: `¿Cuántas unidades de ${producto.nombre} deseas comprar?`,
      inputs: [
        {
          name: 'cantidad',
          type: 'number',
          placeholder: 'Cantidad',
          min: 1,
          max: producto.stock,
        },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Comprar',
          handler: (data) => {
            const cantidad = parseInt(data.cantidad, 10);
            if (cantidad > 0 && cantidad <= producto.stock) {
              const total = cantidad * producto.precio;
              this.confirmarCompra(producto, cantidad, total);
            } else {
              this.mostrarAlerta('Error', 'Cantidad no válida.');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  // Método para confirmar la compra
  async confirmarCompra(producto: any, cantidad: number, total: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar pago',
      message: `Total a pagar: $${total}. ¿Deseas continuar?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Pagar',
          handler: () => {
            const userId = '67d9d97cb4316f108121cb56'; // ID del usuario logueado (Fernando)
            const compraData = {
              userId,
              productos: [{ productoId: producto._id, cantidad, precioUnitario: producto.precio }],
              total,
            };

            // Registrar la compra en el backend
            this.http.post('http://localhost:3000/api/compras', compraData)
              .subscribe(
                (response: any) => {
                  // Actualizar el stock en el backend
                  this.http.put(`http://localhost:3000/api/productos/${producto._id}`, { stock: producto.stock - cantidad })
                    .subscribe(
                      (response: any) => {
                        this.mostrarAlerta('Éxito', `Compra realizada: ${cantidad} unidades de ${producto.nombre}.`);
                        this.cargarProductos(); // Recargar la lista de productos
                      },
                      (error) => {
                        this.mostrarAlerta('Error', 'No se pudo actualizar el stock del producto.');
                      }
                    );
                },
                (error) => {
                  this.mostrarAlerta('Error', 'No se pudo registrar la compra.');
                }
              );
          },
        },
      ],
    });

    await alert.present();
  }

  // Método para mostrar alertas
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}