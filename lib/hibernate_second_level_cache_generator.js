const { OptionNames, OptionValues } = require('jhipster-core/lib/core/jhipster/application_options');

function getHibernateCacheOptionFor(jdlApp) {
    const jhAppTypes = OptionValues[OptionNames.APPLICATION_TYPE];
    const jhDatabaseTypes = OptionValues[OptionNames.DATABASE_TYPE];
    const jhCacheProvider = OptionValues[OptionNames.CACHE_PROVIDER];

    const jdlAppType = jdlApp.getOptionValue(OptionNames.APPLICATION_TYPE);
    const jdlDatabaseType = jdlApp.getOptionValue(OptionNames.DATABASE_TYPE);
    const jdlCacheProvider = jdlApp.getOptionValue(OptionNames.CACHE_PROVIDER);

    let hibernateOptions;
    if (jdlDatabaseType === jhDatabaseTypes.sql &&
        ((jdlCacheProvider !== jhCacheProvider.no && jdlCacheProvider !== jhCacheProvider.memcached)
            || jdlAppType === jhAppTypes.gateway)) {
                hibernateOptions = [true, false]
    }

    return hibernateOptions;
}

module.exports = {
    getHibernateCacheOptionFor: getHibernateCacheOptionFor
}