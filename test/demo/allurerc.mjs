import { defineConfig } from "allure";

export default defineConfig({
  name: "Demo Tests",
  appendHistory: true,
  plugins: { awesome: { options: { reportLanguage: "en" } } }
});
