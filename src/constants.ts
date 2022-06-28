import { homedir } from "os";

export const ARTIFACTORY_API_URL =
	"https://artifactory.knime.com/ui/api/v1/ui/nativeBrowser/generic-downloads/knime/analytics-platform/standard";
export const ARTIFACTORY_DOWNLOAD_URL = "https://artifactory.knime.com/artifactory/generic-downloads/knime/analytics-platform/standard/";
export const EXTENSIONS = ["org.knime.features.ui.feature.group", "org.knime.features.core.streaming.feature.group"];
export const KNIMEINI = ["-Dchromium.remote_debugging_port=8888", "-Dchromium.debug", "-Dperspective=org.knime.ui.java.perspective"];
export const DOWNLOAD_FOLDER = homedir() + "/knime-tool";
export const REPOSITORIES = ["https://update.knime.com/analytics-platform/4.6"];

export const DOWNLOAD_URL = {
	standard: {
		macosx: "https://download.knime.org/analytics-platform/macosx/knime_4.6.0.app.macosx.cocoa.x86_64.dmg",
		win: "https://download.knime.org/analytics-platform/win/knime_4.6.0.win32.win32.x86_64.zip",
		linux: "https://download.knime.org/analytics-platform/linux/knime_4.6.0.linux.gtk.x86_64.tar.gz",
	},
	nightly: {
		macosx: "https://download.knime.org/analytics-platform/nightly/macosx/knime_latest.app.macosx.cocoa.x86_64.dmg",
		win: "https://download.knime.org/analytics-platform/nightly/win/knime_latest.win32.win32.x86_64.zip",
		linux: "https://download.knime.org/analytics-platform/nightly/linux/knime_latest.linux.gtk.x86_64.tar.gz",
	},
};
