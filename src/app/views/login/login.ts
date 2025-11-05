import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { StorageService } from '../../services/storage.service';
import {
  LoginRequest,
  LoginResponse,
  VerifyRequest,
  VerifyResponse,
} from '../../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  email: string = '';
  code: string = '';
  step: 'login' | 'verify' = 'login';
  loading = false;
  countdown = 0;
  private countdownInterval: any;

  // 🔔 Toast
  toastMessage: string | null = null;
  toastType: 'success' | 'danger' | 'warning' = 'success';
  private toastTimeout: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: StorageService
  ) {}

  onSubmit() {
    this.loading = true;

    if (this.step === 'login') {
      const request: LoginRequest = { email: this.email };
      this.authService.login(request).subscribe({
        next: (response: LoginResponse) => {
          this.loading = false;
          if (response.isValid) {
            this.showToast('Código enviado correctamente', 'success');
            this.step = 'verify';
            this.startCountdown();
          } else {
            this.showToast(response.message || 'Correo no válido', 'danger');
          }
        },
        error: (err) => {
          this.loading = false;
          this.showToast(
            'Error al conectar con el servidor. Inténtalo más tarde.',
            'danger'
          );
          console.error(err);
        },
      });
    } else {
      const request: VerifyRequest = {
        code: this.code,
        email: this.email,
      };
      this.authService.verifyCode(request).subscribe({
        next: (response: VerifyResponse) => {
          this.loading = false;
          if (response.isValid) {
            this.showToast('Verificación exitosa', 'success');

            // ✅ Guarda el usuario usando StorageService
            this.storage.setItem('user', {
              email: this.email,
              token: response.data.accessToken.token,
            });

            // ✅ Redirige al dashboard
            this.router.navigate(['/dashboard']);
          } else {
            this.showToast(response.message || 'Código incorrecto', 'warning');
          }
        },
        error: (err) => {
          this.loading = false;
          this.showToast(
            'No se pudo verificar el código. Intenta nuevamente.',
            'danger'
          );
          console.error(err);
        },
      });
    }
  }

  goBack() {
    this.step = 'login';
    this.code = '';
    this.clearCountdown();
  }

  resendCode() {
    if (!this.email) return;
    this.loading = true;
    const request: LoginRequest = { email: this.email };
    this.authService.login(request).subscribe({
      next: (response: LoginResponse) => {
        this.loading = false;
        if (response.isValid) {
          this.showToast('Se reenvió el código correctamente', 'success');
          this.startCountdown();
        } else {
          this.showToast('No se pudo reenviar el código', 'danger');
        }
      },
      error: (err) => {
        this.loading = false;
        this.showToast('Error al reenviar el código', 'danger');
        console.error(err);
      },
    });
  }

  // 🕒 manejo del contador
  startCountdown() {
    this.clearCountdown();
    this.countdown = 30;
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) this.clearCountdown();
    }, 1000);
  }

  clearCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
  }

  // 🔔 Toast
  showToast(message: string, type: 'success' | 'danger' | 'warning' = 'success') {
    this.toastMessage = message;
    this.toastType = type;
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastMessage = null;
    }, 4000);
  }

  closeToast() {
    this.toastMessage = null;
    clearTimeout(this.toastTimeout);
  }
}
