# Front-End Vanilla para Consumo de API — UniFECAF

Projeto acadêmico desenvolvido por **Lucas Souza** para praticar HTML5, CSS3 e JavaScript nativo no consumo de uma API pública.

A aplicação apresenta um portfólio pessoal com uma atividade interativa integrada: um explorador de personagens que consulta a **The Rick and Morty API**, cria cards dinamicamente e permite buscar, filtrar e navegar pelos resultados.

## Objetivo

Desenvolver uma aplicação web estática e responsiva, sem frameworks ou bibliotecas externas, utilizando Fetch API para consultar dados e JavaScript nativo para manipular o DOM.

## Funcionalidades

- Apresentação de Lucas Souza e link para seu GitHub.
- Carregamento de personagens diretamente da API.
- Cards com imagem, nome, status, espécie, origem e última localização.
- Busca por nome e filtro por status: vivo, morto ou desconhecido.
- Paginação e botão para limpar os filtros.
- Mensagens de carregamento, resultados vazios e falhas de conexão.
- Nova tentativa em caso de erro e limite de 15 segundos por consulta.
- Cancelamento de consultas anteriores para evitar resultados fora de ordem.
- Layout responsivo, navegação por teclado e mensagens acessíveis.
- Carregamento de imagens sob demanda com `loading="lazy"`.

## Tecnologias

| Tecnologia | Aplicação |
| --- | --- |
| HTML5 | Estrutura semântica da página |
| CSS3 | Layout com Grid e Flexbox, tema visual e responsividade |
| JavaScript ES6+ | Eventos, filtros, paginação e criação dinâmica de cards |
| Fetch API | Requisições com `fetch()`, `.then()` e `.catch()` |

O projeto não depende de Node.js, npm, frameworks ou bibliotecas externas.

## Estrutura do projeto

```text
frontend-consumo-api-unifecaf/
├── README.md
├── index.html
├── css/
│   └── style.css
└── js/
    └── script.js
```

- **`index.html`**: estrutura do portfólio, formulário e container inicialmente vazio para os personagens.
- **`css/style.css`**: estilos e adaptações para diferentes tamanhos de tela.
- **`js/script.js`**: consultas à API, tratamento de respostas e atualização do DOM.

Os cards são criados exclusivamente pelo JavaScript com `document.createElement()`, `append()` e `appendChild()`. Não há cards estáticos no HTML base.

## Como executar

1. Clone o repositório:

   ```bash
   git clone https://github.com/souzarlucas/frontend-consumo-api-unifecaf.git
   cd frontend-consumo-api-unifecaf
   ```

2. Abra o arquivo **`index.html`** em um navegador atualizado.
3. Mantenha a conexão com a internet ativa para carregar os dados e as imagens.

Não é necessário instalar dependências ou executar uma etapa de compilação.

Opcionalmente, caso tenha Python 3 instalado, utilize um servidor local:

```bash
python3 -m http.server 8000
```

Depois, acesse `http://localhost:8000`. Para encerrar o servidor, pressione `Ctrl+C`.

## Como usar

1. Acesse a seção do projeto na página.
2. Digite um nome e, se desejar, selecione um status.
3. Clique em **Buscar** ou pressione Enter no campo de busca.
4. Use **Anterior** e **Próxima** para navegar pelas páginas.
5. Clique em **Limpar** para voltar à consulta inicial.

## API utilizada

Endpoint de personagens:

```text
https://rickandmortyapi.com/api/character/
```

As consultas utilizam os parâmetros `page`, `name` e `status`. Os dados e as imagens dependem da disponibilidade do serviço externo. O projeto não inclui backend ou banco de dados próprio.

Referência: [documentação oficial da The Rick and Morty API](https://rickandmortyapi.com/documentation/).

## Autor

**Lucas Souza** · Projeto acadêmico UniFECAF

[Perfil no GitHub](https://github.com/souzarlucas) · [Repositório do projeto](https://github.com/souzarlucas/frontend-consumo-api-unifecaf)
