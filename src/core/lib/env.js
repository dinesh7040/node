export class env {
  static BASE_URL =
    process.env.HS_NODE_ENV == "development"
      ? process.env.DEV_BASE_URL
      : process.env.PROD_BASE_URL;
  static PORT = process.env.HS_PORT;
}
