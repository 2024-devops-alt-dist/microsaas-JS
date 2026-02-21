import { drizzle } from "drizzle-orm/node-postgres";
import { usersTable } from "./schema/users";
import { festiveEventTable } from "./schema/festiveEvent";
import { usersEventTable } from "./schema/usersEvents";
import { giftsTable } from "./schema/gifts";
import { commentsTable } from "./schema/comments";

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

async function giftsFixtures(db: ReturnType<typeof drizzle>) {
  const firstGift: typeof giftsTable.$inferInsert = {
    title: "Dealing with Dragons - Patricia C. Wrede",
    description:
      "Un roman géniale sur une princesse qui s'enfuit de chez elle pour se rendre chez les dragons",
    image_url:
      "https://images-na.ssl-images-amazon.com/images/I/51nqj8s9XlL._SX331_BO1,204,203,200_.jpg",
    product_link:
      "https://www.amazon.fr/Dealing-Dragons-1-Patricia-Wrede/dp/0786948607/ref=sr_1_1?crid=3Q9Z5X8KZ2G9&keywords=dealing+with+dragons&qid=1700000000&sprefix=dealing+with+dragons%2Caps%2C123&sr=8-1",
    id_wishing_user: 1,
    is_offered: false,
    multiple_gifters: false,
    id_author_user: 1,
  };
  await db.insert(giftsTable).values(firstGift);

  const secondGift: typeof giftsTable.$inferInsert = {
    title: "Switch 2",
    description: "La dernière version de la console Nintendo Switch",
    image_url: "https://example.com/switch-2.jpg",
    product_link: "https://www.nintendo.fr/Jeux/Nintendo-Switch-1280745.html",
    id_wishing_user: 2,
    is_offered: false,
    multiple_gifters: false,
    id_author_user: 2,
  };
  await db.insert(giftsTable).values(secondGift);

  const thirdGift: typeof giftsTable.$inferInsert = {
    title: "Chaussettes en laine",
    description: "Des chaussettes en laine pour garder les pieds au chaud",
    image_url: "https://example.com/chaussettes-laine.jpg",
    product_link:
      "https://www.amazon.fr/Chaussettes-Laine/dp/B07P6Y8Z5Z/ref=sr_1_1?crid=3Q9Z5X8KZ2G9&keywords=chaussettes+en+laine&qid=1700000000&sprefix=chaussettes+en+laine%2Caps%2C123&sr=8-1",
    id_wishing_user: 3,
    is_offered: false,
    multiple_gifters: false,
    id_author_user: 3,
  };
  await db.insert(giftsTable).values(thirdGift);

  const fourthGift: typeof giftsTable.$inferInsert = {
    title: "Coffret de thé",
    description: "Un coffret de thé pour les amateurs de thé",
    image_url: "https://example.com/coffret-the.jpg",
    product_link:
      "https://www.amazon.fr/Coffret-Thé/dp/B07P6Y8Z5Z/ref=sr_1_1?crid=3Q9Z5X8KZ2G9&keywords=coffret+de+thé&qid=1700000000&sprefix=coffret+de+thé%2Caps%2C123&sr=8-1",
    id_wishing_user: 4,
    is_offered: false,
    multiple_gifters: false,
    id_author_user: 4,
  };
  await db.insert(giftsTable).values(fourthGift);

  const fifthGift: typeof giftsTable.$inferInsert = {
    title: "Forêt mixte Dartmoor",
    description:
      "Le jeu de société qui suit le Forêt mixte classique, mais sur la lande du Dartmoor.",
    image_url: "https://example.com/foret-mixte-dartmoor.jpg",
    product_link:
      "https://www.amazon.fr/Forêt-Mixte-Dartmoor/dp/B07P6Y8Z5Z/ref=sr_1_1?crid=3Q9Z5X8KZ2G9&keywords=forêt+mixte+dartmoor&qid=1700000000&sprefix=forêt+mixte+dartmoor%2Caps%2C123&sr=8-1",
    id_wishing_user: 5,
    is_offered: false,
    multiple_gifters: false,
    id_author_user: 5,
  };
  await db.insert(giftsTable).values(fifthGift);

  const sixthGift: typeof giftsTable.$inferInsert = {
    title: "LEGO Botanical Collection - 10289",
    description: "Un set LEGO de collection botanique",
    image_url: "https://example.com/lego-botanical-collection-10289.jpg",
    product_link:
      "https://www.lego.com/fr-fr/product/botanical-collection-10289",
    id_wishing_user: 6,
    is_offered: false,
    multiple_gifters: false,
    id_author_user: 6,
  };
  await db.insert(giftsTable).values(sixthGift);

  const seventhGift: typeof giftsTable.$inferInsert = {
    title: "Dune Imperium Insurrection",
    description: "Le dernier jeu de la série Dune Imperium",
    image_url: "https://example.com/dune-imperium-insurrection.jpg",
    product_link:
      "https://www.amazon.fr/Dune-Imperium-Insurrection/dp/B07P6Y8Z5Z/ref=sr_1_1?crid=3Q9Z5X8KZ2G9&keywords=dune+imperium+insurrection&qid=1700000000&sprefix=dune+imperium+insurrection%2Caps%2C123&sr=8-1",
    id_wishing_user: 7,
    is_offered: false,
    multiple_gifters: false,
    id_author_user: 7,
  };
  await db.insert(giftsTable).values(seventhGift);

  console.log("7 test gifts inserted into gifts table");
}

async function commentsFixture(db: ReturnType<typeof drizzle>) {
  const firstComment: typeof commentsTable.$inferInsert = {
    message: "J'ai hâte de recevoir ce livre !",
    id_user: 1,
    id_gift: 1,
    is_public: true,
    timestamp: new Date(),
    is_edited: false,
    timestamp_edited: null,
  };
  await db.insert(commentsTable).values(firstComment);

  const secondComment: typeof commentsTable.$inferInsert = {
    message: "Ce jeu a l'air super !",
    id_user: 2,
    id_gift: 2,
    is_public: true,
    timestamp: new Date(),
    is_edited: false,
    timestamp_edited: null,
  };
  await db.insert(commentsTable).values(secondComment);

  console.log("2 test comments inserted into comments table");
}

export async function mainFixtures(db: ReturnType<typeof drizzle>) {
  //console.log("Pas de changements de la base de données");
  await usersFixtures(db);
  await festiveEventFixtures(db);
  await usersEventsFixtures(db);
  await giftsFixtures(db);
  await commentsFixture(db);

  console.log("All fixtures have been inserted");
}
