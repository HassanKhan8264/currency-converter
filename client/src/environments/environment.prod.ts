
export const environment = {
  appName: "currency_converter",
  production: true,
  HOST: "https://api.freecurrencyapi.com/v1/latest/",
  getUrl() {
    return `${this.HOST}`;
  },
};
