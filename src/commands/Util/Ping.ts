import { Command } from "discord-akairo"
import { Message } from "discord.js"

export default class PingCommand extends Command {
    public constructor() {
        super('ping', {
            aliases: ['ping'],
            description: {
                content: 'check the ping of the bot'
            },
            category: 'Utility'
        })
    }

    public async exec(message: Message) {
        message.channel.send(`Pong! ${this.client.ws.ping}ms`)
    }
}