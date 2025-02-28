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
   git clone https://github.com/RGomes98/FrontendAssignment.git
   cd FrontendAssignment
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
npm test
```
