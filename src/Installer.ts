import * as tc from "@actions/tool-cache";
import { Platform, Arch } from "./platform";

export class UnsupportedPlatformError extends Error {
  constructor(
    private readonly platform: Platform,
    private readonly version?: string
  ) {
    super(
      version
        ? `Unsupported platform ${platform.os} ${platform.arch} for version ${version}`
        : `Unsupported platform ${platform.os} ${platform.arch}`
    );

    this.name = "UnsupportedPlatform";
  }
}

export default interface Installer {
  getURL(version: string, platform: Platform): string;
  extract(archive: string): Promise<string>;
}

export class LinuxInstaller implements Installer {
  getURL(version: string, platform: Platform): string {
    switch (platform.arch) {
      case Arch.I686:
        return `https://github.com/mozilla/geckodriver/releases/download/v${version}/geckodriver-v${version}-linux32.tar.gz`;
      case Arch.AMD64:
        return `https://github.com/mozilla/geckodriver/releases/download/v${version}/geckodriver-v${version}-linux64.tar.gz`;
    }
    throw new UnsupportedPlatformError(platform, version);
  }

  extract(archive: string): Promise<string> {
    return tc.extractTar(archive);
  }
}

export class MacOSInstaller implements Installer {
  getURL(version: string, platform: Platform): string {
    switch (platform.arch) {
      case Arch.AMD64:
        return `https://github.com/mozilla/geckodriver/releases/download/v${version}/geckodriver-v${version}-macos.tar.gz`;
      case Arch.ARM64:
        return `https://github.com/mozilla/geckodriver/releases/download/v${version}/geckodriver-v${version}-macos-aarch64.tar.gz`;
    }
    throw new UnsupportedPlatformError(platform, version);
  }

  extract(archive: string): Promise<string> {
    return tc.extractTar(archive);
  }
}

export class WindowsInstaller implements Installer {
  getURL(version: string, platform: Platform): string {
    switch (platform.arch) {
      case Arch.I686:
        return `https://github.com/mozilla/geckodriver/releases/download/v${version}/geckodriver-v${version}-win32.zip`;
      case Arch.AMD64:
        return `https://github.com/mozilla/geckodriver/releases/download/v${version}/geckodriver-v${version}-win64.zip`;
    }
    throw new UnsupportedPlatformError(platform, version);
  }

  extract(archive: string): Promise<string> {
    return tc.extractTar(archive);
  }
}
