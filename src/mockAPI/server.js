import { Server } from "miragejs";
import { progressbar } from "./fixtures/progressbar";

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment: environment,
    fixtures: {
      progressStack: progressbar,
    },

    seeds(server) {
      server.loadFixtures();
    },

    routes() {
      this.namespace = "/api/v1";
      //this.timing = 5000;
      this.get("/progress-stack", (schema) => {
        return schema.db.progressStack[0];
      });
    },
  });
  return server;
}
