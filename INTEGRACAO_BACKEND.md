# Guia de Integração com Backend ASP.NET Core

Este documento descreve como integrar o frontend Angular com um backend ASP.NET Core.

## 📋 Índice

1. [Estrutura do Backend Esperada](#estrutura-do-backend-esperada)
2. [Configuração do Frontend](#configuração-do-frontend)
3. [Endpoints da API](#endpoints-da-api)
4. [Autenticação JWT](#autenticação-jwt)
5. [Exemplos de Controllers](#exemplos-de-controllers)
6. [CORS](#cors)
7. [Tratamento de Erros](#tratamento-de-erros)

---

## 1. Estrutura do Backend Esperada

### Models C# Correspondentes

```csharp
// Models/Musica.cs
public class Musica
{
    public int Id { get; set; }
    public string Titulo { get; set; }
    public string Artista { get; set; }
    public string? Album { get; set; }
    public string Genero { get; set; }
    public int? Duracao { get; set; }
    public string? ImagemUrl { get; set; }
    public string? AudioUrl { get; set; }
    public int? AnoLancamento { get; set; }
    public DateTime DataCriacao { get; set; }
    public DateTime DataAtualizacao { get; set; }
}

// DTOs/CriarMusicaDto.cs
public class CriarMusicaDto
{
    [Required]
    public string Titulo { get; set; }
    
    [Required]
    public string Artista { get; set; }
    
    public string? Album { get; set; }
    
    [Required]
    public string Genero { get; set; }
    
    public int? Duracao { get; set; }
    public string? ImagemUrl { get; set; }
    public string? AudioUrl { get; set; }
    public int? AnoLancamento { get; set; }
}

// Models/Usuario.cs
public class Usuario
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string? ImagemPerfilUrl { get; set; }
    public int? PlanoId { get; set; }
    public Plano? Plano { get; set; }
    public DateTime DataCriacao { get; set; }
    public DateTime DataAtualizacao { get; set; }
}

// Models/Plano.cs
public class Plano
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Descricao { get; set; }
    public decimal Preco { get; set; }
    public List<string> Beneficios { get; set; }
    public bool Ativo { get; set; }
}
```

---

## 2. Configuração do Frontend

### Passo 1: Criar Environments

```bash
# Criar arquivo de environment
mkdir src/environments
```

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api'
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.seudominio.com/api'
};
```

### Passo 2: Atualizar Services

```typescript
// core/services/musica.service.ts
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MusicaService {
  private readonly apiUrl = `${environment.apiUrl}/musicas`;

  constructor(private http: HttpClient) {}

  getMusicas(): Observable<Musica[]> {
    return this.http.get<Musica[]>(this.apiUrl);
  }

  getMusicaPorId(id: number): Observable<Musica> {
    return this.http.get<Musica>(`${this.apiUrl}/${id}`);
  }

  adicionarMusica(dto: CriarMusicaDto): Observable<Musica> {
    return this.http.post<Musica>(this.apiUrl, dto);
  }

  atualizarMusica(id: number, dto: AtualizarMusicaDto): Observable<Musica> {
    return this.http.put<Musica>(`${this.apiUrl}/${id}`, dto);
  }

  removerMusica(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  buscarMusicas(termo: string): Observable<Musica[]> {
    return this.http.get<Musica[]>(`${this.apiUrl}/buscar`, {
      params: { termo }
    });
  }
}
```

### Passo 3: Criar HTTP Interceptor

```typescript
// core/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token');
  
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  return next(req);
};

// Registrar no app.config.ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // ...
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};
```

### Passo 4: Criar Error Interceptor

```typescript
// core/interceptors/error.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(error => {
      if (error.status === 401) {
        // Redirecionar para login
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
      
      return throwError(() => error);
    })
  );
};
```

---

## 3. Endpoints da API

### Autenticação

```
POST   /api/auth/login
POST   /api/auth/cadastro
POST   /api/auth/refresh
POST   /api/auth/logout
```

### Músicas

```
GET    /api/musicas
GET    /api/musicas/{id}
GET    /api/musicas/buscar?termo={termo}
GET    /api/musicas/genero/{genero}
POST   /api/musicas
PUT    /api/musicas/{id}
DELETE /api/musicas/{id}
```

### Planos

```
GET    /api/planos
GET    /api/planos/{id}
POST   /api/planos
PUT    /api/planos/{id}
DELETE /api/planos/{id}
```

### Usuários

```
GET    /api/usuarios/perfil
PUT    /api/usuarios/perfil
PUT    /api/usuarios/senha
```

---

## 4. Autenticação JWT

### Backend - Program.cs

```csharp
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Configurar JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

builder.Services.AddAuthorization();
```

### Backend - appsettings.json

```json
{
  "Jwt": {
    "Key": "SuaChaveSecretaMuitoSegura123!@#",
    "Issuer": "MusicStreamingAPI",
    "Audience": "MusicStreamingApp",
    "ExpiresInMinutes": 60
  }
}
```

### Backend - AuthController.cs

```csharp
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly UserManager<Usuario> _userManager;

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email);
        
        if (user == null || !await _userManager.CheckPasswordAsync(user, dto.Senha))
        {
            return Unauthorized(new { message = "Email ou senha inválidos" });
        }

        var token = GenerateJwtToken(user);

        return Ok(new AuthResponse
        {
            Token = token,
            Usuario = new UsuarioDto
            {
                Id = user.Id,
                Nome = user.Nome,
                Email = user.Email
            },
            ExpiresIn = 3600
        });
    }

    private string GenerateJwtToken(Usuario user)
    {
        var securityKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Nome)
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(
                int.Parse(_configuration["Jwt:ExpiresInMinutes"])),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
```

---

## 5. Exemplos de Controllers

### MusicasController.cs

```csharp
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class MusicasController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public MusicasController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Musica>>> GetMusicas()
    {
        return await _context.Musicas.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Musica>> GetMusica(int id)
    {
        var musica = await _context.Musicas.FindAsync(id);

        if (musica == null)
        {
            return NotFound();
        }

        return musica;
    }

    [HttpGet("buscar")]
    public async Task<ActionResult<IEnumerable<Musica>>> BuscarMusicas([FromQuery] string termo)
    {
        return await _context.Musicas
            .Where(m => m.Titulo.Contains(termo) || 
                       m.Artista.Contains(termo) || 
                       m.Genero.Contains(termo))
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Musica>> CriarMusica(CriarMusicaDto dto)
    {
        var musica = new Musica
        {
            Titulo = dto.Titulo,
            Artista = dto.Artista,
            Album = dto.Album,
            Genero = dto.Genero,
            Duracao = dto.Duracao,
            ImagemUrl = dto.ImagemUrl,
            AudioUrl = dto.AudioUrl,
            AnoLancamento = dto.AnoLancamento,
            DataCriacao = DateTime.UtcNow,
            DataAtualizacao = DateTime.UtcNow
        };

        _context.Musicas.Add(musica);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetMusica), new { id = musica.Id }, musica);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> AtualizarMusica(int id, AtualizarMusicaDto dto)
    {
        var musica = await _context.Musicas.FindAsync(id);

        if (musica == null)
        {
            return NotFound();
        }

        if (dto.Titulo != null) musica.Titulo = dto.Titulo;
        if (dto.Artista != null) musica.Artista = dto.Artista;
        if (dto.Album != null) musica.Album = dto.Album;
        if (dto.Genero != null) musica.Genero = dto.Genero;
        if (dto.Duracao.HasValue) musica.Duracao = dto.Duracao;
        if (dto.ImagemUrl != null) musica.ImagemUrl = dto.ImagemUrl;
        if (dto.AudioUrl != null) musica.AudioUrl = dto.AudioUrl;
        if (dto.AnoLancamento.HasValue) musica.AnoLancamento = dto.AnoLancamento;
        
        musica.DataAtualizacao = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletarMusica(int id)
    {
        var musica = await _context.Musicas.FindAsync(id);

        if (musica == null)
        {
            return NotFound();
        }

        _context.Musicas.Remove(musica);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
```

---

## 6. CORS

### Program.cs

```csharp
var builder = WebApplication.CreateBuilder(args);

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

var app = builder.Build();

// Usar CORS
app.UseCors("AllowAngularApp");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
```

---

## 7. Tratamento de Erros

### Backend - GlobalExceptionHandler.cs

```csharp
public class GlobalExceptionHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        var response = new
        {
            error = exception.Message,
            type = exception.GetType().Name
        };

        httpContext.Response.StatusCode = exception switch
        {
            NotFoundException => StatusCodes.Status404NotFound,
            UnauthorizedAccessException => StatusCodes.Status401Unauthorized,
            ValidationException => StatusCodes.Status400BadRequest,
            _ => StatusCodes.Status500InternalServerError
        };

        await httpContext.Response.WriteAsJsonAsync(response, cancellationToken);

        return true;
    }
}

// Registrar no Program.cs
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
```

### Frontend - Error Handling

```typescript
// core/services/musica.service.ts
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

getMusicas(): Observable<Musica[]> {
  return this.http.get<Musica[]>(this.apiUrl).pipe(
    catchError(error => {
      console.error('Erro ao buscar músicas:', error);
      return throwError(() => new Error('Falha ao carregar músicas'));
    })
  );
}
```

---

## ✅ Checklist de Integração

- [ ] Criar models no backend correspondentes aos do frontend
- [ ] Configurar Entity Framework e migrations
- [ ] Implementar controllers com endpoints REST
- [ ] Configurar autenticação JWT
- [ ] Configurar CORS
- [ ] Criar environments no frontend
- [ ] Atualizar services para usar HttpClient
- [ ] Implementar interceptors (auth e error)
- [ ] Testar endpoints com Postman/Swagger
- [ ] Integrar frontend com backend
- [ ] Implementar tratamento de erros
- [ ] Adicionar loading states nos componentes
- [ ] Testar fluxo completo de autenticação
- [ ] Testar CRUD de músicas
- [ ] Deploy do backend
- [ ] Atualizar environment.prod.ts com URL de produção

---

**Pronto para integração!** 🚀
