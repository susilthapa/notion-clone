import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import * as schema from "@/migrations/schema";

dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  console.log("Can not find database url");
}

const client = postgres(process.env.DATABASE_URL as string, { max: 1 });
const db = drizzle(client, { schema });
const migrateDb = async () => {
  try {
    console.log("Migrating client");
    await migrate(db, { migrationsFolder: "migrations" });
    console.log("Successfully migrated");
  } catch (error) {
    console.log("Failed to migrate");
  }
};
migrateDb();
export default db;
