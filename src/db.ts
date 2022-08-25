import { Pool, PoolClient, QueryResult } from "pg";
import { HandledError } from "src/error";
import checkEnvVarExists from "src/utils/env-variables";

const env = process.env.NODE_ENV || "development";

const { DB_USER, DB_HOST, DB_DATABASE, DB_PASS, DB_PORT } = process.env;

checkEnvVarExists(["DB_PORT"]);

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASS,
  port: parseInt(DB_PORT!),
  // ssl: env === "development" ? null : { rejectUnauthorized: false },
});

export { pool };

const handleError = (err: any) => {
  console.log("--- DB ERROR ---");
  if (typeof err !== "object") return HandledError.unknownError();
  if (err.errno === -61) {
    console.log("could not connect to database");
    return HandledError.knownErr(5);
  }
  if (err.code) {
    console.log(err.message);
    console.log("code:", err.code);
    return HandledError.knownErr(6);
  }
  return HandledError.unknownError();
};

export const query = async <T>(
  query: {
    text: string;
    values: any[];
  },
  client?: PoolClient
): Promise<QueryResult<T>> => {
  try {
    let querySource: Pool | PoolClient = pool;
    if (client) querySource = client;
    return await querySource.query<T>(query);
  } catch (error) {
    throw handleError(error);
  }
};

export const transaction = async (
  func: (client: PoolClient) => Promise<void>
): Promise<{ success: boolean; error: any }> => {
  let client: PoolClient;
  try {
    client = await pool.connect();
  } catch (error) {
    console.log("CAUGHT ERROR ON CLIENT CONNECTION");
    return { success: false, error: handleError(error) };
  }

  let fail = false;
  let error: HandledError | undefined = undefined;
  try {
    await client.query("BEGIN");
    await func(client);
    await client.query("COMMIT");
  } catch (e: any) {
    console.log("TRANSACTION ERROR");
    if (e.errno !== -61) {
      await client.query("ROLLBACK");
    }
    fail = true;
    error = handleError(e);
  } finally {
    client.release();
    return { success: !fail, error };
  }
};
