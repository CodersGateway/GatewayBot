import { Message } from "discord.js"
import { Command, Listener } from "discord-akairo";

export default class CommandCooldown extends Listener {
    constructor() {
        super("cooldown", {
            emitter: "commandHandler",
            event: "cooldown"
        });
    }

    public exec(message: Message, command: Command, remaining: number) {
        let final = remaining/1000
        message.util.send(`You can use that command in \`${final} seconds\``);
    }
}