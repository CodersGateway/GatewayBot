import { Command } from "discord-akairo"
import { MessageEmbed, Message } from "discord.js"

export default class SnipeCommand extends Command {
    public constructor() {
        super('snipe', {
            aliases: ['snipe'],
            description: {
                content: 'View a recently deleted message'
            },
            category: 'Moderation',
            userPermissions: ['MANAGE_MESSAGES']
        })
    }

    public async exec(message: Message) {
        const msg = this.client.snipes.get(message.channel.id)
        if(!msg) message.reply(":x: there arent any recently deleted messages for me to show you")

        else {
        const embed = new MessageEmbed()
        .setAuthor(`Deleted by ${msg.author.tag}`, msg.author.displayAvatarURL())
        .setDescription(msg.content)
        .setColor("RANDOM")
        .setTimestamp(msg.createdAt)
        if(msg.image)embed.setImage(msg.image)
        message.channel.send(embed)
        }
    }
}