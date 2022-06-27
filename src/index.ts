import { override } from "prompts";
import initial from "./commands/initial";
import { parseArgs } from "./util/parseArgs";

const main = async (args: string[]) => {
	override(parseArgs(args));
	await initial.action(await initial.question());
};

main(process.argv);
