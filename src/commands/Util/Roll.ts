import { Command } from "discord-akairo"
import { Message } from "discord.js"
import * as Rand from "../../lib/Rand";

interface IRollArguments {
    num1: number;
    num2: number | null;
}

export default class RollCommand extends Command {
    public constructor() {
        super('roll', {
            aliases: ['roll', 'dice'],
            description: {
                content: 'Roll the dice.',
                usage: '[ maximum ] | [ minimum, maximum ]'
            },
            category: 'Utility',
            ratelimit: 2,
            args: [
                {
                    id: "num1",
                    type: "number",
                    default: 100,
                },
                {
                    id: "num2",
                    type: "number",
                    default: null
                }
            ]
        })
    }

    public async exec(message: Message, args: IRollArguments) {
        let res: number;
        if (args.num2 != null) res = await Rand.srandInRange(args.num2, args.num1);
        else res = await Rand.srandInRange(args.num1);
        res = Math.round(res);
        message.reply(`rolled a \`${res}\`!`);
    }
}