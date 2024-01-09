const filePathRegex = new RegExp(/([A-Za-z]:\\)((?:.*\\)?)/);

// Check paths to your projects
const backendEnvPath = "../API/.example";
const frontendSupplierEnvPath = "../CLIENT/.example.supplier";
const frontendRetailerEnvPath = "../CLIENT/.example.retailer";

// you can set own subdomains
const tunnelsOptions = [
  {
    port: 3001,
    subdomain: "cs-api",
  },
  {
    port: 4000,
    subdomain: "cs-sup",
  },
  {
    port: 4001,
    subdomain: "cs-ret",
  },
];

const backendEnvs = [
  {
    env: "ORIGIN",
    value: getTunnelUrl(tunnelsOptions[0].subdomain),
  },
  {
    env: "SHOPIFY_WEBHOOK_SERVICE_ORIGIN",
    value: getTunnelUrl(tunnelsOptions[0].subdomain),
  },
  {
    env: "SHOPIFY_SUPPLIER_FRONT_END_URL",
    value: getTunnelUrl(tunnelsOptions[1].subdomain),
  },
  {
    env: "SHOPIFY_RETAILER_FRONT_END_URL",
    value: getTunnelUrl(tunnelsOptions[2].subdomain),
  },
];

const frontendEnvs = [
  {
    env: "REACT_APP_BACK_END_URL",
    value: getTunnelUrl(tunnelsOptions[0].subdomain),
  },
];

function getEnvRegex(envName) {
  return new RegExp(
    `^${envName}=((http|https|ftp):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)`,
    "im"
  );
}

function getTunnelUrl(subdomain) {
  return `https://${subdomain}.loca.lt`;
}

function getStartTunnelCommand(port, subdomain) {
  if (typeof port !== "number") {
    throw new Error("Invalid port");
  }

  return `lt -p ${port} -s ${subdomain}`;
}

function getArgument(flag) {
  const flagIndex = process.argv.indexOf(flag);
  return process.argv[flagIndex + 1];
}

module.exports = {
  filePathRegex,
  tunnelsOptions,
  backendEnvs,
  frontendEnvs,
  backendEnvPath,
  frontendSupplierEnvPath,
  frontendRetailerEnvPath,
  getEnvRegex,
  getTunnelUrl,
  getStartTunnelCommand,
  getArgument,
};
