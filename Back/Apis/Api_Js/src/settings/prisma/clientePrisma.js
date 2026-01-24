import "dotenv/config";
import { PrismaMssql } from '@prisma/adapter-mssql';
import { PrismaClient } from '../generated/prisma/client';

import { db_user, db_password, db_host, db_name } from "./variablesPrisma.js";

const sqlConfig = {
  user: db_user,
  password: db_password,
  database: db_name,
  server: db_host,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
}

const adapter = new PrismaMssql(sqlConfig)
const clientePrisma = new PrismaClient({ adapter });

export default clientePrisma; 