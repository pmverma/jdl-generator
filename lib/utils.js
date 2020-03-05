const { OptionNames, OptionValues } = require('jhipster-core/lib/core/jhipster/application_options');

function mergeMaps(map1, map2) {
  return new Map([...map1, ...map2]);
}

function getJdlFilename(jdlApp) {
  let filename = '';
  filename+=jdlApp.getConfigurationOptionValue(OptionNames.APPLICATION_TYPE).toString().concat('-');
  filename+=jdlApp.getConfigurationOptionValue(OptionNames.AUTHENTICATION_TYPE).toString().concat('-');
  filename+=jdlApp.getConfigurationOptionValue(OptionNames.BUILD_TOOL).toString().concat('-');
  filename+=jdlApp.getConfigurationOptionValue(OptionNames.CACHE_PROVIDER).toString().concat('-');
  filename+=jdlApp.getConfigurationOptionValue(OptionNames.CLIENT_FRAMEWORK).toString().concat('-');
  filename+=jdlApp.getConfigurationOptionValue(OptionNames.ENABLE_HIBERNATE_CACHE).toString().concat('-');
  filename+=jdlApp.getConfigurationOptionValue(OptionNames.CLIENT_PACKAGE_MANAGER).toString().concat('-');
  filename+=jdlApp.getConfigurationOptionValue(OptionNames.DATABASE_TYPE).toString().concat('-');
  filename+=jdlApp.getConfigurationOptionValue(OptionNames.PROD_DATABASE_TYPE).toString().concat('-');
  filename+=jdlApp.getConfigurationOptionValue(OptionNames.DEV_DATABASE_TYPE).toString().concat('-');
  filename+=jdlApp.getConfigurationOptionValue(OptionNames.ENABLE_HIBERNATE_CACHE).toString().concat('-');
  filename+=jdlApp.getConfigurationOptionValue(OptionNames.TEST_FRAMEWORKS).toString();
  return filename;
}

module.exports = {
  mergeMaps: mergeMaps,
  getJdlFilename: getJdlFilename
}
