import "reflect-metadata";
import { startServer } from "./app";
import { connect } from "./config/typeorm";
import { addAlias } from 'module-alias'
import { Container } from "typeorm-typedi-extensions";
import { useContainer } from "typeorm";

async function main() {
  connect();
  const app = await startServer();
  app.listen(3000);
  console.log("Server on port", 3000);
}
addAlias('@', __dirname )
useContainer(Container)

main();
