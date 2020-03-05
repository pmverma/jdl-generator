const { OptionNames, OptionValues } = require('jhipster-core/lib/core/jhipster/application_options');

function getServiceDiscoveryTypesFor(jdlApp) {
  const jhAppTypes = OptionValues[OptionNames.APPLICATION_TYPE];

}

module.exports = {
  getServiceDiscoveryTypesFor: getServiceDiscoveryTypesFor
}
