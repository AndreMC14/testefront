import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services';

/**
 * Component: CadastroComponent
 * Componente de cadastro com validação de formulário
 */

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Inicializa o formulário com validações
   */
  private initForm(): void {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  /**
   * Validador customizado para confirmar senha
   */
  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const senha = control.get('senha');
    const confirmarSenha = control.get('confirmarSenha');

    if (!senha || !confirmarSenha) {
      return null;
    }

    return senha.value === confirmarSenha.value ? null : { passwordMismatch: true };
  }

  /**
   * Submete o formulário de cadastro
   */
  onSubmit(): void {
    if (this.cadastroForm.invalid) {
      this.markFormGroupTouched(this.cadastroForm);
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.cadastrar(this.cadastroForm.value).subscribe({
      next: () => {
        this.router.navigate(['/search']);
      },
      error: (error) => {
        this.errorMessage = 'Erro ao criar conta. Tente novamente.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  /**
   * Marca todos os campos como touched para exibir erros
   */
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  /**
   * Verifica se um campo tem erro
   */
  hasError(field: string, error: string): boolean {
    const control = this.cadastroForm.get(field);
    return !!(control?.hasError(error) && control?.touched);
  }

  /**
   * Verifica se as senhas não coincidem
   */
  hasPasswordMismatch(): boolean {
    const confirmarSenha = this.cadastroForm.get('confirmarSenha');
    return !!(
      this.cadastroForm.hasError('passwordMismatch') &&
      confirmarSenha?.touched
    );
  }

  /**
   * Obtém mensagem de erro para um campo
   */
  getErrorMessage(field: string): string {
    const control = this.cadastroForm.get(field);

    if (control?.hasError('required')) {
      return 'Este campo é obrigatório';
    }

    if (control?.hasError('email')) {
      return 'Email inválido';
    }

    if (control?.hasError('minlength')) {
      const minLength = control.getError('minlength').requiredLength;
      return `Mínimo de ${minLength} caracteres`;
    }

    return '';
  }
}
