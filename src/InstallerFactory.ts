import { Platform, OS } from "./platform";
import Installer, {
  UnsupportedPlatformError,
  LinuxInstaller,
} from "./Installer";

export default class InstallerFactory {
  create(platform: Platform): Installer {
    switch (platform.os) {
      case OS.LINUX:
        return new LinuxInstaller();
    }
    throw new UnsupportedPlatformError(platform);
  }
}
