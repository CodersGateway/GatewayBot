import { Command } from "discord-akairo"
import { Message, MessageEmbed, GuildMember } from "discord.js"
import fetch from "node-fetch"

export default class WinkCommand extends Command {
    public constructor() {
        super('wink', {
            aliases: ['wink'],
            category: 'Fun',
            description: {
                content: 'sends an anime winking GIF',
                usage: '<person id or mention>',
                examples: [
                    '467030554131562506',
                    '@Nerd#0001'
                ]
            },
            args: [
                {
                    id: 'member',
                    type: 'member',
                    prompt: {
                        start: (msg: Message) => `${msg.author} who are you going to wink at?`,
                        retry: (msg: Message) => `${msg.author} thats not a valid person to wink at`
                    }
                }
            ]
        })
    }

    public async exec(message: Message, { member } : { member: GuildMember }) {
        fetch("https://some-random-api.ml/animu/wink")
            .then((res) => res.json())
            .then((body) => {
                let embed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`${message.author.username} winked at ${member.user.tag}`)
                    .setImage(body.link)
                    .setTimestamp(Date.now())
                message.channel.send(embed)
            })
    }
}