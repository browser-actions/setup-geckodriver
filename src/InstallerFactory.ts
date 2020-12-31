import { Platform, OS } from "./platform";
import Installer, {
  UnsupportedPlatformError,
  LinuxInstaller,
  MacOSInstaller,
} from "./Installer";

export default class InstallerFactory {
  create(platform: Platform): Installer {
    switch (platform.os) {
      case OS.LINUX:
        return new LinuxInstaller();
      case OS.MACOS:
        return new MacOSInstaller();
    }
    throw new UnsupportedPlatformError(platform);
  }
}
