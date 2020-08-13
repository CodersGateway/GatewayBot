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
        const nums: number[] = [args.num1, args.num2 == null ? 0 : args.num2];
        nums.sort((a, b) => a - b);
        let res = await Rand.srandInRange(nums[1], nums[0]);
        res = Math.round(res);
        message.reply(`rolled \`${res}\`! *(${nums[0]}-${nums[1]})*`);
    }
}