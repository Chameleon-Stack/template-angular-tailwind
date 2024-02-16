# CHAMELEON STACK - KANBAN

This project is a Kanban solution developed with Angular CLI version 16.2.10, aimed at development teams looking for an adaptable and efficient task management tool.

### 📋 PREREQUISITES

- NodeJs
- NPM
- Angular CLI

## 🔧 INSTALLING PREREQUISITES

### Installing NodeJS and NPM

- Visit [Node.js](https://nodejs.org/en) and download the LTS version.
- Follow the installation process by clicking next until it finishes.
- In the terminal, check the installed versions with the commands:

```
node -v
npm -v
```

### Installing Angular CLI

- Install Angular CLI globally with the command:

```
npm install -g @angular/cli
```

- Check the installed version with the command:

```
ng --version
```

## ⚙️ CONFIGURING THE PROJECT

- Clone the repository and install the dependencies:

```
git clone git@github.com:Chameleon-Stack/template-angular-tailwind.git
cd template-angular-tailwind
npm install
```

- Run the development server:

```
ng serve
```

- Access `http://localhost:4200/` in the browser.

## ⚙️ Configuring Environment Files

The environment files are located in `src/environments/`. There are two example files:

- `environment.ts`: for development
- `environment.prod.ts`: for production

You need to configure these files according to your environment. Here is an example of how you can configure `environment.ts`:

```typescript
export const environment = {
production: false,
apiBaseUrl: "http://localhost:3000/api",
};
```

And here is an example of how you can configure `environment.prod.ts`:

```typescript
export const environment = {
production: true,
apiBaseUrl: "https://api.example.com",
};
```

## 🛠 BUILD

- Run the command to build the project:

```
ng build
```

- The artifacts will be stored in the `dist/` directory.

## 📦 DEPLOY

- Run the command to build the project for production:

```
ng build --prod
```

- The artifacts will be stored in the `dist/` directory.

# template-angular-tailwind
