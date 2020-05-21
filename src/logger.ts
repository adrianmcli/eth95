import chalk from "chalk";

export const TAG_ERROR = chalk.red("error");
export const TAG_SUCCESS = chalk.green("success");
export const TAG_INFO = chalk.yellow("info");

const getTime = () =>
  `[${new Date().toLocaleTimeString("en-US", { hour12: false })}]`;

export default {
  error: (x: string) => console.log(getTime(), TAG_ERROR, x),
  success: (x: string) => console.log(getTime(), TAG_SUCCESS, x),
  info: (x: string) => console.log(getTime(), TAG_INFO, x),
};
