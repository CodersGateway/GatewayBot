import dotenv from "dotenv";
// Load .env config file.
dotenv.config();

import { token, owners } from "./Config";
import BotClient from "./client/BotClient";
import { UpdateLoop } from "./Updater";

const client: BotClient = new BotClient({ token, owners });
client.start();
UpdateLoop();