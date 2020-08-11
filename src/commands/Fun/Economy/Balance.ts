import { Command } from "discord-akairo"
import { Message, MessageEmbed, GuildMember } from "discord.js"
import db from "quick.db"

export default class BalanceCommand extends Command {
    public constructor() {
        super('balance', {
            aliases: ['balance', 'bal'],
            category: 'Economy',
            description: {
                content: 'check your balance',
                examples: [
                    "467030554131562506",
                    "Nerd#0001"
                ],
                usage: '[optional id/mention]'
            },
            args: [
                {
                    id: 'person',
                    default: (msg: Message) => msg.member
                }
            ]
        });
    }

    public async exec(message, { person } : { person: GuildMember}) {
        let money = db.fetch(`money_${person.id}`);

        if (money === null) money = 0

        let embed = new MessageEmbed()
            .setColor("RANDOM")
            .addField("Balance", `**$${money}**`)
        //@ts-ignore
        message.channel.send(embed)

    }
}