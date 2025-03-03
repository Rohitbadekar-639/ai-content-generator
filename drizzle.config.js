/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.tsx",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_nLJNyAR5Xb3l@ep-tiny-scene-a1c218tz-pooler.ap-southeast-1.aws.neon.tech/AI-Content-Generator?sslmode=require",
  },
};
