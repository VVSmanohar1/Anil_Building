import db from "../db/index";

export interface DBUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export const createUser = async (
  name: string,
  email: string,
  passwordHash: string
): Promise<{ id: number }> => {
  const result = await db.query(
    `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id
    `,
    [name, email, passwordHash]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email: string): Promise<DBUser | null> => {
  const result = await db.query(
    `
      SELECT id, name, email, password
      FROM users
      WHERE email = $1
    `,
    [email]
  );
  return result.rows[0] || null;
};
