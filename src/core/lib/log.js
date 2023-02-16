import chalk from "chalk";

const log = {}

log.show = (data) => {
    console.log(chalk.green(data))
}

log.error = (data) => {
    console.log(chalk.red(data))
}

log.warn = (data) => {
    console.log(chalk.yellow(data));
}

log.blue = data => console.log(chalk.blueBright(data))

export { log }


