import { drizzle } from "drizzle-orm/node-postgres";
import { testTable } from "./schema/test";
/* import { seed, reset } from "drizzle-seed";
import { usersTable } from "./schema/users";
import { festiveEventTable } from "./schema/festiveEvent";
import { usersEventTable } from "./schema/usersEvents";
 */
export async function mainFixtures(db: ReturnType<typeof drizzle>) {
  //console.log("Pas de changements de la base de données");
  /* const first: typeof usersEventTable.$inferInsert = {
        id_user: 3,
        id_event: 1,
    }; 
  const second: typeof usersEventTable.$inferInsert = {
        id_user: 4,
        id_event: 1,
    }; 
    const third: typeof usersEventTable.$inferInsert = {
        id_user: 4,
        id_event: 2,
    };
    await db.insert(usersEventTable).values(first);
    await db.insert(usersEventTable).values(second);
    await db.insert(usersEventTable).values(third);
    console.log("Test usersEvents inserted into users_events table");  */

  /*const firstEvent: typeof festiveEventTable.$inferInsert = {
        title: 'Noël 2025',
        description: 'Noël en famille',
        id_owner: 3,
    }; 
  const secondEvent: typeof festiveEventTable.$inferInsert = {
        title: 'Anniv M',
        description: 'Pour organiser ses cadeaux',
        id_owner: 4,
    }; 
    await db.insert(festiveEventTable).values(firstEvent);
    await db.insert(festiveEventTable).values(secondEvent);
    console.log("Test event inserted into festiveEvent table"); */

  /* await reset(db, usersTable);
  await reset(db, testTable);
  console.log("Database reset completed."); */
  /* await seed(db, { users: usersTable }).refine(() => ({
    users: {
      count: 5,
    },
  }));
  await seed(db, { test: testTable }).refine(() => ({
    test: {
      count: 5,
    },
  })); */
  //await seed(db, { usersTable });
  /* const testUser: typeof usersTable.$inferInsert = {
        email: 'EmeriaFaelis@gmail.com',
        name: 'Emeria Faelis',
        password: 'securepassword123',
    }; 
    await db.insert(usersTable).values(testUser);
    console.log("Test user inserted into users table");*/
  const testText: typeof testTable.$inferInsert = {
    name: "Autre texte de test !",
  };
  await db.insert(testTable).values(testText);
  console.log("Test fixture inserted into test table");
}
