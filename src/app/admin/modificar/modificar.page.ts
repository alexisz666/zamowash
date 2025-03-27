import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class ModificarPage implements OnInit {
  priceScheduleForm: FormGroup;
  currentPriceSchedule: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastController: ToastController
  ) {
    this.priceScheduleForm = this.fb.group({
      sedanPrice: ['', Validators.required],
      suvPrice: ['', Validators.required],
      pickupPrice: ['', Validators.required],
      openingTime: ['', Validators.required],
      closingTime: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadPriceSchedule();
  }

  loadPriceSchedule() {
    this.http.get('http://localhost:3000/api/price-schedule').subscribe((data: any) => {
      this.currentPriceSchedule = data;
      this.priceScheduleForm.patchValue(data);
    });
  }

  async onSubmit() {
    if (this.priceScheduleForm.valid) {
      this.http.put('http://localhost:3000/api/price-schedule', this.priceScheduleForm.value).subscribe(async response => {
        this.currentPriceSchedule = response;
        const toast = await this.toastController.create({
          message: 'Precios y horarios modificados exitosamente',
          duration: 2000,
          color: 'success',
        });
        toast.present();
      });
    }
  }
}