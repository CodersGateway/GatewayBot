import dotenv from "dotenv";
// Load .env config file.
dotenv.config();

import { token, owners } from "./Config";
import BotClient from "./client/BotClient";

const client: BotClient = new BotClient({ token, owners });
client.start();