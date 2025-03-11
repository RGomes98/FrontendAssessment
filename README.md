# Desafio Técnico - Frontend - EADSKILL

## To Do:

- Finalizar e revisar os testes.
- Resetar a paginação nas operações de `CREATE`, `DELETE` e `UPDATE`.
- Organizar a estrutura do app e modularizar os componentes.
- Revisar o custom hook `usePagination`: centralizar a lógica de paginação.
- Revisar o custom hook `useProductActions`: eliminar `spread operators` e a recriação desnecessária de objetos/arrays.
- Revisar o custom hook `useSortProducts`: remover possíveis `side effects`.
- Revisar o custom hook `useSelect` e as funções utilitárias de `searchParams`: rever a abordagem do reset da paginação.
- Revisar o custom hook `usePendingState`.
- Revisar o custom hook `useGetThumbnail`: remover a checagem desnecessária do `imgSrc`.
- Reavaliar a gestão do estado global de `products` e `fetchProducts`.
- Revisar o service `getAllProducts`: garantir que a estrutura dos dados esteja correta antes de realizar qualquer manipulação, e criar uma função genérica para abstrair o processo de `fetch`.
- Aprimorar o modal de visualização do produto.

## Requisitos

Antes de iniciar, certifique-se de ter os seguintes requisitos atendidos:

- **Node.js** (versão 18 ou superior) instalado.
- **npm** (ou yarn) instalado.
- **Arquivo `.env.local`** configurado corretamente.

## Instalação

1. Instale o Node.js caso ainda não tenha:
   - Baixe e instale a versão recomendada do Node.js no [site oficial](https://nodejs.org/).
2. Verifique se o Node.js e o npm estão instalados corretamente:

   ```sh
   node -v  # Deve exibir a versão do Node.js
   npm -v   # Deve exibir a versão do npm
   ```

3. Clone o repositório e instale as dependências:
   ```sh
   git clone https://github.com/RGomes98/FrontendAssessment.git
   cd FrontendAssessment
   npm install
   ```

## Configuração do Ambiente

Se necessário, crie um arquivo `.env.local` na raiz do projeto e configure as variáveis necessárias. Um exemplo pode ser:

```env.local
API_URL="https://fakestoreapi.com"
```

Certifique-se de preencher corretamente os valores conforme o ambiente.

## Executando o Projeto

Para rodar o projeto localmente:

```sh
npm run dev
```

O aplicativo será iniciado em [`http://localhost:3000`](http://localhost:3000).

## Testes

Para rodar os testes:

```sh
npm run test
```

## Observação

Caso o Next.js falhe ao baixar as **fonts** do Google Fonts, reinicie o ambiente de desenvolvimento utilizando **Ctrl + C** para parar o processo atual e execute novamente o comando:

```sh
npm run dev
```
