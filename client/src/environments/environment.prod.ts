
export const environment = {
  appName: "currency_converter",
  production: true,
  HOST: "",
  getUrl() {
    return `${this.HOST}`;
  },
};
