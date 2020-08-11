import { Command } from "discord-akairo"
import { Message, MessageEmbed } from "discord.js"

export default class PingCommand extends Command {
    public constructor() {
        super('info', {
            aliases: ['info', 'botinfo'],
            description: {
                content: 'bot info'
            },
            category: 'Utility'
        })
    }

    public async exec(message: Message) {
        message.util.send(
            new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Bot Info")
            .addField("Total Servers", this.client.guilds.cache.size, true)
            .addField("Total Users", this.client.users.cache.size, true)
            .setThumbnail(this.client.user.displayAvatarURL())
            .addField("Contributors", "envis10n#2850\nYadiiiig#0420\nNerdThatNoOneLikes#0115")
        )
    }
}