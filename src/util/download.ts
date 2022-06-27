const Downloader = require("nodejs-file-downloader");

export default async (url: string, directory: string): Promise<string | undefined> => {
	let filename;
	const downloader = new Downloader({
		url,
		directory,
		maxAttempts: 3,
		onProgress: (percentage: string) => {
			process.stdout.clearLine(0);
			process.stdout.cursorTo(0);
			process.stdout.write(percentage);
		},
		skipExistingFileName: true,
		onBeforeSave: (deducedName: string) => {
			filename = deducedName;
		},
	});
	try {
		await downloader.download();
		process.stdout.write("\n");
		console.log("Finish download!");
	} catch (error) {
		console.log("Download failed", error);
	}
	return filename;
};
