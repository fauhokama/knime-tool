import arg = require("arg");

export type Args = {
	commands: string[];
	extensions: string[];
	knimeIni: string[];
};

const getArgs = (rawArgs: string[]): Args => {
	const args = arg(
		{
			"--extension": [String],
			"--knimeini": [String],

			"-e": "--extension",
			"-k": "--knimeini",
		},
		{
			argv: rawArgs.slice(2),
		}
	);

	return {
		commands: args._,
		extensions: args["--extension"] || [],
		knimeIni: args["--knimeini"] || [],
	};
};

const formatArgs = (args: Args) => {
	const obj = {};
	Object.assign(obj, helper(args.commands, "c"));
	Object.assign(obj, helper(args.extensions, "e"));
	Object.assign(obj, helper(args.knimeIni, "k"));
	return obj;
};

const helper = (arr: string[], prefix: string) => {
	const obj = {};
	arr.forEach((c, index) => {
		const key = `${prefix}${index}`;
		Object.assign(obj, { [key]: c });
	});
	return obj;
};

export const parseArgs = (rawArgs: string[]) => {
	return formatArgs(getArgs(rawArgs));
};
