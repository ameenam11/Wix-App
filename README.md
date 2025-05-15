# Ameen's Custom Products Catalog App

This project is a Wix-based React application that provides store owners with a custom dashboard to manage their Wix Stores catalog. It includes functionality for viewing, creating, and deleting products, and offers a dedicated interface for discounting the most expensive product that hasn’t yet been discounted.

The app was scaffolded using [`@wix/create-app`](https://www.npmjs.com/package/@wix/create-app).  
For more details on how Wix apps work, see the [Wix CLI for Apps documentation](https://dev.wix.com/docs/build-apps/developer-tools/cli/get-started/about-the-wix-cli-for-apps).

## Features

- List and manage products directly from the dashboard
- Add new products through a custom modal interface
- Delete individual or multiple products using built-in toolbar actions
- Display the most expensive product using a dashboard plugin
- Apply a percentage-based discount through a dedicated page

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/ameens-app.git
cd ameens-app
```

### Install Dependencies

```bash
npm install
```

### Link to a Wix Development Site

When prompted during development, follow the instructions to link the app to your Wix test site.

## Running the App Locally

To start the local development environment:

```bash
npm run dev
```

This will open the app within your development site in the Wix Studio editor. Changes you make will automatically reflect in real time.

## Building for Production

To generate a production-ready build:

```bash
npm run build
```

This prepares the app for deployment through the Wix App Builder.

## Technologies Used

- React
- TypeScript
- Wix CLI
- Wix Design System
- Wix Patterns
- Wix Stores SDK

## License

This project is intended for educational and demonstration purposes. You are welcome to use and adapt the code for your own projects.
