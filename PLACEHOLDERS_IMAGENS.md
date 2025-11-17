# Guia de Placeholders de Imagens

Documentação sobre o sistema de placeholders de capas de músicas implementado no projeto.

---

## 🎨 Placeholders Implementados

O projeto utiliza **placeholders coloridos** do serviço [Placeholder.com](https://placeholder.com/) para simular capas de álbuns durante o desenvolvimento.

### Músicas com Placeholders

Cada música possui uma cor única para facilitar identificação visual:

| # | Música | Artista | Cor | Preview |
|---|--------|---------|-----|---------|
| 1 | Billie Jean | Michael Jackson | 🟣 Roxo (`#8B008B`) | [Ver](https://via.placeholder.com/300x300/8B008B/FFFFFF?text=Billie+Jean) |
| 2 | Bohemian Rhapsody | Queen | 🔴 Vermelho (`#DC143C`) | [Ver](https://via.placeholder.com/300x300/DC143C/FFFFFF?text=Bohemian+Rhapsody) |
| 3 | Smells Like Teen Spirit | Nirvana | 🔵 Azul Royal (`#4169E1`) | [Ver](https://via.placeholder.com/300x300/4169E1/FFFFFF?text=Nirvana) |
| 4 | Imagine | John Lennon | 🟢 Verde Água (`#20B2AA`) | [Ver](https://via.placeholder.com/300x300/20B2AA/FFFFFF?text=Imagine) |
| 5 | Hotel California | Eagles | 🟠 Laranja (`#FF8C00`) | [Ver](https://via.placeholder.com/300x300/FF8C00/FFFFFF?text=Hotel+California) |
| 6 | Stairway to Heaven | Led Zeppelin | 🟤 Marrom (`#8B4513`) | [Ver](https://via.placeholder.com/300x300/8B4513/FFFFFF?text=Led+Zeppelin) |
| 7 | Like a Rolling Stone | Bob Dylan | ⚫ Cinza Escuro (`#2F4F4F`) | [Ver](https://via.placeholder.com/300x300/2F4F4F/FFFFFF?text=Bob+Dylan) |
| 8 | Hey Jude | The Beatles | 🩷 Rosa (`#FF1493`) | [Ver](https://via.placeholder.com/300x300/FF1493/FFFFFF?text=The+Beatles) |
| 9 | Sweet Child O Mine | Guns N' Roses | 🟠 Laranja Avermelhado (`#FF4500`) | [Ver](https://via.placeholder.com/300x300/FF4500/FFFFFF?text=Guns+N+Roses) |
| 10 | Purple Rain | Prince | 🟣 Roxo Médio (`#9370DB`) | [Ver](https://via.placeholder.com/300x300/9370DB/FFFFFF?text=Purple+Rain) |
| 11 | Thriller | Michael Jackson | 🔴 Vermelho Puro (`#FF0000`) | [Ver](https://via.placeholder.com/300x300/FF0000/FFFFFF?text=Thriller) |
| 12 | Wonderwall | Oasis | 🔵 Azul Dodger (`#1E90FF`) | [Ver](https://via.placeholder.com/300x300/1E90FF/FFFFFF?text=Wonderwall) |
| 13 | Lose Yourself | Eminem | 🟡 Dourado (`#FFD700`) | [Ver](https://via.placeholder.com/300x300/FFD700/000000?text=Lose+Yourself) |
| 14 | Shape of You | Ed Sheeran | 🩵 Turquesa (`#00CED1`) | [Ver](https://via.placeholder.com/300x300/00CED1/FFFFFF?text=Shape+of+You) |
| 15 | Für Elise | Beethoven | 🟣 Índigo (`#4B0082`) | [Ver](https://via.placeholder.com/300x300/4B0082/FFFFFF?text=Fur+Elise) |

---

## 🔧 Como Funciona

### 1. Service (musica.service.ts)

Cada música possui uma propriedade `imagemUrl` com o placeholder:

```typescript
{
  id: 1,
  titulo: 'Billie Jean',
  artista: 'Michael Jackson',
  imagemUrl: 'https://via.placeholder.com/300x300/8B008B/FFFFFF?text=Billie+Jean',
  // ...
}
```

### 2. Componente (musica-card.component.ts)

O componente possui fallback caso a imagem não exista:

```typescript
get imagemUrl(): string {
  return this.musica.imagemUrl || 
    'https://via.placeholder.com/300x300/1DB954/FFFFFF?text=Sem+Capa';
}
```

### 3. Template (musica-card.component.html)

A imagem é renderizada com lazy loading:

```html
<img
  [src]="imagemUrl"
  [alt]="'Capa de ' + musica.titulo"
  loading="lazy"
/>
```

---

## 🎨 Formato do Placeholder

### URL Pattern

```
https://via.placeholder.com/{largura}x{altura}/{cor_fundo}/{cor_texto}?text={texto}
```

### Exemplo

```
https://via.placeholder.com/300x300/1DB954/FFFFFF?text=Billie+Jean
```

**Parâmetros:**
- `300x300` - Dimensões (quadrado)
- `1DB954` - Cor de fundo (verde Spotify)
- `FFFFFF` - Cor do texto (branco)
- `text=Billie+Jean` - Texto exibido

---

## 🔄 Substituir por Imagens Reais

### Opção 1: Imagens Locais

```typescript
// 1. Adicionar imagens em src/assets/images/albums/
// 2. Atualizar service:

imagemUrl: 'assets/images/albums/billie-jean.jpg'
```

### Opção 2: URLs Externas

```typescript
// Usar URLs de CDN ou API:
imagemUrl: 'https://i.scdn.co/image/ab67616d0000b273...'
```

### Opção 3: API Spotify

```typescript
// Integrar com Spotify Web API:
getMusicas(): Observable<Musica[]> {
  return this.http.get<SpotifyResponse>('...')
    .pipe(
      map(tracks => tracks.map(track => ({
        // ...
        imagemUrl: track.album.images[1].url
      })))
    );
}
```

---

## 📊 Vantagens dos Placeholders

### ✅ Desenvolvimento
- **Rápido:** Não precisa baixar/armazenar imagens
- **Leve:** Não aumenta bundle size
- **Visual:** Cores ajudam a identificar músicas
- **Profissional:** Interface completa sem assets reais

### ✅ Testes
- **Consistente:** Sempre carrega
- **Sem dependências:** Não precisa de storage
- **Customizável:** Fácil mudar cores/texto

---

## 🚀 Próximos Passos

### Para Produção

1. **Integrar com API de Música**
   - Spotify Web API
   - Last.fm API
   - MusicBrainz

2. **Implementar Upload de Capas**
   - Backend ASP.NET Core
   - Storage (S3, Azure Blob)
   - Validação de imagens

3. **Otimizar Imagens**
   - Compressão (WebP)
   - Múltiplos tamanhos (thumbnail, médio, grande)
   - CDN para distribuição

---

## 🎯 Testando os Placeholders

### 1. Executar o Projeto

```bash
npm start
```

### 2. Navegar para Biblioteca

```
http://localhost:4200/biblioteca
```

### 3. Ver os Cards

Você verá 15 cards coloridos com:
- ✅ Cores únicas por música
- ✅ Texto identificador
- ✅ Hover effects
- ✅ Botão de play

### 4. Testar Busca

```
http://localhost:4200/search
```

Digite "Michael" para ver:
- Billie Jean (roxo)
- Thriller (vermelho)

---

## 🎨 Customizar Cores

Para mudar a cor de uma música:

```typescript
// musica.service.ts
{
  id: 1,
  titulo: 'Billie Jean',
  imagemUrl: 'https://via.placeholder.com/300x300/FF00FF/000000?text=Billie+Jean'
  //                                            ^^^^^^ ^^^^^^
  //                                            Fundo  Texto
}
```

**Cores sugeridas:**
- `#1DB954` - Verde Spotify
- `#FF0000` - Vermelho
- `#0000FF` - Azul
- `#FFD700` - Dourado
- `#9370DB` - Roxo

---

## 📝 Exemplo de Uso Completo

```typescript
// Adicionar nova música com placeholder
adicionarMusica({
  titulo: 'Blinding Lights',
  artista: 'The Weeknd',
  album: 'After Hours',
  genero: 'Pop',
  duracao: 200,
  imagemUrl: 'https://via.placeholder.com/300x300/FF0080/FFFFFF?text=Blinding+Lights',
  anoLancamento: 2020
});
```

**Resultado:**
- Card rosa vibrante
- Texto "Blinding Lights" em branco
- Tamanho 300x300px

---

## 🐛 Troubleshooting

### Imagem não carrega
- Verificar URL no console
- Confirmar conexão com internet
- Testar URL diretamente no navegador

### Imagem distorcida
- Usar sempre formato quadrado (300x300)
- Verificar CSS do card

### Texto cortado
- Usar `+` para espaços: `Billie+Jean`
- Limitar tamanho do texto

---

## ✅ Checklist

- [x] 15 músicas com placeholders coloridos
- [x] Fallback para músicas sem imagem
- [x] Lazy loading implementado
- [x] Alt text para acessibilidade
- [x] Cores únicas e identificáveis
- [ ] Substituir por imagens reais (futuro)
- [ ] Integrar com API (futuro)
- [ ] Upload de capas (futuro)

---

**Placeholders prontos para teste!** 🎨

Execute `npm start` e navegue para `/biblioteca` para ver os cards coloridos em ação!
