import postgres from "postgres";
const url = process.env.DATABASE_URL as string;

export default postgres(url, { ssl: true });
