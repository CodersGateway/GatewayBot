import { Command } from "discord-akairo"
import { MessageEmbed, GuildMember, Message } from "discord.js"
import db from "quick.db"

export default class ThankyouCommand extends Command {
    public constructor() {
        super('thankyou', {
            aliases: ['thankyou', 'ty', 'thanks'],
            category: 'Misc',
            description: {
                content: 'express your gratitude to someone by giving them internet points...',
                usage: '[ mention or id ]',
                examples: [
                    'Nerd#0001 for helping me '
                ]
            },
            args: [
                {
                    id: 'member',
                    type: 'member',
                    prompt: {
                        start: (msg: Message) => `${msg.author} who are you thanking?`,
                        retry: (msg: Message) => `${msg.author} thats not a valid member to thank`
                    }
                }
            ],
            cooldown: 18000000
        })
    }

    public async exec(message: Message, { member } : { member : GuildMember}) {
        message.channel.send(new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`<@${message.author.id}> thanked <@${member.user.id}>`)
        )

        db.add(`thankpoints_${member.user.id}`, 1)
        message.channel.send(`${message.author.username} you earnt 1 thankyou point`)


    }
}
