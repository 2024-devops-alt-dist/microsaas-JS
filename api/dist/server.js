"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value,
      })
    : (obj[key] = value);
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === "object") || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (
  (target = mod != null ? __create(__getProtoOf(mod)) : {}),
  __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule
      ? __defProp(target, "default", { value: mod, enumerable: true })
      : target,
    mod,
  )
);
var __toCommonJS = (mod) =>
  __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/server.ts
var server_exports = {};
__export(server_exports, {
  db: () => db,
});
module.exports = __toCommonJS(server_exports);
var import_dotenv = __toESM(require("dotenv"));
var import_node_postgres = require("drizzle-orm/node-postgres");

// src/db/config.ts
var import_pg = require("pg");
var useDatabaseUrl = Boolean(process.env.DATABASE_URL);
var dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : void 0;
var pool = new import_pg.Pool(
  useDatabaseUrl
    ? {
        connectionString: process.env.DATABASE_URL,
        max: 20,
        idleTimeoutMillis: 3e4,
        connectionTimeoutMillis: 2e3,
      }
    : {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: dbPort,
        max: 20,
        idleTimeoutMillis: 3e4,
        connectionTimeoutMillis: 2e3,
      },
);

// src/app.ts
var import_express5 = __toESM(require("express"));
var import_cors = __toESM(require("cors"));
var import_fs = __toESM(require("fs"));
var import_process2 = require("process");

// src/config/uploads.ts
var import_path = __toESM(require("path"));
var import_process = require("process");
var uploadsDirectory = import_path.default.resolve(
  process.cwd(),
  import_process.env.UPLOADS_DIR || "uploads",
);

// src/routes/users.ts
var import_express = require("express");

// src/services/usersService.ts
var usersService = {
  getAllUsers: async () => {
    const data = await pool.query("SELECT * FROM users");
    return data.rows;
  },
  getUserById: async (id) => {
    const data = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (data.rows.length === 0) {
      return null;
    }
    return data.rows[0];
  },
  getUserByEmail: async (email) => {
    const data = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (data.rows.length === 0) {
      return null;
    }
    return data.rows[0];
  },
  createUser: async (email, name, password) => {
    const data = await pool.query(
      "INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING *",
      [email, name, password],
    );
    return data.rows[0];
  },
  updateUser: async (id, email, name, password) => {
    const data = await pool.query(
      "UPDATE users SET email = $1, name = $2, password = $3 WHERE id = $4 RETURNING *",
      [email, name, password, id],
    );
    if (data.rows.length === 0) {
      return null;
    }
    return data.rows[0];
  },
  deleteUser: async (id) => {
    const data = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id],
    );
    if (data.rows.length === 0) {
      return null;
    }
    return data.rows[0];
  },
};

// src/controllers/users.ts
var usersController = {
  getAll: async (req, res) => {
    try {
      const data = await usersService.getAllUsers();
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await usersService.getUserById(Number(id));
      if (!data) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
  create: async (req, res) => {
    try {
      const { email, name, password } = req.body;
      const data = await usersService.createUser(email, name, password);
      res.status(201).json({ data });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { email, name, password } = req.body;
      const data = await usersService.updateUser(
        Number(id),
        email,
        name,
        password,
      );
      if (!data) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await usersService.deleteUser(Number(id));
      if (!data) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
};

// src/middleware/auth.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var JWT_SECRET = process.env.JWT_SECRET || "secret";
function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = header.split(" ")[1];
  try {
    const payload = import_jsonwebtoken.default.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// src/routes/users.ts
var router = (0, import_express.Router)();
router.use(authenticate);
router.get("/", usersController.getAll);
router.get("/:id", usersController.getById);
router.post("/", usersController.create);
router.put("/:id", usersController.update);
router.delete("/:id", usersController.delete);

// src/routes/auth.ts
var import_express2 = require("express");

// src/services/authService.ts
var import_crypto = require("crypto");
var import_util = require("util");
var import_jsonwebtoken2 = __toESM(require("jsonwebtoken"));
var scrypt = (0, import_util.promisify)(import_crypto.scrypt);
var JWT_SECRET2 = process.env.JWT_SECRET || "secret";
var TOKEN_LIFETIME = "1h";
var authService = {
  register: async (email, password, name) => {
    const salt = (0, import_crypto.randomBytes)(16).toString("hex");
    const derivedKey = await scrypt(password, salt, 64);
    const hashedPassword = `${salt}:${derivedKey.toString("hex")}`;
    const created = await usersService.createUser(email, name, hashedPassword);
    return created;
  },
  login: async (email, password) => {
    const user = await usersService.getUserByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const [salt, key] = user.password.split(":");
    const derived = await scrypt(password, salt, 64);
    if (derived.toString("hex") !== key) {
      throw new Error("Invalid credentials");
    }
    const token = import_jsonwebtoken2.default.sign(
      { id: user.id, email: user.email },
      JWT_SECRET2,
      {
        expiresIn: TOKEN_LIFETIME,
      },
    );
    return token;
  },
  refresh: async (token) => {
    try {
      const payload = import_jsonwebtoken2.default.verify(token, JWT_SECRET2);
      const _a = payload,
        { iat, exp } = _a,
        rest = __objRest(_a, ["iat", "exp"]);
      const newToken = import_jsonwebtoken2.default.sign(rest, JWT_SECRET2, {
        expiresIn: TOKEN_LIFETIME,
      });
      return newToken;
    } catch (e) {
      throw new Error("Invalid token");
    }
  },
};

// src/controllers/auth.ts
var authController = {
  register: async (req, res) => {
    try {
      const { email, password, username } = req.body;
      if (!email || !password || !username) {
        return res
          .status(400)
          .json({ message: "email, password and username required" });
      }
      const user = await authService.register(email, password, username);
      const token = await authService.login(email, password);
      const { id, name } = user;
      res.status(201).json({ data: { id, email, name }, token });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "email and password required" });
      }
      const token = await authService.login(email, password);
      res.status(200).json({ token });
    } catch (e) {
      res.status(401).json({ message: "invalid credentials" });
    }
  },
  refresh: async (req, res) => {
    try {
      const { token } = req.body;
      if (!token) {
        return res.status(400).json({ message: "token required" });
      }
      const newToken = await authService.refresh(token);
      res.status(200).json({ token: newToken });
    } catch (e) {
      res.status(401).json({ message: "invalid token" });
    }
  },
};

// src/routes/auth.ts
var router2 = (0, import_express2.Router)();
router2.post("/register", authController.register);
router2.post("/login", authController.login);
router2.post("/refresh", authController.refresh);

// src/routes/festiveEvent.ts
var import_express3 = require("express");

// src/services/festiveEventService.ts
var festiveEventService = {
  getAllEvents: async () => {
    const data = await pool.query("SELECT * FROM festive_event");
    return data.rows;
  },
  getEventById: async (id) => {
    const data = await pool.query("SELECT * FROM festive_event WHERE id = $1", [
      id,
    ]);
    if (data.rows.length === 0) {
      return null;
    }
    return data.rows[0];
  },
  getEventsForParticipant: async (userId) => {
    const data = await pool.query(
      `SELECT DISTINCT fe.*
       FROM festive_event fe
       INNER JOIN users_events ue ON ue.id_event = fe.id
       WHERE ue.id_user = $1
       ORDER BY fe.id ASC`,
      [userId],
    );
    return data.rows;
  },
  getParticipantsForEvent: async (eventId) => {
    const data = await pool.query(
      `WITH event_participants AS (
         SELECT DISTINCT ue.id_user
         FROM users_events ue
         WHERE ue.id_event = $1
       )
       SELECT
         u.id,
         u.name,
         COALESCE(
           json_agg(
             json_build_object(
               'id', g.id,
               'title', g.title,
               'description', g.description,
               'image_url', g.image_url,
               'product_link', g.product_link,
               'is_offered', g.is_offered,
               'multiple_gifters', g.multiple_gifters,
               'offering_user_ids', COALESCE(
                 (
                   SELECT json_agg(ug.id_user ORDER BY ug.id_user)
                   FROM users_gifts ug
                   WHERE ug.id_gift = g.id
                 ),
                 '[]'::json
               )
             )
             ORDER BY g.id
           ) FILTER (WHERE g.id IS NOT NULL),
           '[]'::json
         ) AS gifts
       FROM event_participants ep
       INNER JOIN users u ON u.id = ep.id_user
       LEFT JOIN gifts g ON g.id_wishing_user = u.id
       GROUP BY u.id, u.name
       ORDER BY u.name ASC`,
      [eventId],
    );
    return data.rows;
  },
  createEvent: async (title, description, id_owner) => {
    const data = await pool.query(
      "INSERT INTO festive_event (title, description, id_owner) VALUES ($1, $2, $3) RETURNING *",
      [title, description, id_owner],
    );
    return data.rows[0];
  },
  updateEvent: async (id, title, description, id_owner) => {
    const data = await pool.query(
      "UPDATE festive_event SET title = $1, description = $2, id_owner = $3 WHERE id = $4 RETURNING *",
      [title, description, id_owner, id],
    );
    if (data.rows.length === 0) {
      return null;
    }
    return data.rows[0];
  },
  deleteEvent: async (id) => {
    const data = await pool.query(
      "DELETE FROM festive_event WHERE id = $1 RETURNING *",
      [id],
    );
    if (data.rows.length === 0) {
      return null;
    }
    return data.rows[0];
  },
};

// src/controllers/festiveEvent.ts
var festiveEventController = {
  getMine: async (req, res) => {
    var _a;
    try {
      const userId = (_a = req.user) == null ? void 0 : _a.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const data = await festiveEventService.getEventsForParticipant(userId);
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
  getAll: async (req, res) => {
    try {
      const data = await festiveEventService.getAllEvents();
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await festiveEventService.getEventById(Number(id));
      if (!data) {
        return res.status(404).json({ message: "Festive event not found" });
      }
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
  getParticipants: async (req, res) => {
    try {
      const { id } = req.params;
      const eventId = Number(id);
      if (!eventId) {
        return res.status(400).json({ message: "Invalid festive event id" });
      }
      const event = await festiveEventService.getEventById(eventId);
      if (!event) {
        return res.status(404).json({ message: "Festive event not found" });
      }
      const data = await festiveEventService.getParticipantsForEvent(eventId);
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
  create: async (req, res) => {
    try {
      const { title, description, id_owner } = req.body;
      const data = await festiveEventService.createEvent(
        title,
        description,
        id_owner,
      );
      res.status(201).json({ data });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, id_owner } = req.body;
      const data = await festiveEventService.updateEvent(
        Number(id),
        title,
        description,
        id_owner,
      );
      if (!data) {
        return res.status(404).json({ message: "Festive event not found" });
      }
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await festiveEventService.deleteEvent(Number(id));
      if (!data) {
        return res.status(404).json({ message: "Festive event not found" });
      }
      res.status(200).json({ message: "Festive event deleted" });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
};

// src/routes/festiveEvent.ts
var router3 = (0, import_express3.Router)();
router3.get("/mine", authenticate, festiveEventController.getMine);
router3.get("/", festiveEventController.getAll);
router3.get("/:id/participants", festiveEventController.getParticipants);
router3.get("/:id", festiveEventController.getById);
router3.post("/", festiveEventController.create);
router3.put("/:id", festiveEventController.update);
router3.delete("/:id", festiveEventController.delete);

// src/routes/gifts.ts
var import_express4 = require("express");

// src/services/giftsService.ts
var giftsService = {
  getAll: async () => {
    const data = await pool.query("SELECT * FROM gifts");
    return data.rows;
  },
  getById: async (id) => {
    const data = await pool.query("SELECT * FROM gifts WHERE id = $1", [id]);
    if (data.rows.length === 0) {
      return null;
    }
    return data.rows[0];
  },
  create: async (
    title,
    description,
    image_url,
    product_link,
    id_wishing_user,
    is_offered,
    multiple_gifters,
    id_author_user,
  ) => {
    const data = await pool.query(
      "INSERT INTO gifts (title, description, image_url, product_link, id_wishing_user, is_offered, multiple_gifters, id_author_user) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        title,
        description,
        image_url,
        product_link,
        id_wishing_user,
        is_offered,
        multiple_gifters,
        id_author_user,
      ],
    );
    return data.rows[0];
  },
  update: async (
    id,
    title,
    description,
    image_url,
    product_link,
    id_wishing_user,
    is_offered,
    multiple_gifters,
    id_author_user,
  ) => {
    const data = await pool.query(
      "UPDATE gifts SET title = $1, description = $2, image_url = $3, product_link = $4, id_wishing_user = $5, is_offered = $6, multiple_gifters = $7, id_author_user = $8 WHERE id = $9 RETURNING *",
      [
        title,
        description,
        image_url,
        product_link,
        id_wishing_user,
        is_offered,
        multiple_gifters,
        id_author_user,
        id,
      ],
    );
    if (data.rows.length === 0) {
      return null;
    }
    return data.rows[0];
  },
  updateOfferedStatus: async (id, is_offered) => {
    const data = await pool.query(
      "UPDATE gifts SET is_offered = $1 WHERE id = $2 RETURNING *",
      [is_offered, id],
    );
    if (data.rows.length === 0) {
      return null;
    }
    return data.rows[0];
  },
  updateMultipleGiftersStatus: async (id, multiple_gifters) => {
    const data = await pool.query(
      "UPDATE gifts SET multiple_gifters = $1 WHERE id = $2 RETURNING *",
      [multiple_gifters, id],
    );
    if (data.rows.length === 0) {
      return null;
    }
    return data.rows[0];
  },
  getOfferingUserIds: async (giftId) => {
    const data = await pool.query(
      "SELECT id_user FROM users_gifts WHERE id_gift = $1 ORDER BY id_user ASC",
      [giftId],
    );
    return data.rows.map((row) => row.id_user);
  },
  addOfferingUser: async (giftId, userId) => {
    await pool.query(
      "INSERT INTO users_gifts (id_user, id_gift) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [userId, giftId],
    );
  },
  removeOfferingUser: async (giftId, userId) => {
    await pool.query(
      "DELETE FROM users_gifts WHERE id_user = $1 AND id_gift = $2",
      [userId, giftId],
    );
  },
  delete: async (id) => {
    const data = await pool.query(
      "DELETE FROM gifts WHERE id = $1 RETURNING *",
      [id],
    );
    if (data.rows.length === 0) {
      return null;
    }
    return data.rows[0];
  },
};

// src/services/giftImageStorage.ts
var import_crypto2 = require("crypto");
var import_promises = __toESM(require("fs/promises"));
var import_path2 = __toESM(require("path"));
var import_sharp = __toESM(require("sharp"));
var giftsUploadsDirectory = import_path2.default.join(
  uploadsDirectory,
  "gifts",
);
var giftsPublicPrefix = "/uploads/gifts";
async function storeGiftImage(file) {
  await import_promises.default.mkdir(giftsUploadsDirectory, {
    recursive: true,
  });
  const filename = `${(0, import_crypto2.randomUUID)()}.webp`;
  const outputPath = import_path2.default.join(giftsUploadsDirectory, filename);
  await (0, import_sharp.default)(file.buffer)
    .rotate()
    .resize({
      width: 1200,
      height: 1200,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 78 })
    .toFile(outputPath);
  return `${giftsPublicPrefix}/${filename}`;
}
async function deleteStoredGiftImage(imageUrl) {
  if (!imageUrl.startsWith(`${giftsPublicPrefix}/`)) {
    return;
  }
  const filename = import_path2.default.basename(imageUrl);
  const filePath = import_path2.default.join(giftsUploadsDirectory, filename);
  await import_promises.default.rm(filePath, { force: true });
}

// src/controllers/gifts.ts
var parseRequiredString = (value) => {
  const normalized = typeof value === "string" ? value.trim() : "";
  return normalized;
};
var parseNullableString = (value) => {
  if (typeof value !== "string") {
    return null;
  }
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
};
var parseRequiredInteger = (value) => {
  if (typeof value === "number") {
    return Number.isInteger(value) ? value : Number.NaN;
  }
  return Number.parseInt(String(value), 10);
};
var parseBooleanField = (value, fallback) => {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "string") {
    if (value === "true") {
      return true;
    }
    if (value === "false") {
      return false;
    }
  }
  return fallback;
};
var giftsController = {
  getAll: async (req, res) => {
    try {
      const data = await giftsService.getAll();
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const gift = await giftsService.getById(parseInt(id, 10));
      if (!gift) {
        return res.status(404).json({ message: "Gift not found" });
      }
      res.status(200).json({ data: gift });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
  create: async (req, res) => {
    try {
      const title = parseRequiredString(req.body.title);
      const description = parseNullableString(req.body.description);
      const product_link = parseNullableString(req.body.product_link);
      const id_wishing_user = parseRequiredInteger(req.body.id_wishing_user);
      const is_offered = parseBooleanField(req.body.is_offered, false);
      const multiple_gifters = parseBooleanField(
        req.body.multiple_gifters,
        false,
      );
      const id_author_user = parseRequiredInteger(req.body.id_author_user);
      const requestWithFile = req;
      if (!title) {
        return res.status(400).json({ message: "title is required" });
      }
      if (
        !Number.isInteger(id_wishing_user) ||
        !Number.isInteger(id_author_user)
      ) {
        return res.status(400).json({
          message: "id_wishing_user and id_author_user must be integers",
        });
      }
      let image_url = parseNullableString(req.body.image_url);
      if (requestWithFile.file) {
        image_url = await storeGiftImage(requestWithFile.file);
      }
      const gift = await giftsService.create(
        title,
        description,
        image_url,
        product_link,
        id_wishing_user,
        is_offered,
        multiple_gifters,
        id_author_user,
      );
      res.status(201).json({ data: gift });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        image_url,
        product_link,
        id_wishing_user,
        is_offered,
        multiple_gifters,
        id_author_user,
      } = req.body;
      const gift = await giftsService.update(
        parseInt(id, 10),
        title,
        description,
        image_url,
        product_link,
        id_wishing_user,
        is_offered != null ? is_offered : false,
        multiple_gifters != null ? multiple_gifters : false,
        id_author_user,
      );
      if (!gift) {
        return res.status(404).json({ message: "Gift not found" });
      }
      res.status(200).json({ data: gift });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
  toggleOffered: async (req, res) => {
    var _a;
    try {
      const { id } = req.params;
      const { is_offered } = req.body;
      const rawUserId = (_a = req.user) == null ? void 0 : _a.id;
      const userId =
        typeof rawUserId === "number"
          ? rawUserId
          : Number.parseInt(String(rawUserId), 10);
      if (!Number.isFinite(userId)) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (typeof is_offered !== "boolean") {
        return res
          .status(400)
          .json({ message: "is_offered must be a boolean" });
      }
      const giftId = parseInt(id, 10);
      const currentGift = await giftsService.getById(giftId);
      if (!currentGift) {
        return res.status(404).json({ message: "Gift not found" });
      }
      const offeringUserIds = await giftsService.getOfferingUserIds(giftId);
      const isCurrentUserOffering = offeringUserIds.includes(userId);
      if (is_offered) {
        if (
          !currentGift.multiple_gifters &&
          offeringUserIds.length > 0 &&
          !isCurrentUserOffering
        ) {
          return res.status(403).json({
            message: "This gift is already offered by another user",
          });
        }
        if (!isCurrentUserOffering) {
          await giftsService.addOfferingUser(giftId, userId);
        }
        const refreshedOfferingUserIds2 =
          await giftsService.getOfferingUserIds(giftId);
        const gift2 = await giftsService.updateOfferedStatus(
          giftId,
          refreshedOfferingUserIds2.length > 0,
        );
        if (!gift2) {
          return res.status(404).json({ message: "Gift not found" });
        }
        return res.status(200).json({
          data: __spreadProps(__spreadValues({}, gift2), {
            offering_user_ids: refreshedOfferingUserIds2,
          }),
        });
      }
      if (!isCurrentUserOffering) {
        return res.status(403).json({
          message: "Only users currently offering this gift can cancel",
        });
      }
      await giftsService.removeOfferingUser(giftId, userId);
      const refreshedOfferingUserIds =
        await giftsService.getOfferingUserIds(giftId);
      const gift = await giftsService.updateOfferedStatus(
        giftId,
        refreshedOfferingUserIds.length > 0,
      );
      if (!gift) {
        return res.status(404).json({ message: "Gift not found" });
      }
      res.status(200).json({
        data: __spreadProps(__spreadValues({}, gift), {
          offering_user_ids: refreshedOfferingUserIds,
        }),
      });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
  toggleMultipleGifters: async (req, res) => {
    var _a;
    try {
      const { id } = req.params;
      const { multiple_gifters } = req.body;
      const rawUserId = (_a = req.user) == null ? void 0 : _a.id;
      const userId =
        typeof rawUserId === "number"
          ? rawUserId
          : Number.parseInt(String(rawUserId), 10);
      if (!Number.isFinite(userId)) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (typeof multiple_gifters !== "boolean") {
        return res
          .status(400)
          .json({ message: "multiple_gifters must be a boolean" });
      }
      const giftId = parseInt(id, 10);
      const currentGift = await giftsService.getById(giftId);
      if (!currentGift) {
        return res.status(404).json({ message: "Gift not found" });
      }
      if (currentGift.id_wishing_user === userId) {
        return res.status(403).json({
          message: "Gift owner cannot change multiple gifters",
        });
      }
      const gift = await giftsService.updateMultipleGiftersStatus(
        giftId,
        multiple_gifters,
      );
      if (!gift) {
        return res.status(404).json({ message: "Gift not found" });
      }
      res.status(200).json({ data: gift });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await giftsService.delete(parseInt(id, 10));
      if (!deleted) {
        return res.status(404).json({ message: "Gift not found" });
      }
      if (deleted.image_url) {
        await deleteStoredGiftImage(deleted.image_url).catch((error) => {
          console.error("Failed to delete gift image", error);
        });
      }
      res.status(200).json({ message: "Gift deleted" });
    } catch (error) {
      res.status(500).json({ msg: error, message: "y a une erreur" });
    }
  },
};

// src/middleware/uploadGiftImage.ts
var import_multer = __toESM(require("multer"));
var upload = (0, import_multer.default)({
  storage: import_multer.default.memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
  fileFilter: (_req, file, callback) => {
    if (file.mimetype.startsWith("image/")) {
      callback(null, true);
      return;
    }
    callback(new Error("Only image files are allowed"));
  },
});
var uploadGiftImage = (req, res, next) => {
  upload.single("image")(req, res, (error) => {
    if (!error) {
      next();
      return;
    }
    if (error instanceof import_multer.default.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        res.status(413).json({ message: "Image too large" });
        return;
      }
      res.status(400).json({ message: error.message });
      return;
    }
    res.status(400).json({
      message: error instanceof Error ? error.message : "Invalid image upload",
    });
  });
};

// src/routes/gifts.ts
var router4 = (0, import_express4.Router)();
router4.get("/", giftsController.getAll);
router4.get("/:id", giftsController.getById);
router4.post("/", uploadGiftImage, giftsController.create);
router4.put("/:id/toggle-offered", authenticate, giftsController.toggleOffered);
router4.put(
  "/:id/toggle-multiple-gifters",
  authenticate,
  giftsController.toggleMultipleGifters,
);
router4.put("/:id", giftsController.update);
router4.delete("/:id", giftsController.delete);

// src/app.ts
var FRONTEND_PORT = import_process2.env.FRONTEND_PORT || 5173;
var FRONTEND_URL = import_process2.env.FRONTEND_URL;
var CORS_ORIGINS = import_process2.env.CORS_ORIGINS;
var configuredOrigins = CORS_ORIGINS
  ? CORS_ORIGINS.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean)
  : [];
var allowedOrigins = [
  ...configuredOrigins,
  FRONTEND_URL,
  `http://localhost:${FRONTEND_PORT}`,
  "http://localhost:5173",
  "https://surprise-dusky-zeta.vercel.app",
].filter((origin) => Boolean(origin));
var app = (0, import_express5.default)();
import_fs.default.mkdirSync(uploadsDirectory, { recursive: true });
app.use(import_express5.default.json());
app.use("/uploads", import_express5.default.static(uploadsDirectory));
var corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use((0, import_cors.default)(corsOptions));
var version = "v1";
var apiPath = `/api/${version}`;
app.use(`${apiPath}/users`, router);
app.use(`${apiPath}/auth`, router2);
app.use(`${apiPath}/festiveEvent`, router3);
app.use(`${apiPath}/gifts`, router4);
var app_default = app;

// src/server.ts
var import_process3 = require("process");

// src/db/schema/users.ts
var import_pg_core = require("drizzle-orm/pg-core");
var usersTable = (0, import_pg_core.pgTable)("users", {
  id: (0, import_pg_core.integer)().primaryKey().generatedAlwaysAsIdentity(),
  email: (0, import_pg_core.varchar)({ length: 100 }).notNull().unique(),
  name: (0, import_pg_core.varchar)({ length: 100 }).notNull(),
  password: (0, import_pg_core.varchar)({ length: 255 }).notNull(),
});

// src/db/schema/festiveEvent.ts
var import_pg_core2 = require("drizzle-orm/pg-core");
var festiveEventTable = (0, import_pg_core2.pgTable)("festive_event", {
  id: (0, import_pg_core2.integer)().primaryKey().generatedAlwaysAsIdentity(),
  title: (0, import_pg_core2.varchar)({ length: 100 }).notNull(),
  description: (0, import_pg_core2.varchar)({ length: 1e3 }),
  id_owner: (0, import_pg_core2.integer)()
    .notNull()
    .references(() => usersTable.id),
});

// src/db/schema/usersEvents.ts
var import_pg_core3 = require("drizzle-orm/pg-core");
var usersEventTable = (0, import_pg_core3.pgTable)("users_events", {
  id_user: (0, import_pg_core3.integer)()
    .notNull()
    .references(() => usersTable.id),
  id_event: (0, import_pg_core3.integer)()
    .notNull()
    .references(() => festiveEventTable.id),
});

// src/db/schema/gifts.ts
var import_pg_core4 = require("drizzle-orm/pg-core");
var giftsTable = (0, import_pg_core4.pgTable)("gifts", {
  id: (0, import_pg_core4.integer)().primaryKey().generatedAlwaysAsIdentity(),
  title: (0, import_pg_core4.varchar)({ length: 100 }).notNull(),
  description: (0, import_pg_core4.varchar)({ length: 1e3 }),
  image_url: (0, import_pg_core4.varchar)({ length: 255 }),
  product_link: (0, import_pg_core4.varchar)({ length: 255 }),
  id_wishing_user: (0, import_pg_core4.integer)()
    .notNull()
    .references(() => usersTable.id),
  is_offered: (0, import_pg_core4.boolean)().notNull().default(false),
  multiple_gifters: (0, import_pg_core4.boolean)().notNull().default(false),
  id_author_user: (0, import_pg_core4.integer)()
    .notNull()
    .references(() => usersTable.id),
});

// src/db/schema/comments.ts
var import_pg_core5 = require("drizzle-orm/pg-core");
var commentsTable = (0, import_pg_core5.pgTable)("comments", {
  id: (0, import_pg_core5.integer)().primaryKey().generatedAlwaysAsIdentity(),
  message: (0, import_pg_core5.varchar)({ length: 1e3 }).notNull(),
  id_user: (0, import_pg_core5.integer)()
    .notNull()
    .references(() => usersTable.id),
  id_gift: (0, import_pg_core5.integer)()
    .notNull()
    .references(() => giftsTable.id),
  is_public: (0, import_pg_core5.boolean)().notNull().default(false),
  timestamp: (0, import_pg_core5.timestamp)("timestamp").notNull().defaultNow(),
  is_edited: (0, import_pg_core5.boolean)().notNull().default(false),
  timestamp_edited: (0, import_pg_core5.timestamp)("timestamp_edited"),
});

// src/db/fixtures.ts
function isDatabaseError(err) {
  return typeof err === "object" && err !== null;
}
async function usersFixtures() {
  const safeRegister = async (user) => {
    var _a;
    try {
      await authService.register(user.email, user.password, user.name);
    } catch (err) {
      if (isDatabaseError(err)) {
        if (
          ((_a = err.cause) == null ? void 0 : _a.code) === "23505" ||
          err.code === "23505"
        ) {
          return;
        }
      }
      throw err;
    }
  };
  const firstUser = {
    email: "alizee.beaupre@gmail.com",
    name: "Aliz\xE9e Beaupr\xE9",
    password: "securepassword123",
  };
  await safeRegister(firstUser);
  const secundUser = {
    email: "celeste.delmare@gmail.com",
    name: "C\xE9leste DelMare",
    password: "securepassword123",
  };
  await safeRegister(secundUser);
  const thirdUser = {
    email: "emeria.faravel@gmail.com",
    name: "Emeria Faravel",
    password: "securepassword123",
  };
  await safeRegister(thirdUser);
  const fourthdUser = {
    email: "gali.hauban@gmail.com",
    name: "Gali Hauban",
    password: "securepassword123",
  };
  await safeRegister(fourthdUser);
  const fifthUser = {
    email: "inaya.jacobsen@gmail.com",
    name: "Inaya Jacobsen",
    password: "securepassword123",
  };
  await safeRegister(fifthUser);
  const sixthUser = {
    email: "keren.lagertha@gmail.com",
    name: "Keren Lagertha",
    password: "securepassword123",
  };
  await safeRegister(sixthUser);
  const seventhUser = {
    email: "moryan.norse@gmail.com",
    name: "Moryan Norse",
    password: "securepassword123",
  };
  await safeRegister(seventhUser);
  const eighthUser = {
    email: "ornella.polaris@gmail.com",
    name: "Ornella Polaris",
    password: "securepassword123",
  };
  await safeRegister(eighthUser);
  const ninthUser = {
    email: "quentin.ressac@gmail.com",
    name: "Quentin Ressac",
    password: "securepassword123",
  };
  await safeRegister(ninthUser);
  const tenthUser = {
    email: "sama.taraudan@gmail.com",
    name: "Sama Taraudan",
    password: "securepassword123",
  };
  await safeRegister(tenthUser);
  const eleventhUser = {
    email: "ursula.vasco@gmail.com",
    name: "Ursula Vasco",
    password: "securepassword123",
  };
  await safeRegister(eleventhUser);
  const twelfthUser = {
    email: "will.xaviera@gmail.com",
    name: "Will Xaviera",
    password: "securepassword123",
  };
  await safeRegister(twelfthUser);
  const thirteenthUser = {
    email: "yue.zephyr@gmail.com",
    name: "Yu\xE9 Z\xE9phyr",
    password: "securepassword123",
  };
  await safeRegister(thirteenthUser);
  console.log("13 test users inserted into users table");
}
async function festiveEventFixtures(db2) {
  const firstEvent = {
    title: "No\xEBl 2025",
    description: "No\xEBl en famille",
    id_owner: 1,
  };
  await db2.insert(festiveEventTable).values(firstEvent);
  const secondEvent = {
    title: "Anniv Moryan",
    description: "Pour organiser ses cadeaux",
    id_owner: 2,
  };
  await db2.insert(festiveEventTable).values(secondEvent);
  const thirdEvent = {
    title: "Anniv Keren",
    description: `C'est la f\xEAte !`,
    id_owner: 6,
  };
  await db2.insert(festiveEventTable).values(thirdEvent);
  const fourthEvent = {
    title: "le No\xEBl des zamis",
    description: `Bloup bloup bloup`,
    id_owner: 13,
  };
  await db2.insert(festiveEventTable).values(fourthEvent);
  const fifthEvent = {
    title: "Th\xE8se Gali",
    description: `F\xEAtons \xE7a comme il se doit !`,
    id_owner: 4,
  };
  await db2.insert(festiveEventTable).values(fifthEvent);
  const sixthEvent = {
    title: "Festival",
    description: `Ambiance garantie`,
    id_owner: 7,
  };
  await db2.insert(festiveEventTable).values(sixthEvent);
  const seventhEvent = {
    title: "Anniv Ursula",
    description: `Chut ! C'est une surprise !`,
    id_owner: 8,
  };
  await db2.insert(festiveEventTable).values(seventhEvent);
  const eighthEvent = {
    title: "Mariage Gali et Yu\xE9 !",
    description: `Musique et danse toute la nuit !`,
    id_owner: 13,
  };
  await db2.insert(festiveEventTable).values(eighthEvent);
  console.log("8 test events inserted into festiveEvent table");
}
async function usersEventsFixtures(db2) {
  const firstUserEvent = {
    id_user: 1,
    id_event: 1,
  };
  await db2.insert(usersEventTable).values(firstUserEvent);
  const secundUserEvent = {
    id_user: 2,
    id_event: 1,
  };
  await db2.insert(usersEventTable).values(secundUserEvent);
  const thirdUserEvent = {
    id_user: 3,
    id_event: 2,
  };
  await db2.insert(usersEventTable).values(thirdUserEvent);
  const fourthUserEvent = {
    id_user: 4,
    id_event: 2,
  };
  await db2.insert(usersEventTable).values(fourthUserEvent);
  const fifthUserEvent = {
    id_user: 5,
    id_event: 3,
  };
  await db2.insert(usersEventTable).values(fifthUserEvent);
  const sixthUserEvent = {
    id_user: 6,
    id_event: 3,
  };
  await db2.insert(usersEventTable).values(sixthUserEvent);
  const seventhUserEvent = {
    id_user: 7,
    id_event: 4,
  };
  await db2.insert(usersEventTable).values(seventhUserEvent);
  const eighthUserEvent = {
    id_user: 8,
    id_event: 4,
  };
  await db2.insert(usersEventTable).values(eighthUserEvent);
  const ninthUserEvent = {
    id_user: 9,
    id_event: 5,
  };
  await db2.insert(usersEventTable).values(ninthUserEvent);
  const tenthUserEvent = {
    id_user: 10,
    id_event: 5,
  };
  await db2.insert(usersEventTable).values(tenthUserEvent);
  const eleventhUserEvent = {
    id_user: 11,
    id_event: 6,
  };
  await db2.insert(usersEventTable).values(eleventhUserEvent);
  const twelfthUserEvent = {
    id_user: 12,
    id_event: 6,
  };
  await db2.insert(usersEventTable).values(twelfthUserEvent);
  const thirteenthUserEvent = {
    id_user: 13,
    id_event: 7,
  };
  await db2.insert(usersEventTable).values(thirteenthUserEvent);
  const fourteenthUserEvent = {
    id_user: 1,
    id_event: 8,
  };
  await db2.insert(usersEventTable).values(fourteenthUserEvent);
  const fifteenthUserEvent = {
    id_user: 4,
    id_event: 8,
  };
  await db2.insert(usersEventTable).values(fifteenthUserEvent);
  const sixteenthUserEvent = {
    id_user: 13,
    id_event: 8,
  };
  await db2.insert(usersEventTable).values(sixteenthUserEvent);
  const seventeenthUserEvent = {
    id_user: 8,
    id_event: 7,
  };
  await db2.insert(usersEventTable).values(seventeenthUserEvent);
  const eighteenthUserEvent = {
    id_user: 6,
    id_event: 3,
  };
  await db2.insert(usersEventTable).values(eighteenthUserEvent);
  const nineteenthUserEvent = {
    id_user: 3,
    id_event: 1,
  };
  await db2.insert(usersEventTable).values(nineteenthUserEvent);
  const twentiethUserEvent = {
    id_user: 5,
    id_event: 2,
  };
  await db2.insert(usersEventTable).values(twentiethUserEvent);
  console.log("20 test user-event relations inserted into usersEvent table");
}
async function giftsFixtures(db2) {
  const firstGift = {
    title: "Dealing with Dragons - Patricia C. Wrede",
    description:
      "Un roman g\xE9niale sur une princesse qui s'enfuit de chez elle pour se rendre chez les dragons",
    image_url: "",
    product_link:
      "https://www.amazon.fr/Dealing-Dragons-1-Patricia-Wrede/dp/0786948607/ref=sr_1_1?crid=3Q9Z5X8KZ2G9&keywords=dealing+with+dragons&qid=1700000000&sprefix=dealing+with+dragons%2Caps%2C123&sr=8-1",
    id_wishing_user: 1,
    is_offered: false,
    multiple_gifters: false,
    id_author_user: 1,
  };
  await db2.insert(giftsTable).values(firstGift);
  const secondGift = {
    title: "Switch 2",
    description: "La derni\xE8re version de la console Nintendo Switch",
    image_url: "",
    product_link: "https://www.nintendo.fr/Jeux/Nintendo-Switch-1280745.html",
    id_wishing_user: 2,
    is_offered: false,
    multiple_gifters: false,
    id_author_user: 2,
  };
  await db2.insert(giftsTable).values(secondGift);
  const thirdGift = {
    title: "Chaussettes en laine",
    description: "Des chaussettes en laine pour garder les pieds au chaud",
    image_url: "",
    product_link:
      "https://www.amazon.fr/Chaussettes-Laine/dp/B07P6Y8Z5Z/ref=sr_1_1?crid=3Q9Z5X8KZ2G9&keywords=chaussettes+en+laine&qid=1700000000&sprefix=chaussettes+en+laine%2Caps%2C123&sr=8-1",
    id_wishing_user: 3,
    is_offered: false,
    multiple_gifters: false,
    id_author_user: 3,
  };
  await db2.insert(giftsTable).values(thirdGift);
  const fourthGift = {
    title: "Coffret de th\xE9",
    description: "Un coffret de th\xE9 pour les amateurs de th\xE9",
    image_url: "",
    product_link:
      "https://www.amazon.fr/Coffret-Th\xE9/dp/B07P6Y8Z5Z/ref=sr_1_1?crid=3Q9Z5X8KZ2G9&keywords=coffret+de+th\xE9&qid=1700000000&sprefix=coffret+de+th\xE9%2Caps%2C123&sr=8-1",
    id_wishing_user: 4,
    is_offered: false,
    multiple_gifters: false,
    id_author_user: 4,
  };
  await db2.insert(giftsTable).values(fourthGift);
  const fifthGift = {
    title: "For\xEAt mixte Dartmoor",
    description:
      "Le jeu de soci\xE9t\xE9 qui suit le For\xEAt mixte classique, mais sur la lande du Dartmoor.",
    image_url: "",
    product_link:
      "https://www.amazon.fr/For\xEAt-Mixte-Dartmoor/dp/B07P6Y8Z5Z/ref=sr_1_1?crid=3Q9Z5X8KZ2G9&keywords=for\xEAt+mixte+dartmoor&qid=1700000000&sprefix=for\xEAt+mixte+dartmoor%2Caps%2C123&sr=8-1",
    id_wishing_user: 5,
    is_offered: false,
    multiple_gifters: false,
    id_author_user: 5,
  };
  await db2.insert(giftsTable).values(fifthGift);
  const sixthGift = {
    title: "LEGO Botanical Collection - 10289",
    description: "Un set LEGO de collection botanique",
    image_url: "",
    product_link:
      "https://www.lego.com/fr-fr/product/botanical-collection-10289",
    id_wishing_user: 6,
    is_offered: false,
    multiple_gifters: false,
    id_author_user: 6,
  };
  await db2.insert(giftsTable).values(sixthGift);
  const seventhGift = {
    title: "Dune Imperium Insurrection",
    description: "Le dernier jeu de la s\xE9rie Dune Imperium",
    image_url: "",
    product_link:
      "https://www.amazon.fr/Dune-Imperium-Insurrection/dp/B07P6Y8Z5Z/ref=sr_1_1?crid=3Q9Z5X8KZ2G9&keywords=dune+imperium+insurrection&qid=1700000000&sprefix=dune+imperium+insurrection%2Caps%2C123&sr=8-1",
    id_wishing_user: 7,
    is_offered: false,
    multiple_gifters: false,
    id_author_user: 7,
  };
  await db2.insert(giftsTable).values(seventhGift);
  console.log("7 test gifts inserted into gifts table");
}
async function commentsFixture(db2) {
  const firstComment = {
    message: "J'ai h\xE2te de recevoir ce livre !",
    id_user: 1,
    id_gift: 1,
    is_public: true,
    timestamp: /* @__PURE__ */ new Date(),
    is_edited: false,
    timestamp_edited: null,
  };
  await db2.insert(commentsTable).values(firstComment);
  const secondComment = {
    message: "Ce jeu a l'air super !",
    id_user: 2,
    id_gift: 2,
    is_public: true,
    timestamp: /* @__PURE__ */ new Date(),
    is_edited: false,
    timestamp_edited: null,
  };
  await db2.insert(commentsTable).values(secondComment);
  console.log("2 test comments inserted into comments table");
}
async function hasExistingFixturesData(db2) {
  const usersRows = await db2
    .select({ id: usersTable.id })
    .from(usersTable)
    .limit(1);
  if (usersRows.length > 0) {
    return true;
  }
  const festiveEventRows = await db2
    .select({ id: festiveEventTable.id })
    .from(festiveEventTable)
    .limit(1);
  if (festiveEventRows.length > 0) {
    return true;
  }
  const usersEventRows = await db2
    .select({ id_user: usersEventTable.id_user })
    .from(usersEventTable)
    .limit(1);
  if (usersEventRows.length > 0) {
    return true;
  }
  const giftsRows = await db2
    .select({ id: giftsTable.id })
    .from(giftsTable)
    .limit(1);
  if (giftsRows.length > 0) {
    return true;
  }
  const commentsRows = await db2
    .select({ id: commentsTable.id })
    .from(commentsTable)
    .limit(1);
  return commentsRows.length > 0;
}
async function mainFixtures(db2) {
  if (await hasExistingFixturesData(db2)) {
    console.log("Skipping fixtures: existing data detected in database tables");
    return;
  }
  await usersFixtures();
  await festiveEventFixtures(db2);
  await usersEventsFixtures(db2);
  await giftsFixtures(db2);
  await commentsFixture(db2);
  console.log("All fixtures have been inserted");
}

// src/server.ts
var import_child_process = require("child_process");
var import_util2 = require("util");
import_dotenv.default.config();
var API_PORT = Number(
  import_process3.env.PORT || import_process3.env.API_PORT || 3e3,
);
var exec = (0, import_util2.promisify)(import_child_process.exec);
var shouldRunFixtures =
  import_process3.env.RUN_FIXTURES === "true" ||
  (import_process3.env.RUN_FIXTURES !== "false" &&
    import_process3.env.NODE_ENV !== "production");
var db = (0, import_node_postgres.drizzle)({ client: pool });
async function ensureMigrationsApplied() {
  try {
    console.log("Running database migrations (drizzle-kit)...");
    await exec("npx drizzle-kit migrate --config ./drizzle.config.ts");
    console.log("Migrations applied");
  } catch (err) {
    console.error("Failed to apply migrations", err);
    throw err;
  }
}
pool
  .connect()
  .then(async () => {
    console.log("Connexion \xE0 PostgreSQL r\xE9ussie");
    await ensureMigrationsApplied();
    app_default.listen(API_PORT, () => {
      console.log(`Server is running on http://localhost:${API_PORT}`);
    });
    if (shouldRunFixtures) {
      await mainFixtures(db);
    } else {
      console.log(
        "Skipping fixtures: RUN_FIXTURES disabled for this environment",
      );
    }
  })
  .catch((err) => console.error("Erreur de connexion \xE0 PostgreSQL", err));
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    db,
  });
