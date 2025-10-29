// import dotenv from "dotenv"
// dotenv.config()

import { sequelize } from "./sequelize.js"
import { Events } from "./events.js"
import { Gallery } from "./gallery.js"
import { Menu} from "./menu.js"
import { Staff } from "./staff.js"
import { Suppliers } from "./suppliers.js"
import { Users } from "./users.js"

export {sequelize, Events, Gallery, Menu, Staff, Suppliers, Users};
