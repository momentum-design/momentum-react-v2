const fs = require("fs");
const path = require("path");
const sass = require("node-sass");
const writeFileSyncRecursive = require("./writeFileSyncRecursive");

const tokenFiles = {
  lmLightTokens: { name: "lmLight", path: `${path.resolve("./src")}/wc_scss/themes/vars/lmLight.scss` },
  lmDarkTokens: { name: "lmDark", path: `${path.resolve("./src")}/wc_scss/themes/vars/lmDark.scss` },
  mdDarkTokens: { name: "mdDark", path: `${path.resolve("./src")}/wc_scss/themes/vars/mdDark.scss` },
  mdLightTokens: { name: "mdLight", path: `${path.resolve("./src")}/wc_scss/themes/vars/mdLight.scss` }
};

const makeFriendlyScss = async fileData => {
  await fs.readFile(fileData["path"], "utf8", async (err, data) => {
    if (err) {
      console.log(err);
    }
    const newData = await data.replace(/@\//g, "../src/");
    writeFileSyncRecursive(`./stats/tokens/${fileData["name"]}.scss`, newData, "utf8");
  });
};

const compileCss = file => {
  sass.render({
    file: "./stats/tokens/node-friendly.scss",
    outFile: "./stats/tokens/tokens.css"
  });
};

for (const theme in tokenFiles) {
  makeFriendlyScss(tokenFiles[theme]).catch(err => console.log(err));
}
