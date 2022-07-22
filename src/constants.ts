import { homedir } from "os";
import Conf from "conf"

const config = new Conf({
	projectName: "knime-tool",
	defaults: {
		ARTIFACTORY_API_URL: "https://artifactory.knime.com/ui/api/v1/ui/nativeBrowser/generic-downloads/knime/analytics-platform",
		ARTIFACTORY_DOWNLOAD_URL: "https://artifactory.knime.com/artifactory/generic-downloads/knime/analytics-platform",
		EXTENSIONS: [
			"org.knime.features.ui.feature.group",
			"org.knime.features.core.streaming.feature.group",
			"org.knime.features.ext.itemset.feature.group",
			"org.knime.features.ext.textprocessing.feature.group",
			"org.knime.features.reporting.designer.feature.group"],
		KNIMEINI: ["-Dchromium.remote_debugging_port=8888", "-Dchromium.debug", "-Dperspective=org.knime.ui.java.perspective"],
		DOWNLOAD_FOLDER: homedir() + "/knime-tool",
		REPOSITORIES: ["https://update.knime.com/analytics-platform/4.6"],
		DOWNLOAD_URL: {
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
		},
		VERSIONS: ["4.4.4", "4.5.0", "4.5.1", "4.5.2", "4.6.0", "4.6.1"]
	}
});

export const CONFIG_FILE = config.path;
export const ARTIFACTORY_API_URL = config.get("ARTIFACTORY_API_URL");
export const ARTIFACTORY_DOWNLOAD_URL = config.get("ARTIFACTORY_DOWNLOAD_URL");
export const EXTENSIONS = config.get("EXTENSIONS");
export const KNIMEINI = config.get("KNIMEINI");
export const DOWNLOAD_FOLDER = config.get("DOWNLOAD_FOLDER");
export const REPOSITORIES = config.get("REPOSITORIES");
export const DOWNLOAD_URL = config.get("DOWNLOAD_URL");
export const VERSIONS = config.get("VERSIONS");
