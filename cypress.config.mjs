import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, args) => {
        console.log("browser", browser);

        if (browser.family === "chrome") {
          console.log("adding dark mode browser flags");
          args.push("--force-dark-mode=true");

          return args;
        }
      });
    },
  },
});
