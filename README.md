# Modelos de sites para advocacia e organizações de impacto

Catálogo estático de modelos feito com React, TypeScript e Vite. A galeria permite comparar sites completos usando o conteúdo de `src/site.ts`. Não há backend, armazenamento no navegador ou serviço externo de formulário/imagens.

## Como rodar

```sh
npm install
npm run dev
```

Valide a versão de produção com `npm run build`.

## Catálogo de modelos

A galeria abre por padrão e permite pré-visualizar e escolher um modelo. Cada opção tem uma estrutura, hierarquia de informação e ferramentas próprias — não são apenas variações de cores.

| `theme.template` | Modelo | Estrutura e recursos |
| --- | --- | --- |
| `editorial` | Editorial | Abertura fotográfica dividida, apresentação institucional, áreas em índice, impacto, equipe e contato. |
| `mosaic` | Mosaico | Página em blocos tipo bento, com atalhos, indicadores e serviços expansíveis em acordeão. |
| `journal` | Revista de impacto | Capa editorial, narrativa longa, indicadores antes da matéria, índice de atuação e equipe em linhas. |
| `community` | Rede comunitária | Diretório pesquisável de integrantes, serviços em acordeão e jornada orientada a encontrar ajuda. |
| `campaign` | Campanha | Abertura-manifesto em tela cheia, passos de atuação numerados e chamadas de contato destacadas. |

As pré-visualizações e a escolha na galeria duram apenas até recarregar a página; não são armazenadas. Para aplicar uma escolha no projeto do cliente, edite `theme.template` em `src/site.ts`. Para publicar diretamente esse site sem o catálogo, defina também `theme.showGallery: false`. Para voltar à galeria, use `true`.

A galeria começa com `showGallery: true` para facilitar a comparação. O modelo selecionado no código funciona como escolha inicial. O botão de tema claro/escuro acompanha o sistema por padrão e pode ser alternado manualmente durante a sessão.

## Conteúdo e seções

Edite `src/site.ts` para personalizar organização, slogan, navegação, apresentação, áreas, métricas, integrantes e contato. Os modelos reutilizam esses dados, mas os dispõem de maneiras diferentes. Campos opcionais ou variantes existentes:

- `hero.imageSrc` e `hero.imageAlt`: imagem e descrição do banner/capa;
- `logo`: imagem opcional usada no cabeçalho e rodapé; sem ela, aparece a inicial da organização;
- `team.variant`: cartões (`portraits`), lista compacta (`list`) ou várias equipes (`groups`);
- `image` opcional em cada integrante para adicionar sua foto;
- `contact.variant`: formulário que abre um rascunho de e-mail (`form`) ou contato direto (`direct`).

Copie imagens autorizadas e otimizadas para `public/images/` e use caminhos como `/images/banner-cliente.webp`. O `alt` deve descrever a imagem.

### Formulários e recursos interativos

O formulário usa validação nativa e `mailto:`: abre um rascunho no aplicativo de e-mail, sem enviar nem armazenar dados no site. O modelo Mosaico tem acordeões HTML nativos; a Rede Comunitária oferece busca local por pessoa, equipe ou área. A busca só filtra os dados já carregados na página.

## Tema, paleta e acessibilidade

Em `theme.palette`, personalize nove cores para os modos claro e escuro: `background`, `surface`, `surfaceAlt`, `text`, `muted`, `primary`, `onPrimary`, `border` e `accent`. `theme.mode` aceita `system`, `light` ou `dark`; o visitante também tem um controle no cabeçalho. O modo manual não é persistido.

Use combinações com contraste suficiente, principalmente para texto, botões, links e foco. Os layouts são responsivos, mantêm HTML semântico, incluem link para pular ao conteúdo e respeitam a preferência de movimento reduzido.

## Publicar no GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` compila e publica o site quando há `push` para `main`; também pode ser iniciado manualmente pela aba **Actions**. Ele usa `npm ci` e publica apenas o diretório `dist`, com permissões limitadas. As Actions são fixadas por SHA, o checkout não persiste credenciais e o Dependabot propõe atualizações de Actions e npm.

Configuração inicial:

1. Envie o repositório para o GitHub na branch `main`.
2. Em **Settings → Pages → Build and deployment**, selecione **GitHub Actions** como origem.
3. Aguarde o workflow **Deploy static site to GitHub Pages** terminar; a URL publicada aparece no job de deploy e em **Settings → Pages**.

O Vite detecta o nome do repositório durante o build do Actions e define automaticamente o caminho de projeto (`/<repositório>/`). Para um repositório `conta.github.io`, usa a raiz. Os caminhos das imagens próprias também recebem o prefixo correto. Se a branch principal tiver outro nome, atualize o gatilho `push.branches` no workflow.

Para reverter uma publicação, reverta o commit e envie a alteração; o workflow fará um novo deploy. Não é necessário configurar segredo ou chave de publicação.

## Antes de publicar

Atualize título e descrição em `index.html`; confirme nome, grafia, contatos, imagens, links, textos legais e métricas com o cliente. O conteúdo de demonstração é fictício e deve ser revisado por profissionais habilitados. Faça uma revisão em celular e desktop e execute `npm run build`.
