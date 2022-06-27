import { exec } from "child_process";

export const shellCmd = (cmd: string, showErrors: boolean) => {
	exec(cmd, (error, stdout, stderr) => {
		if (error) console.error(`exec error: ${error}`);
		if (showErrors) console.error(stderr);
		console.log(stdout);
	});
};
