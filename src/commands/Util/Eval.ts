import { Command } from "discord-akairo"
import { Message, MessageEmbed, GuildMember } from "discord.js"
import axios, { AxiosResponse } from "axios";

interface ICodeBlock {
    language: string;
    source: string;
}

interface IDenoResponse {
    hadError: boolean;
    fileName: string;
    output: string;
    runtime: number;
}

interface IWebberDeno {
    eval?: IDenoResponse,
    error?: string,
    ts: number;
    responseTime: number;
}

function containsCodeblock(content: string): boolean {
    return /```\w\w\n?[\S\s]+```\n?/g.test(content);
}

function parseCodeblocks(content: string): ICodeBlock[] {
    const blocks: ICodeBlock[] = [];
    const mReg: RegExp = /```(\w\w)\n?/g;
    let match: RegExpExecArray = mReg.exec(content);
    while (match != null) {
        const s_off: number = match.index;
        const language: string = match[1];
        const e_off: number = content.indexOf("```", s_off + match[0].length);
        if (e_off != -1) {
            const source: string = content.substring(s_off + match[0].length + 1, e_off);
            blocks.push({
                language,
                source
            });
        }
        match = mReg.exec(content);
    }
    return blocks;
}

export default class EvalCommand extends Command {
    public constructor() {
        super('eval', {
            aliases: ['eval'],
            category: 'Util',
            description: {
                content: 'evaluates a codeblock',
                usage: '<codeblock>',
                examples: [
                    '```ts\n// ts codeblock\nconsole.log("Hello, world!");\n```',
                ]
            }
        })
    }

    public async exec(message: Message) {
        if (containsCodeblock(message.content)) {
            let blocks: ICodeBlock[] = parseCodeblocks(message.content);
            blocks = blocks.filter((b) => b.language == "js" || b.language == "ts");
            if (blocks.length > 0) {
                const block = blocks[0];
                const res: AxiosResponse<IWebberDeno> = await axios.post("https://webber.envis10n.dev/api/v1/deno", {
                    id: message.author.id,
                    source: block.source,
                    language: block.language,
                });
                if (res.data.error) message.reply(res.data.error);
                else if (res.data.eval) {
                    const ev = res.data.eval;
                    let resp = `\`\`\`\n${ev.output}\n\`\`\``;
                    if (resp.length > 1900) resp = `${resp.substring(0, 1900)}...\n\`\`\``;
                    const emb: MessageEmbed = new MessageEmbed();
                    emb.setTitle(ev.fileName)
                        .setColor(ev.hadError ? 0xff0000 : 0x00ff00)
                        .setDescription(resp)
                        .setFooter(`${ev.runtime}ms - Powered by Deno`);
                    message.reply(emb);
                }
            } else {
                message.reply("no valid codeblocks found.\nMake sure you are using `js` or `ts` blocks.");
            }
        }
    }
}