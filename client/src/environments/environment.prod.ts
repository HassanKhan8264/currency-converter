// src/environments/environment.prod.ts
export const environment = {
  appName: "currency_converter",
  production: true,
  server: {
    self: {
      HOST: "https://currency-converter-eta-seven.vercel.app",
      getUrl() {
        return `${this.HOST}`;
      },
    },
  },
};
