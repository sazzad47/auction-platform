import serverConfig from "./server.json";

export const server = pointServer();

function pointServer() {
  if (typeof window !== "undefined") {
    if (
      location.hostname === "localhost" ||
      location.hostname === "127.0.0.1"
    ) {
      return serverConfig.dev_server.HOST;
    } else {
      return serverConfig.prod_server.HOST;
    }
  }
}
