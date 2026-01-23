import { drizzle } from "drizzle-orm/node-postgres";
import { testTable } from "./schema/testSchema";
import { usersTable } from "./schema/users";
import { festiveEventTable } from "./schema/festiveEvent";
import { usersEventTable } from "./schema/usersEvents";

async function testFixtures(db: ReturnType<typeof drizzle>) {
  const testText: typeof testTable.$inferInsert = {
    name: "La base de données est bien connectée !",
  };
  await db.insert(testTable).values(testText);
  console.log("Test fixture inserted into test table");
}

async function usersFixtures(db: ReturnType<typeof drizzle>) {
  const firstUser: typeof usersTable.$inferInsert = {
    email: "alizee.beaupre@gmail.com",
    name: "Alizée Beaupré",
    password: "securepassword123",
  };
  await db.insert(usersTable).values(firstUser);

  const secundUser: typeof usersTable.$inferInsert = {
    email: "celeste.delmare@gmail.com",
    name: "Céleste DelMare",
    password: "securepassword123",
  };
  await db.insert(usersTable).values(secundUser);

  const thirdUser: typeof usersTable.$inferInsert = {
    email: "emeria.faravel@gmail.com",
    name: "Emeria Faravel",
    password: "securepassword123",
  };
  await db.insert(usersTable).values(thirdUser);

  const fourthdUser: typeof usersTable.$inferInsert = {
    email: "gali.hauban@gmail.com",
    name: "Gali Hauban",
    password: "securepassword123",
  };
  await db.insert(usersTable).values(fourthdUser);

  const fifthUser: typeof usersTable.$inferInsert = {
    email: "inaya.jacobsen@gmail.com",
    name: "Inaya Jacobsen",
    password: "securepassword123",
  };
  await db.insert(usersTable).values(fifthUser);

  const sixthUser: typeof usersTable.$inferInsert = {
    email: "keren.lagertha@gmail.com",
    name: "Keren Lagertha",
    password: "securepassword123",
  };
  await db.insert(usersTable).values(sixthUser);

  const seventhUser: typeof usersTable.$inferInsert = {
    email: "moryan.norse@gmail.com",
    name: "Moryan Norse",
    password: "securepassword123",
  };
  await db.insert(usersTable).values(seventhUser);

  const eighthUser: typeof usersTable.$inferInsert = {
    email: "ornella.polaris@gmail.com",
    name: "Ornella Polaris",
    password: "securepassword123",
  };
  await db.insert(usersTable).values(eighthUser);

  const ninthUser: typeof usersTable.$inferInsert = {
    email: "quentin.ressac@gmail.com",
    name: "Quentin Ressac",
    password: "securepassword123",
  };
  await db.insert(usersTable).values(ninthUser);

  const tenthUser: typeof usersTable.$inferInsert = {
    email: "sama.taraudan@gmail.com",
    name: "Sama Taraudan",
    password: "securepassword123",
  };
  await db.insert(usersTable).values(tenthUser);

  const eleventhUser: typeof usersTable.$inferInsert = {
    email: "ursula.vasco@gmail.com",
    name: "Ursula Vasco",
    password: "securepassword123",
  };
  await db.insert(usersTable).values(eleventhUser);

  const twelfthUser: typeof usersTable.$inferInsert = {
    email: "will.xaviera@gmail.com",
    name: "Will Xaviera",
    password: "securepassword123",
  };
  await db.insert(usersTable).values(twelfthUser);

  const thirteenthUser: typeof usersTable.$inferInsert = {
    email: "yue.zephyr@gmail.com",
    name: "Yué Zéphyr",
    password: "securepassword123",
  };
  await db.insert(usersTable).values(thirteenthUser);
  console.log("13 test users inserted into users table");
}

async function festiveEventFixtures(db: ReturnType<typeof drizzle>) {
  const firstEvent: typeof festiveEventTable.$inferInsert = {
    title: "Noël 2025",
    description: "Noël en famille",
    id_owner: 1,
  };
  await db.insert(festiveEventTable).values(firstEvent);

  const secondEvent: typeof festiveEventTable.$inferInsert = {
    title: "Anniv Moryan",
    description: "Pour organiser ses cadeaux",
    id_owner: 2,
  };
  await db.insert(festiveEventTable).values(secondEvent);

  const thirdEvent: typeof festiveEventTable.$inferInsert = {
    title: "Anniv Keren",
    description: `C'est la fête !`,
    id_owner: 6,
  };
  await db.insert(festiveEventTable).values(thirdEvent);

  const fourthEvent: typeof festiveEventTable.$inferInsert = {
    title: "le Noël des zamis",
    description: `Bloup bloup bloup`,
    id_owner: 13,
  };

  await db.insert(festiveEventTable).values(fourthEvent);

  const fifthEvent: typeof festiveEventTable.$inferInsert = {
    title: "Thèse Gali",
    description: `Fêtons ça comme il se doit !`,
    id_owner: 4,
  };
  await db.insert(festiveEventTable).values(fifthEvent);

  const sixthEvent: typeof festiveEventTable.$inferInsert = {
    title: "Festival",
    description: `Ambiance garantie`,
    id_owner: 7,
  };
  await db.insert(festiveEventTable).values(sixthEvent);

  const seventhEvent: typeof festiveEventTable.$inferInsert = {
    title: "Anniv Ursula",
    description: `Chut ! C'est une surprise !`,
    id_owner: 8,
  };
  await db.insert(festiveEventTable).values(seventhEvent);

  const eighthEvent: typeof festiveEventTable.$inferInsert = {
    title: "Mariage Gali et Yué !",
    description: `Musique et danse toute la nuit !`,
    id_owner: 13,
  };
  await db.insert(festiveEventTable).values(eighthEvent);

  console.log("8 test events inserted into festiveEvent table");
}

async function usersEventsFixtures(db: ReturnType<typeof drizzle>) {
  const firstUserEvent: typeof usersEventTable.$inferInsert = {
    id_user: 1,
    id_event: 1,
  };
  await db.insert(usersEventTable).values(firstUserEvent);

  const secundUserEvent: typeof usersEventTable.$inferInsert = {
    id_user: 2,
    id_event: 1,
  };
  await db.insert(usersEventTable).values(secundUserEvent);

  const thirdUserEvent: typeof usersEventTable.$inferInsert = {
    id_user: 3,
    id_event: 2,
  };
  await db.insert(usersEventTable).values(thirdUserEvent);

  const fourthUserEvent: typeof usersEventTable.$inferInsert = {
    id_user: 4,
    id_event: 2,
  };
  await db.insert(usersEventTable).values(fourthUserEvent);

  const fifthUserEvent: typeof usersEventTable.$inferInsert = {
    id_user: 5,
    id_event: 3,
  };
  await db.insert(usersEventTable).values(fifthUserEvent);

  const sixthUserEvent: typeof usersEventTable.$inferInsert = {
    id_user: 6,
    id_event: 3,
  };
  await db.insert(usersEventTable).values(sixthUserEvent);

  const seventhUserEvent: typeof usersEventTable.$inferInsert = {
    id_user: 7,
    id_event: 4,
  };
  await db.insert(usersEventTable).values(seventhUserEvent);

  const eighthUserEvent: typeof usersEventTable.$inferInsert = {
    id_user: 8,
    id_event: 4,
  };
  await db.insert(usersEventTable).values(eighthUserEvent);

  const ninthUserEvent: typeof usersEventTable.$inferInsert = {
    id_user: 9,
    id_event: 5,
  };
  await db.insert(usersEventTable).values(ninthUserEvent);

  const tenthUserEvent: typeof usersEventTable.$inferInsert = {
    id_user: 10,
    id_event: 5,
  };
  await db.insert(usersEventTable).values(tenthUserEvent);

  const eleventhUserEvent: typeof usersEventTable.$inferInsert = {
    id_user: 11,
    id_event: 6,
  };
  await db.insert(usersEventTable).values(eleventhUserEvent);

  const twelfthUserEvent: typeof usersEventTable.$inferInsert = {
    id_user: 12,
    id_event: 6,
  };
  await db.insert(usersEventTable).values(twelfthUserEvent);

  const thirteenthUserEvent: typeof usersEventTable.$inferInsert = {
    id_user: 13,
    id_event: 7,
  };
  await db.insert(usersEventTable).values(thirteenthUserEvent);

  const fourteenthUserEvent: typeof usersEventTable.$inferInsert = {
    id_user: 1,
    id_event: 8,
  };
  await db.insert(usersEventTable).values(fourteenthUserEvent);

  const fifteenthUserEvent: typeof usersEventTable.$inferInsert = {
    id_user: 4,
    id_event: 8,
  };
  await db.insert(usersEventTable).values(fifteenthUserEvent);

  const sixteenthUserEvent: typeof usersEventTable.$inferInsert = {
    id_user: 13,
    id_event: 8,
  };
  await db.insert(usersEventTable).values(sixteenthUserEvent);

  const seventeenthUserEvent: typeof usersEventTable.$inferInsert = {
    id_user: 8,
    id_event: 7,
  };
  await db.insert(usersEventTable).values(seventeenthUserEvent);

  const eighteenthUserEvent: typeof usersEventTable.$inferInsert = {
    id_user: 6,
    id_event: 3,
  };
  await db.insert(usersEventTable).values(eighteenthUserEvent);

  const nineteenthUserEvent: typeof usersEventTable.$inferInsert = {
    id_user: 2,
    id_event: 1,
  };
  await db.insert(usersEventTable).values(nineteenthUserEvent);

  const twentiethUserEvent: typeof usersEventTable.$inferInsert = {
    id_user: 5,
    id_event: 2,
  };
  await db.insert(usersEventTable).values(twentiethUserEvent);

  console.log("20 test user-event relations inserted into usersEvent table");
}

export async function mainFixtures(db: ReturnType<typeof drizzle>) {
  //console.log("Pas de changements de la base de données");

  await testFixtures(db);
  await usersFixtures(db);
  await festiveEventFixtures(db);
  await usersEventsFixtures(db);

  console.log("All fixtures have been inserted");
}
