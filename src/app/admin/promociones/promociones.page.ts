import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, ToastController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-promociones',
  templateUrl: './promociones.page.html',
  styleUrls: ['./promociones.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class PromocionesPage implements OnInit {
  promotionForm: FormGroup;
  products: any[] = [];
  promotions: any[] = [];
  promotionType: string = 'product'; // Tipo de promoción por defecto

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    this.promotionForm = this.fb.group({
      type: ['product', Validators.required],
      productId: [null],
      washType: [null],
      discount: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.loadProducts();
    this.loadPromotions();
  }

  loadProducts() {
    this.http.get('http://localhost:3000/api/productos').subscribe((data: any) => {
      this.products = data;
    });
  }

  loadPromotions() {
    this.http.get('http://localhost:3000/api/promotions').subscribe((data: any) => {
      this.promotions = data;
    });
  }

  onPromotionTypeChange(event: any) {
    this.promotionType = event.detail.value;
    this.promotionForm.patchValue({ productId: null, washType: null });
  }

  async onSubmit() {
    if (this.promotionForm.valid) {
      const formValue = this.promotionForm.value;
      if (this.promotionType === 'product' && !formValue.productId) {
        const toast = await this.toastController.create({
          message: 'Selecciona un producto',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
        return;
      }
      if (this.promotionType === 'wash' && !formValue.washType) {
        const toast = await this.toastController.create({
          message: 'Selecciona un tipo de lavado',
          duration: 2000,
          color: 'danger',
        });
        toast.present();
        return;
      }

      this.http.post('http://localhost:3000/api/promotions', formValue).subscribe(async (response: any) => {
        this.loadPromotions();
        const toast = await this.toastController.create({
          message: 'Promoción creada exitosamente',
          duration: 2000,
          color: 'success',
        });
        toast.present();
        this.promotionForm.reset({ type: this.promotionType });
      });
    }
  }

  async editPromotion(promotion: any) {
    const alert = await this.alertController.create({
      header: 'Editar Promoción',
      inputs: [
        {
          name: 'discount',
          type: 'number',
          value: promotion.discount,
          placeholder: 'Descuento (%)',
        },
        {
          name: 'startDate',
          type: 'date',
          value: promotion.startDate.split('T')[0],
          placeholder: 'Fecha de Inicio',
        },
        {
          name: 'endDate',
          type: 'date',
          value: promotion.endDate.split('T')[0],
          placeholder: 'Fecha de Fin',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            const updatedPromotion = {
              ...promotion,
              discount: data.discount,
              startDate: data.startDate,
              endDate: data.endDate,
            };
            this.http.put(`http://localhost:3000/api/promotions/${promotion._id}`, updatedPromotion).subscribe(async () => {
              this.loadPromotions();
              const toast = await this.toastController.create({
                message: 'Promoción actualizada exitosamente',
                duration: 2000,
                color: 'success',
              });
              toast.present();
            });
          },
        },
      ],
    });
    await alert.present();
  }

  async deletePromotion(promotionId: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas eliminar esta promoción?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.http.delete(`http://localhost:3000/api/promotions/${promotionId}`).subscribe(async () => {
              this.loadPromotions();
              const toast = await this.toastController.create({
                message: 'Promoción eliminada exitosamente',
                duration: 2000,
                color: 'success',
              });
              toast.present();
            });
          },
        },
      ],
    });
    await alert.present();
  }
}