import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router'; // Importa Router para la navegación

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder, private router: Router) { // Inyecta Router en el constructor
    this.formularioLogin = this.fb.group({
      nombre: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmacion: new FormControl('', [Validators.required, Validators.minLength(6)]),
      correo: new FormControl('', [Validators.required, Validators.email]),
    }, { validator: this.matchingPasswords('password', 'confirmacion') });
  }

  ngOnInit() {}

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } | null => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true,
        };
      }
      return null; // Devuelve null si las contraseñas coinciden
    };
  }

  onSubmit() {
    // Redirige directamente al dashboard sin validar el formulario
    this.router.navigate(['/dashboard-page']);
  }
}