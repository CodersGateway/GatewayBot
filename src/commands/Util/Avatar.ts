import { Command } from "discord-akairo"
import { Message, MessageEmbed, GuildMember } from "discord.js"

export default class AvatarCommand extends Command {
    public constructor() {
        super('avatar', {
            aliases: ['avatar', 'av'],
            category: 'Utility',
            description: {
                content: 'Check someones avatar or your own',
                usage: '[ person ]',
                examples: [
                    '735869013443215360',
                    '@Nerd#0001'
                ]
            },
            args: [
                {
                    id: 'member',
                    type: 'member',
                    default: (msg: Message) => msg.member
                }
            ]
        })
    }
    public async exec(message: Message, { member } : { member: GuildMember }) {
        message.channel.send(
            new MessageEmbed()
            .setTitle(`Avatar | ${member.user.tag}`)
            .setImage(member.user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setColor("RANDOM")
        )
    }
}