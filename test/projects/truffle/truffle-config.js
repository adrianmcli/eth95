module.exports = {
  networks: {
    develop: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    },
    // config for e2e test
    test: {
      host: "localhost",
      port: process.env.E2E_GANACHE_PORT,
      network_id: "*",
      skipDryRun: true,
    },
  },
  compilers: {
    solc: {
      version: "0.8.14",
    },
  },
};
