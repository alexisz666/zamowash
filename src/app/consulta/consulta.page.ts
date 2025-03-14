import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
  standalone: true,
    imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class ConsultaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
