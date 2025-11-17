# Music Streaming - Plataforma de Música

Plataforma moderna de streaming de música desenvolvida com Angular 17+, utilizando standalone components e as melhores práticas de desenvolvimento frontend.

## 🎯 Características

- ✅ **Angular 17+** com standalone components
- ✅ **Lazy Loading** para otimização de performance
- ✅ **Reactive Forms** com validação completa
- ✅ **RxJS** para gerenciamento de estado
- ✅ **Design System** padronizado com variáveis CSS
- ✅ **Responsivo** e acessível
- ✅ **TypeScript** com tipagem forte
- ✅ **Preparado para integração** com backend ASP.NET Core

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── core/                    # Módulo core (singleton)
│   │   ├── models/              # Interfaces e tipos
│   │   │   ├── musica.model.ts
│   │   │   ├── usuario.model.ts
│   │   │   ├── categoria.model.ts
│   │   │   └── index.ts
│   │   ├── services/            # Serviços globais
│   │   │   ├── auth.service.ts
│   │   │   ├── musica.service.ts
│   │   │   ├── planos.service.ts
│   │   │   └── index.ts
│   │   ├── guards/              # Route guards (futuro)
│   │   └── interceptors/        # HTTP interceptors (futuro)
│   │
│   ├── features/                # Módulos de features
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   └── cadastro/
│   │   ├── biblioteca/
│   │   │   ├── musica-card/
│   │   │   └── biblioteca.component.*

│   │   ├── search/
│   │   └── planos/
│   │
│   ├── shared/                  # Componentes compartilhados
│   │   ├── components/
│   │   ├── directives/
│   │   └── pipes/
│   │
│   ├── app.component.*
│   ├── app.config.ts
│   └── app.routes.ts
│
├── assets/                      # Imagens, fontes, etc
├── styles.css                   # Estilos globais e design system
├── index.html
└── main.ts
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm start

# Acessar em http://localhost:4200
```

### Build para Produção

```bash
# Build otimizado
npm run build:prod

# Arquivos gerados em dist/
```

## 🎨 Design System

O projeto utiliza um design system completo com variáveis CSS:

### Cores Principais

- **Primary Green:** `#1DB954` (cor principal, inspirada no Spotify)
- **Backgrounds:** Tons de preto e cinza escuro
- **Textos:** Branco, cinza claro e cinza escuro

### Componentes Reutilizáveis

- Botões (`.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline`)
- Formulários (`.form-group`, `.form-label`, `.form-control`)
- Cards (`.card`)
- Utilitários de espaçamento e tipografia

## 📦 Componentes Principais

### Auth (Autenticação)

- **LoginComponent:** Formulário de login com validação
- **CadastroComponent:** Formulário de cadastro com confirmação de senha

### Biblioteca

- **BibliotecaComponent:** Lista de músicas do usuário
- **MusicaCardComponent:** Card individual de música com hover effects

### Search

- **SearchComponent:** Busca com debounce e categorias

### Planos

- **PlanosComponent:** Exibição de planos de assinatura

## 🔌 Integração com Backend (ASP.NET Core)

O projeto está preparado para integração com backend:

### Models

Todas as interfaces possuem DTOs correspondentes:

```typescript
// Exemplo: Musica
export interface Musica { ... }
export interface CriarMusicaDto { ... }
export interface AtualizarMusicaDto { ... }
```

### Services

Os services possuem métodos prontos para integração HTTP:

```typescript
// Exemplo: MusicaService
getMusicas(): Observable<Musica[]> {
  // TODO: return this.http.get<Musica[]>(`${this.apiUrl}`);
  return this.musicas$; // Mock atual
}
```

### Próximos Passos para Integração

1. **Configurar environment:**
   ```typescript
   // src/environments/environment.ts
   export const environment = {
     production: false,
     apiUrl: 'https://localhost:5001/api'
   };
   ```

2. **Implementar HttpClient nos services:**
   ```typescript
   constructor(private http: HttpClient) {}
   
   getMusicas(): Observable<Musica[]> {
     return this.http.get<Musica[]>(`${environment.apiUrl}/musicas`);
   }
   ```

3. **Criar HTTP Interceptor para tokens:**
   ```typescript
   // core/interceptors/auth.interceptor.ts
   export const authInterceptor: HttpInterceptorFn = (req, next) => {
     const token = localStorage.getItem('auth_token');
     if (token) {
       req = req.clone({
         setHeaders: { Authorization: `Bearer ${token}` }
       });
     }
     return next(req);
   };
   ```

4. **Implementar Guards para rotas protegidas:**
   ```typescript
   // core/guards/auth.guard.ts
   export const authGuard: CanActivateFn = (route, state) => {
     const authService = inject(AuthService);
     return authService.isAuthenticated() || inject(Router).createUrlTree(['/login']);
   };
   ```

## 🎯 Melhorias Implementadas

### Performance

- ✅ Lazy loading de rotas
- ✅ OnPush change detection
- ✅ TrackBy functions em listas
- ✅ Debounce em busca
- ✅ Bundle size otimizado

### Código

- ✅ Reactive Forms com validação
- ✅ RxJS para gerenciamento de estado
- ✅ Tipagem TypeScript forte
- ✅ Barrel exports para imports limpos
- ✅ Comentários e documentação

### UX/UI

- ✅ Design consistente e moderno
- ✅ Responsivo (mobile, tablet, desktop)
- ✅ Transições suaves
- ✅ Feedback visual em interações
- ✅ Estados de loading

## 📝 Scripts Disponíveis

```bash
npm start          # Desenvolvimento
npm run build      # Build de desenvolvimento
npm run build:prod # Build de produção
npm test           # Testes unitários
npm run lint       # Linter
```

## 🔧 Tecnologias Utilizadas

- **Angular 17+**
- **TypeScript 5.2+**
- **RxJS 7.8+**
- **CSS3** com variáveis customizadas

## 📄 Licença

Este projeto é privado e de uso educacional.

---

**Desenvolvido com ❤️ usando Angular**
