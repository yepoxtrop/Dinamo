import { config } from "process";

config();

export const db_user = process.env.DB_USER;
export const db_password = process.env.DB_PASSWORD="20102006"
export const db_name = process.env.DB_NAME="Dinamo"
export const db_host = process.env.DB_HOST="localhost:1433"