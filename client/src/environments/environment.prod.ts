
export const environment = {
  appName: "currency_converter",
  production: true,
  HOST: "https://currency-converter-eta-seven.vercel.app/",
  getUrl() {
    return `${this.HOST}`;
  },
};
