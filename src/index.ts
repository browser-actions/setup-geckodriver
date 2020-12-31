import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as tc from "@actions/tool-cache";
import * as httpm from "@actions/http-client";
import { getPlatform, Platform } from "./platform";
import InstallerFactory from "./InstallerFactory";

type GitHubReleaseApiResponse = {
  tag_name: string;
};

const getLatestVersion = async (): Promise<string> => {
  const apiURL = `https://api.github.com/repos/mozilla/geckodriver/releases/latest`;
  const http = new httpm.HttpClient("setup-geckodrive");
  const resp = await http.getJson<GitHubReleaseApiResponse>(apiURL);
  if (resp.statusCode !== httpm.HttpCodes.OK) {
    throw new Error(
      `Failed to get latest version: server returns ${resp.statusCode}`
    );
  }
  if (resp.result === null) {
    throw new Error("Failed to get latest version: server returns empty body");
  }
  return resp.result.tag_name.replace("^v", "");
};

const install = async (
  version: string,
  platform: Platform
): Promise<string> => {
  const toolPath = tc.find("geckodriver", version);
  if (toolPath) {
    core.info(`Found in cache @ ${toolPath}`);
    return toolPath;
  }

  const installer = new InstallerFactory().create(platform);
  const url = installer.getURL(version, platform);

  core.info(`Downloading geckodriver ${version} from ${url}`);
  const archivePath = await tc.downloadTool(url);

  core.info(`Extracting ${archivePath}`);
  const installDir = await installer.extract(archivePath);

  const cachedDir = await tc.cacheDir(installDir, "geckodriver", version);
  core.info(`Successfully cached geckodriver ${version} to ${cachedDir}`);
  return cachedDir;
};

const run = async (): Promise<void> => {
  try {
    let version = core.getInput("geckodriver-version") || "latest";
    const platform = getPlatform();
    if (version === "latest") {
      version = await getLatestVersion();
    }

    core.info(`Setup geckodriver ${version}`);

    const toolPath = await install(version, platform);
    core.addPath(toolPath);

    core.info(`Successfully setup geckodriver version ${version}`);

    await exec.exec("geckodriver", ["--version"]);
  } catch (error) {
    core.setFailed(error.message);
  }
};

run();
