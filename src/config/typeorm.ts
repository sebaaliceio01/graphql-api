import { createConnection } from "typeorm";

export async function connect() {
  await createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "graphqlapi",
    entities: ['src/entity/*.entity{.ts,.js}'],
    synchronize: true,
  });
  console.log('database is connected')
}
