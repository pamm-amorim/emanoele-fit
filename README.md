# Treino da Emanoele

PWA mobile-first em HTML, CSS e JavaScript puro, feita para GitHub Pages. O app alterna automaticamente os treinos A e B, registra séries e repetições, mostra vídeos, possui cronômetro de descanso e histórico.

## O que já funciona

- recomendação automática do próximo treino com base no último concluído;
- treino A/B de corpo inteiro, adequado a 3–4 sessões semanais;
- aquecimento de 3 minutos;
- registro de cada série e repetição;
- cronômetro de descanso configurável;
- vídeos do YouTube ou demonstrações visuais carregados sob demanda;
- conclusão parcial ou total do treino;
- histórico semanal e total;
- persistência local imediata;
- sincronização opcional com Supabase usando autenticação anônima e RLS;
- PWA para adicionar à tela inicial do iPhone;
- exportação de backup em JSON.

## Rodar localmente

O service worker exige HTTP/HTTPS. Na pasta do projeto, rode:

```bash
python3 -m http.server 8080
```

Abra `http://localhost:8080`.

## Configurar o Supabase

1. Crie um projeto gratuito no Supabase.
2. No painel, abra **SQL Editor** e execute `supabase.sql`.
3. Em **Authentication → Providers**, ative **Anonymous Sign-Ins**.
4. Em **Project Settings → API**, copie a URL do projeto e a chave anon/publishable.
5. Preencha `config.js`:

```js
window.APP_CONFIG = {
  SUPABASE_URL: "https://SEU-PROJETO.supabase.co",
  SUPABASE_ANON_KEY: "SUA_CHAVE_ANON_OU_PUBLISHABLE"
};
```

A chave pública pode ficar no frontend. A proteção dos dados é feita pelas políticas RLS do banco. Nunca use a `service_role` no navegador.

### Limitação da conta anônima

Não há tela de login. A sessão fica salva no navegador, mas não pode ser recuperada em outro aparelho se o armazenamento for apagado. Use a exportação de backup ou, futuramente, migre para link mágico por e-mail.

## Publicar no GitHub Pages

1. Crie um repositório e envie todos os arquivos.
2. Vá em **Settings → Pages**.
3. Selecione **Deploy from a branch**, branch `main`, pasta `/root`.
4. Abra a URL publicada no Safari do iPhone.
5. Toque em **Compartilhar → Adicionar à Tela de Início**.

Os caminhos do manifest, service worker, ícones e demais arquivos são relativos à
raiz da aplicação. Assim, eles funcionam tanto em domínio próprio quanto no
subdiretório padrão do Pages (`/emanoele-fit/`). O arquivo `.nojekyll` mantém a
publicação estritamente estática.

## Estrutura

- `index.html`: shell do aplicativo.
- `styles.css`: interface mobile-first.
- `workouts.js`: exercícios, repetições, instruções e vídeos.
- `app.js`: navegação, timers, persistência e Supabase.
- `supabase.sql`: tabelas, índices, RLS e triggers.
- `manifest.webmanifest` e `service-worker.js`: instalação como PWA.

## Ajustar treino ou vídeos

Edite `workouts.js`. Cada exercício possui:

- `sets`, `target` e `defaultReps`;
- `bandType`: `curto`, `longo` ou `nenhum`;
- `steps`, `cues` e `mistakes`;
- `videoId` e, opcionalmente, `videoStart`; ou `videoUrl` para abrir uma demonstração externa.

## Observação de saúde

O programa é uma sugestão geral para uma adulta sem dor ou restrição informada. Técnica e progressão individual podem ser ajustadas por profissional de educação física. Dor aguda, tontura, falta de ar intensa ou mal-estar são sinais para interromper a sessão.

## Ajuste mais recente

Os treinos foram reorganizados por grupos musculares para permitir a alternância em dias seguidos. O treino A trabalha ombros, peito, tríceps, quadríceps e panturrilhas; o treino B trabalha costas, bíceps, glúteos e posteriores de coxa. A estrutura permanece com seis exercícios, três blocos e duas séries por exercício, sem exigir ponto fixo para ancoragem dos elásticos.
