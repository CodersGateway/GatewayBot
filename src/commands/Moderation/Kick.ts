import { Command } from "discord-akairo"
import { GuildMember, Message } from "discord.js"

export default class KickCommand extends Command {
    public constructor() {
        super('kick', {
            aliases: ['kick'],
            category: 'Moderation',
            description: {
                content: 'kick a bad member >:(',
                usage: '[ id or mention ]',
                examples: [
                    '735869013443215360 pinging people',
                    'Nerd being mean'
                ]
            },
            args: [
                {
                    id: 'member',
                    type: 'member',
                    prompt : {
                        start: (msg: Message) => `${msg.author} please provide a member to kick`,
                        retry : (msg: Message) => `${msg.author} thats not a valid member to kick`
                    }
                },

                {
                    id: 'reason',
                    match: 'rest',
                    default: 'No reason provided'
                }
            ],
            clientPermissions: ['KICK_MEMBERS'],
            userPermissions: ['KICK_MEMBERS']
        })
    }

    public async exec(message: Message, { member, reason } : { member: GuildMember, reason: String }) {
        const cM = await message.guild.members.fetch(this.client.user!.id)

        if(!message.member.hasPermission("KICK_MEMBERS")) return message.util.send("You dont have sufficient permissions")

        if(!member.kickable) return message.util.send(":x: This member cant be kicked")

        if(!cM.permissions.has('KICK_MEMBERS')) return message.util.send("I cant kick members")

        try {
            member.kick()
            message.util.send(`**${member.user.tag}** was kicked by **${message.author.username}** for **${reason}**`)
        } catch (e){
            return message.util.send(`There was an error while executing that command | Error ${e}`)
        }
    }
}