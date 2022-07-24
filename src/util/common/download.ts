const Downloader = require("nodejs-file-downloader");

export default async (url: string, destinationFullPath: string): Promise<string | undefined> => {
	let filename;
	const downloader = new Downloader({
		url,
		directory: destinationFullPath,
		maxAttempts: 3,
		onProgress: (percentage: string, _: string, remainingSize: string) => {
			process.stdout.clearLine(0);
			process.stdout.cursorTo(0);
			process.stdout.write(`${percentage}%	Remaining bytes:${remainingSize}`);
		},
		skipExistingFileName: true,
		onBeforeSave: (deducedName: string) => {
			filename = deducedName;
		},
		headers: {
			"User-Agent": "KNIME Tool",
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
