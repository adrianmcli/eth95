module.exports = {
  networks: {
    develop: {
      port: 8545,
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
      version: "^0.6.8",
    },
  },
};
