const CLI = require("clui");
const clear = require("clear");
const chalk = require("chalk");
const figlet = require("figlet");
const {version} = require("./package.json");

const Spinner = CLI.Spinner;
const countdown = new Spinner();
const head = chalk.cyanBright;
const text = chalk.white;
const textSub = chalk.grey;
const textHead = chalk.white.bold;
const progress = chalk.inverse;
const successHead = chalk.greenBright.bold;
const errorHead = chalk.redBright.bold;
const log = console.log;
const MAJ_VERSION = 12;
const MIN_VERSION = 22;

const isCompatibleVersion = () => {
  const nVersion = process.version.substring(1).split(".");
  const showWarning = (msg) => {
    log(textHead(`# Warning #`), text(`\n ${msg}`));
  };
  const wMsg = `Current Version: ${process.version}\n Compatible Node version >=12.22 & < 13\n`;
  if (nVersion[0] != MAJ_VERSION) {
    showWarning(wMsg);
  } else {
    if (nVersion[1] < MIN_VERSION) {
      showWarning(wMsg);
    }
  }
};
const updateStatus = status => {
  countdown.message(` ${status}`);
};
const initStatus = () => {
  countdown.start(` Intializing ...`);
};
const endStatus = () => {
  countdown.stop();
};
const printCliHeader = () => {
  clear();
  log(
    head(
      figlet.textSync(" WaveMaker ", {
        horizontalLayout: "default",
      })
    )
  );
  log(head(` * A CLI to generate Single-spa files for WaveMaker App * `));
  log(textHead(`\n                www.wavemakeronline.com`));
  log(text(`                     version: ${version}`));
  log(textHead(`\n# Usage Examples #`));
  log(
    textHead(`npx @wavemaker/wm-sspa-cli`),
    text(` --project-path <local_project_path> --deploy-url <deploy_url> --sspa-deploy-url <sspa_deploy_url>`)
  );
  log(
    textHead(`npx @wavemaker/wm-sspa-cli`),
    text(` -p <local_project_path> -d <deploy_url> -s <sspa_deploy_url>`)
  );
  log("\n");
  isCompatibleVersion();
  if(process.env.PROJECT_PATH && process.env.DEPLOY_URL) {
  log(text(`Project Location:`),textHead(process.env.PROJECT_PATH))
  log(text(`Deployed URL:`),textHead(process.env.DEPLOY_URL))
  log(text(`SSPA Deployed URL:`),textHead(process.env.SSPA_DEPLOY_URL))
  log("\n");
}
};

const printSuccess = msg => {
  printCliHeader();
  log(successHead(`\n# SUCCESS #`));
  log(text(msg));
  log("\n");
};
const printFailure = msg => {
  printCliHeader();
  log(errorHead(`\n# FAILED #`));
  log(textSub(msg));
  log("\n");
};
const printProgress = msg => {
  log(progress(msg));
};

module.exports = {
  initStatus,
  endStatus,
  updateStatus,
  printCliHeader,
  printSuccess,
  printFailure,
  printProgress
};
