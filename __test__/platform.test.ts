import os from "node:os";
import { afterEach, expect, test, vi } from "vitest";
import { Arch, getArch } from "../src/platform";

afterEach(() => {
  vi.restoreAllMocks();
});

test("maps Node.js ia32 architecture to i686", () => {
  vi.spyOn(os, "arch").mockReturnValue("ia32");

  expect(getArch()).toBe(Arch.I686);
});
