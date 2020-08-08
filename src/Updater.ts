import { autoUpdate, updateInterval } from "./Config";
import gitRevision from "git-revision";
import { exec, ExecException } from "child_process";

const gitRev: () => string = autoUpdate ? (gitRevision as (hashType: string) => string).bind(null, "long") : () => "";

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

export let CheckInterval: number = updateInterval;
export let LastCheck: number = Date.now();
export let UpdateStop: boolean = false;
export let LastRevision: string = gitRev();

export async function UpdateLoop(): Promise<void> {
    setInterval(async () => {
        // DO STUFF
        try {
            console.log("Checking for updates...");
            const rev = gitRev();
            if (rev !== LastRevision) {
                // New version
                console.log("A new commit is available to pull.");
                await execAsync("git pull");
                UpdateStop = true;
                process.exit(0);
            }
        } catch (e) {
            throw e;
        }
        // Set last check to now.
        LastCheck = Date.now();
    }, CheckInterval);
}