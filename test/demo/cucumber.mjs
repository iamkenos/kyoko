import { configure } from "../../build/config/index.js";

export default configure({
  baseURL: "http://localhost:8080/",
  browserOptions: { instance: "chromium", headless: true },
  timeout: 8000,
  parallel: 10,
  logLevel: "info",
  snapshots: { images: { maxDiffPixelRatio: 0.5 } }
});
