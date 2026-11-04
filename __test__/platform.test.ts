import { jest } from "@jest/globals";
import os from "os";
import { Arch, getArch } from "../src/platform";

afterEach(() => {
  jest.restoreAllMocks();
});

test("maps Node.js ia32 architecture to i686", () => {
  jest.spyOn(os, "arch").mockReturnValue("ia32");

  expect(getArch()).toBe(Arch.I686);
});
