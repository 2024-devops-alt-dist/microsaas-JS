import { drizzle } from "drizzle-orm/node-postgres";
import { seed, reset } from "drizzle-seed";
import { usersTable } from "./schema/users";
import { testTable } from "./schema/test";

export async function mainFixtures(db: ReturnType<typeof drizzle>) {
  await reset(db, usersTable);
  await reset(db, testTable);
  console.log("Database reset completed.");
  await seed(db, { users: usersTable }).refine(() => ({
    users: {
      count: 5,
    },
  }));
  await seed(db, { test: testTable }).refine(() => ({
    test: {
      count: 5,
    },
  }));
  //await seed(db, { usersTable });
  /* const testUser: typeof usersTable.$inferInsert = {
        email: 'EmeriaFaelis@gmail.com',
        name: 'Emeria Faelis',
        password: 'securepassword123',
    }; 
    await db.insert(usersTable).values(testUser);
    console.log("Test user inserted into users table");*/
  /*  const testText: typeof testTable.$inferInsert = {
    name: 'Autre texte de test !',
    };
    await db.insert(testTable).values(testText);
    console.log("Test fixture inserted into test table"); */
}
