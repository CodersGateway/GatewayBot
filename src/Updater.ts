import gitRevision from "git-revision";
import { exec, ExecException } from "child_process";

const gitRev: () => string = (gitRevision as (hashType: string) => string).bind(null, "long");

interface IExecResult {
    stdout: string;
    stderr: string;
}

async function execAsync(command: string): Promise<IExecResult> {
    return await new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err != null) reject(err);
            else resolve({
                stderr,
                stdout,
            });
        });
    });
}

const parseinterval = Number(process.env["UPDATE_INTERVAL"]);

export let CheckInterval: number = isNaN(parseinterval) ? 15000 : parseinterval;
export let LastCheck: number = Date.now();
export let UpdateStop: boolean = false;
export let LastRevision: string = gitRev();

export async function UpdateLoop(): Promise<void> {
    while(!UpdateStop) {
        let elapsed = Date.now() - LastCheck;
        if (elapsed >= CheckInterval) {
            // DO STUFF
            try {
                const res = await execAsync("git fetch");
                const rev = gitRev();
                if (rev !== LastRevision) {
                    // New version
                    console.log("A new commit is available.");
                    await execAsync("git pull");
                    UpdateStop = true;
                    process.exit(0);
                }
            } catch (e) {
                throw e;
            }
            // Set last check to now.
            LastCheck = Date.now();
        }
    }
}