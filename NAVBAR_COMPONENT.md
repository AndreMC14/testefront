# Componente Navbar

Barra de navegação principal da aplicação com links, avatar do usuário e menu responsivo.

---

## 📋 Características

### ✅ Funcionalidades
- **Links de navegação:** Buscar, Biblioteca e Planos
- **Avatar do usuário:** Exibe iniciais ou foto de perfil
- **Menu dropdown:** Perfil e Logout
- **Indicador de rota ativa:** Destaque visual na rota atual
- **Responsivo:** Menu hambúrguer em mobile
- **Condicional:** Oculta em páginas de login/cadastro

### ✅ Estados
- **Usuário logado:** Exibe avatar e nome
- **Usuário não logado:** Exibe botões "Entrar" e "Cadastrar"
- **Mobile:** Menu colapsável com toggle

---

## 🎨 Design

### Desktop
```
┌────────────────────────────────────────────────────────────┐
│ [🎵 Music]  [🔍 Buscar] [📚 Biblioteca] [⭐ Planos]  [👤 Nome ▼] │
└────────────────────────────────────────────────────────────┘
```

### Mobile
```
┌──────────────────────────────┐
│ [🎵]              [☰]        │
└──────────────────────────────┘
│ [🔍 Buscar]                  │
│ [📚 Biblioteca]              │
│ [⭐ Planos]                  │
└──────────────────────────────┘
```

---

## 📁 Estrutura de Arquivos

```
src/app/shared/components/navbar/
├── navbar.component.ts       # Lógica do componente
├── navbar.component.html     # Template
└── navbar.component.css      # Estilos
```

---

## 🔧 Uso

### Importação no App Component

```typescript
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  imports: [NavbarComponent],
  // ...
})
export class AppComponent { }
```

### Template

```html
<app-navbar *ngIf="showNavbar"></app-navbar>
<main [class.with-navbar]="showNavbar">
  <router-outlet></router-outlet>
</main>
```

---

## 🎯 Funcionalidades Detalhadas

### 1. Controle de Visibilidade

A navbar é **automaticamente ocultada** nas rotas de login e cadastro:

```typescript
private noNavbarRoutes = ['/login', '/cadastro'];

constructor(private router: Router) {
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      this.showNavbar = !this.noNavbarRoutes.includes(event.url);
    });
}
```

### 2. Indicador de Rota Ativa

Links ativos recebem destaque visual:

```typescript
isActiveRoute(path: string): boolean {
  return this.currentRoute === path;
}
```

```css
.nav-link.active::after {
  content: '';
  width: 50%;
  height: 2px;
  background-color: var(--primary-green);
}
```

### 3. Avatar do Usuário

Exibe iniciais quando não há foto:

```typescript
getUserInitials(): string {
  if (!this.currentUser?.nome) return 'U';
  
  const names = this.currentUser.nome.split(' ');
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
}
```

**Exemplos:**
- "João Silva" → "JS"
- "Maria" → "M"
- Sem nome → "U"

### 4. Menu Dropdown

Ativado ao clicar no avatar:

```html
<div class="dropdown-menu" [class.active]="isMenuOpen">
  <button (click)="goToProfile()">Perfil</button>
  <button (click)="logout()">Sair</button>
</div>
```

### 5. Responsividade

**Breakpoint:** 768px

**Desktop:**
- Links horizontais
- Avatar com nome completo
- Dropdown à direita

**Mobile:**
- Menu hambúrguer
- Links em coluna
- Avatar sem nome (apenas ícone)

---

## 🎨 Customização de Estilos

### Cores

```css
/* Navbar */
--bg-black: #000000;
--primary-green: #1DB954;

/* Links */
--text-gray-light: #b3b3b3;
--text-white: #ffffff;

/* Hover */
--bg-dark-elevated: #282828;
```

### Altura

```css
/* Desktop */
height: 64px;

/* Mobile */
height: 56px;
```

### Espaçamento do Conteúdo

```css
/* Com navbar */
main.with-navbar {
  padding-top: 64px; /* Desktop */
  padding-top: 56px; /* Mobile */
}
```

---

## 🔌 Integração com AuthService

O componente observa o estado de autenticação:

```typescript
ngOnInit(): void {
  this.authService.currentUser$.subscribe(user => {
    this.currentUser = user;
  });
}
```

**Estados:**
- `currentUser !== null` → Exibe avatar e menu
- `currentUser === null` → Exibe botões de login/cadastro

---

## 📊 Fluxo de Navegação

```
┌─────────────┐
│   Navbar    │
└──────┬──────┘
       │
       ├─→ Buscar (/search)
       ├─→ Biblioteca (/biblioteca)
       ├─→ Planos (/planos)
       │
       └─→ Avatar
           ├─→ Perfil (TODO)
           └─→ Logout → /login
```

---

## 🚀 Próximas Melhorias

### Funcionalidades Futuras
- [ ] Página de perfil do usuário
- [ ] Notificações no dropdown
- [ ] Busca rápida na navbar
- [ ] Tema claro/escuro toggle
- [ ] Histórico de navegação
- [ ] Atalhos de teclado

### Melhorias de UX
- [ ] Animações de transição
- [ ] Feedback visual ao clicar
- [ ] Loading state ao fazer logout
- [ ] Confirmação antes de sair

---

## 🐛 Troubleshooting

### Navbar não aparece
- Verificar se a rota está em `noNavbarRoutes`
- Confirmar importação no `AppComponent`

### Avatar não exibe iniciais
- Verificar se `currentUser.nome` existe
- Conferir método `getUserInitials()`

### Menu não fecha em mobile
- Verificar evento `(click)` no menu toggle
- Confirmar lógica de `toggleMenu()`

### Links não destacam rota ativa
- Verificar `currentRoute` no componente
- Conferir método `isActiveRoute()`

---

## 📝 Exemplo de Uso Completo

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar *ngIf="showNavbar"></app-navbar>
    <main [class.with-navbar]="showNavbar">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    main.with-navbar {
      padding-top: 64px;
    }
  `]
})
export class AppComponent {
  showNavbar = true;
  private noNavbarRoutes = ['/login', '/cadastro'];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.showNavbar = !this.noNavbarRoutes.includes(event.url);
      });
  }
}
```

---

## ✅ Checklist de Implementação

- [x] Criar componente Navbar
- [x] Adicionar links de navegação
- [x] Implementar avatar do usuário
- [x] Criar menu dropdown
- [x] Adicionar responsividade
- [x] Integrar com AuthService
- [x] Ocultar em login/cadastro
- [x] Adicionar indicador de rota ativa
- [x] Implementar logout
- [ ] Criar página de perfil
- [ ] Adicionar testes unitários

---

**Componente pronto para uso!** 🎉
