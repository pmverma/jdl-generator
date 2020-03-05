const { OptionNames, OptionValues } = require('jhipster-core/lib/core/jhipster/application_options');

function getHibernateCacheOptionsFor(jdlApp) {
  const jhAppTypes = OptionValues[OptionNames.APPLICATION_TYPE];
  const jhDatabaseTypes = OptionValues[OptionNames.DATABASE_TYPE];
  const jhCacheProvider = OptionValues[OptionNames.CACHE_PROVIDER];

  const jdlAppType = jdlApp.getConfigurationOptionValue(OptionNames.APPLICATION_TYPE);
  const jdlDatabaseType = jdlApp.getConfigurationOptionValue(OptionNames.DATABASE_TYPE);
  const jdlCacheProvider = jdlApp.getConfigurationOptionValue(OptionNames.CACHE_PROVIDER);

  let hibernateOptions = [false];
  if (jdlDatabaseType === jhDatabaseTypes.sql &&
    ((jdlCacheProvider !== jhCacheProvider.no && jdlCacheProvider !== jhCacheProvider.memcached)
      || jdlAppType === jhAppTypes.gateway)) {
    hibernateOptions = [true, false]
  }

  return hibernateOptions;
}

module.exports = {
  getHibernateCacheOptionsFor: getHibernateCacheOptionsFor
}
