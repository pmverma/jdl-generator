const { OptionNames, OptionValues } = require('jhipster-core/lib/core/jhipster/application_options');

function getClientFrameworksFor(jdlApp) {
  const jhAppTypes = OptionValues[OptionNames.APPLICATION_TYPE];
  const jhClientFramework = OptionValues[OptionNames.CLIENT_FRAMEWORK];

  const jdlAppType = jdlApp.getConfigurationOptionValue(OptionNames.APPLICATION_TYPE);

  let clientFramework = [];
  switch (jdlAppType) {
    case jhAppTypes.monolith:
    case jhAppTypes.gateway:
      clientFramework = Object.values(jhClientFramework)
      .filter(value => typeof value !== 'function')
      .filter(value => value !== 'angular');
      break;
    case jhAppTypes.microservice:
    case jhAppTypes.uaa:
    default:
      break;
  }
  return clientFramework;
}

module.exports = {
  getClientFrameworksFor: getClientFrameworksFor
}
