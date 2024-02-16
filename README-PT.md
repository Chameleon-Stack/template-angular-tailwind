# CHAMELEON STACK - KANBAN

Este projeto é uma solução de Kanban desenvolvida com Angular CLI versão 16.2.10, destinada a equipes de desenvolvimento que buscam uma ferramenta adaptável e eficiente para gestão de tarefas.

### 📋 PRÉ-REQUISITOS

- NodeJs
- NPM
- Angular CLI

## 🔧 INSTALANDO PRÉ-REQUISITOS

### Instalando o NodeJS e NPM

- Acesse [Node.js](https://nodejs.org/en) e faça o download da versão LTS.
- Siga o processo de instalação clicando em next até finalizar.
- No terminal, verifique as versões instaladas com os comandos:
```
node -v
npm -v
```

### Instalando o Angular CLI

- Instale o Angular CLI globalmente com o comando:

```
npm install -g @angular/cli
```

- Verifique a versão instalada com o comando:

```
ng --version
```

## ⚙️ CONFIGURANDO O PROJETO

- Clone o repositório e instale as dependências:

```
git clone git@github.com:Chameleon-Stack/template-angular-tailwind.git
cd template-angular-tailwind
npm install
```

- Execute o servidor de desenvolvimento:

```
ng serve
```

- Acesse `http://localhost:4200/` no navegador.

## ⚙️ Configurando os Arquivos de Ambiente

Os arquivos de ambiente estão localizados em `src/environments/`. Existem dois arquivos de exemplo:

- `environment.ts`: para desenvolvimento
- `environment.prod.ts`: para produção

Você precisa configurar esses arquivos de acordo com o seu ambiente. Aqui está um exemplo de como você pode configurar `environment.ts`:

```typescript
export const environment = {
production: false,
apiBaseUrl: "http://localhost:3000/api",
};
```

E aqui está um exemplo de como você pode configurar `environment.prod.ts`:

```typescript
export const environment = {
production: true,
apiBaseUrl: "https://api.example.com",
};
```

## 🛠 BUILD

- Execute o comando para construir o projeto:

```
ng build
```

- Os artefatos serão armazenados no diretório `dist/`.

## 📦 DEPLOY

- Execute o comando para construir o projeto:

```
ng build --prod
```

- Os artefatos serão armazenados no diretório `dist/`.

# template-angular-tailwind
