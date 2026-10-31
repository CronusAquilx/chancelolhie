import { beforeEach, describe, expect, it, vi } from "vitest";
import { installGame, loadLibrary, uninstallGame } from "./store";
const saved = (user: string) => JSON.parse(localStorage.getItem(`console-library:${user}`) ?? "{}");
describe("Console per-user library", () => {
 beforeEach(() => { vi.useFakeTimers(); localStorage.clear(); });
 it("finishes an install then persists and removes it on uninstall", () => {
  loadLibrary("install-test"); installGame("arcade:1-fix2.html"); vi.advanceTimersByTime(10000);
  expect(saved("install-test").installed).toEqual(["arcade:1-fix2.html"]);
  uninstallGame("arcade:1-fix2.html"); expect(saved("install-test").installed).toEqual([]);
  vi.useRealTimers();
 });
 it("does not carry a pending installation into another user's library", () => {
  loadLibrary("owner-a"); installGame("cloud:gta"); loadLibrary("owner-b"); vi.advanceTimersByTime(10000);
  installGame("arcade:2-fix3.html"); vi.advanceTimersByTime(10000);
  expect(saved("owner-b").installed).toEqual(["arcade:2-fix3.html"]);
  expect(localStorage.getItem("console-library:owner-a")).toBeNull();
  vi.useRealTimers();
 });
});
