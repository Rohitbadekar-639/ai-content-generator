import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_nLJNyAR5Xb3l@ep-tiny-scene-a1c218tz-pooler.ap-southeast-1.aws.neon.tech/AI-Content-Generator?sslmode=require";
const sql = neon(databaseUrl);
export const db = drizzle(sql, { schema });
