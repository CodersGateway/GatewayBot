import { Command } from "discord-akairo"
import { MessageEmbed, Message, GuildMember } from "discord.js"

export default class BanCommand extends Command {
    public constructor() {
        super('ban', {
            aliases: ['ban', 'bean'],
            description: {
                content: 'ban a user'
            },
            category: 'Moderation',
            ratelimit: 3,
            args:[
                {
                    id: 'member',
                    type: 'member',
                    prompt: {
                        start: (msg: Message) => `${msg.author} please provide a member to ban`,
                        retry: (msg: Message) => `${msg.author} please provide a valid member to ban`,
                    }
                },

                {
                    id: 'reason',
                    match: 'rest',
                    default: 'No reason provided'
                }
            ],
            userPermissions: ["BAN_MEMBERS"]
        })
    }

    public async exec(message: Message, { member, reason }: {member: GuildMember, reason: string}) {
        const cM = await message.guild.members.fetch(this.client.user!.id)

        if(!member.bannable) return message.util.send(":x: This member cant be banned")

        if(!cM.permissions.has('BAN_MEMBERS')) return message.util.send("I cant ban members")

        try {
            member.ban()
            message.util.send(`**${member.user.username}** was banned by **${message.author.username}** for **${reason}**`)
        } catch (e){
            return message.util.send(`There was an error while executing that command | Error ${e}`)
        }
    }
}