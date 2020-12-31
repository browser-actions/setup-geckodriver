import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as tc from "@actions/tool-cache";
import { getPlatform, Platform } from "./platform";
import InstallerFactory from "./InstallerFactory";

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
    const version = core.getInput("geckodriver-version") || "latest";
    const platform = getPlatform();

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
