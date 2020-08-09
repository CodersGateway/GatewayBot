import dotenv from "dotenv";
// Load .env config file.
dotenv.config();

import { token, owners, autoUpdate } from "./Config";
import BotClient from "./client/BotClient";
import { UpdateLoop } from "./Updater";

const client: BotClient = new BotClient({ token, owners });
client.start();

if (autoUpdate) {
    console.log("Auto update is enabled.");
    UpdateLoop();
}
else console.log("Auto update disabled.");