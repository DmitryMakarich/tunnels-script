const { exec } = require("child_process");
const { readFileSync, writeFileSync } = require("fs");
const {
  tunnelsOptions,
  backendEnvs,
  frontendEnvs,
  backendEnvPath,
  frontendRetailerEnvPath,
  frontendSupplierEnvPath,
  getStartTunnelCommand,
  getEnvRegex,
} = require("./utils");

function rewriteEnvs(path, envs) {
  const data = readFileSync(path);
  const parsedData = data.toString();

  let newEnv = parsedData;
  envs.forEach(({ env, value }) => {
    newEnv = newEnv.replace(getEnvRegex(env), env + "=" + value);
  });

  writeFileSync(path, newEnv);
}

function main() {
  const tunnelCommands = tunnelsOptions.map(({ port, subdomain }) =>
    getStartTunnelCommand(+port, subdomain)
  );

  const command = tunnelCommands
    .map((tunnelCommand) => `start cmd.exe /k "${tunnelCommand}"`)
    .join(" & ");

  const childProcess = exec(command, { shell: true }, (err, stdout, stderr) => {
    console.error(err);
    console.log(stdout);
    console.error(stderr);
  });

  childProcess.on("exit", (code) => {
    console.log(`Exit with code - ${code}`);

    rewriteEnvs(backendEnvPath, backendEnvs);
    rewriteEnvs(frontendSupplierEnvPath, frontendEnvs);
    rewriteEnvs(frontendRetailerEnvPath, frontendEnvs);
  });
}

main();
