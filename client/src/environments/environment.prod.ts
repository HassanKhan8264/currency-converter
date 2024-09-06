// src/environments/environment.prod.ts
export const environment = {
  appName: "currency_converter",
  production: true,
  server: {
    self: {
      HOST: "https://example.com",
      getUrl() {
        return `${this.HOST}`;
      },
    },
  },
};
