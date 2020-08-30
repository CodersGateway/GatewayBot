export const token: string = process.env["BOT_TOKEN"];
export const owners: string[] = process.env["OWNERS"] ? process.env["OWNERS"].split(",") : [];
export const prefix: string = "c!"
export const autoUpdate: boolean = process.env["AUTO_UPDATE"] ? process.env["AUTO_UPDATE"].toLowerCase() == "true" : false;
const parseInterval: number = Number(process.env["UPDATE_INTERVAL"]);
export const updateInterval: number = isNaN(parseInterval) ? 15000 : parseInterval;