const { OptionNames, OptionValues } = require('jhipster-core/lib/core/jhipster/application_options');
const Utils = require('./utils');

function getValuesFor(oName) {
    oValues = OptionValues[oName];
    let result = new Map();
    if (typeof oValues === 'boolean') {
        result.set(oName, [true, false]);
    } else if (typeof oValues === 'string') {
        result.set(oName, [oValues]);
    } else {
        result.set(oName, Object.values(oValues).filter(value => typeof value !== 'function'));
    }
    return result;
}

function getApplicationTypes() {
    return getValuesFor(OptionNames.APPLICATION_TYPE);
}

function getAuthenticationTypes() {
    return getValuesFor(OptionNames.AUTHENTICATION_TYPE);
}

function getBasename() {
    return getValuesFor(OptionNames.BASE_NAME);
}

function getBuildTools() {
    return getValuesFor(OptionNames.BUILD_TOOL);
}

function getCacheProvider() {
    return getValuesFor(OptionNames.CACHE_PROVIDER);
}

function getClientFramework() {
    return getValuesFor(OptionNames.CLIENT_FRAMEWORK);
}

function getClientPackageManager() {
    return getValuesFor(OptionNames.CLIENT_PACKAGE_MANAGER);
}

function getDatabaseType() {
    return getValuesFor(OptionNames.DATABASE_TYPE);
}

function getDevDatabaseType() {
    return getValuesFor(OptionNames.DEV_DATABASE_TYPE);
}

function getDtoSuffix() {
    return getValuesFor(OptionNames.DTO_SUFFIX);
}

function getEnableHibernateCache() {
    return getValuesFor(OptionNames.ENABLE_HIBERNATE_CACHE);
}

function getEnableSwaggerCodegen() {
    return getValuesFor(OptionNames.ENABLE_SWAGGER_CODEGEN);
}

function getEnableTranslation() {
    return getValuesFor(OptionNames.ENABLE_TRANSLATION);
}

function getEntitySuffix() {
    return getValuesFor(OptionNames.ENTITY_SUFFIX);
}

function getJhiPrefix() {
    return getValuesFor(OptionNames.JHI_PREFIX);
}

function getLanguages() {
    return getValuesFor(OptionNames.LANGUAGES);
}

function getMessageBroker() {
    return getValuesFor(OptionNames.MESSAGE_BROKER);
}

function getPackageName() {
    return getValuesFor(OptionNames.PACKAGE_NAME);
}

function getPackageFolder() {
    return getValuesFor(OptionNames.PACKAGE_FOLDER);
}

function getProdDatabaseType() {
    return getValuesFor(OptionNames.PROD_DATABASE_TYPE);
}

function getReactive() {
    return getValuesFor(OptionNames.REACTIVE);
}

function getSearchEngine() {
    return getValuesFor(OptionNames.SEARCH_ENGINE);
}

function getServiceDiscoveryType() {
    return getValuesFor(OptionNames.SERVICE_DISCOVERY_TYPE);
}

function getSkipClient() {
    return getValuesFor(OptionNames.SKIP_CLIENT);
}

function getSkipServer() {
    return getValuesFor(OptionNames.SKIP_SERVER);
}

function getSkipUserManagement() {
    return getValuesFor(OptionNames.SKIP_USER_MANAGEMENT);
}

function getUaaBaseName() {
    return getValuesFor(OptionNames.UAA_BASE_NAME);
}

function getUseSass() {
    return getValuesFor(OptionNames.USE_SASS);
}

function getWebSocket() {
    return getValuesFor(OptionNames.WEBSOCKET);
}

function getAllOptionsAsMap() {
    let allOptions = new Map();
    allOptions = Utils.mergeMaps(allOptions, getApplicationTypes());
    allOptions = Utils.mergeMaps(allOptions, getAuthenticationTypes());
    allOptions = Utils.mergeMaps(allOptions, getApplicationTypes());
    allOptions = Utils.mergeMaps(allOptions, getAuthenticationTypes());
    allOptions = Utils.mergeMaps(allOptions, getBasename());
    allOptions = Utils.mergeMaps(allOptions, getBuildTools());
    allOptions = Utils.mergeMaps(allOptions, getCacheProvider());
    allOptions = Utils.mergeMaps(allOptions, getClientFramework());
    allOptions = Utils.mergeMaps(allOptions, getClientPackageManager());
    allOptions = Utils.mergeMaps(allOptions, getDatabaseType());
    allOptions = Utils.mergeMaps(allOptions, getDevDatabaseType());
    allOptions = Utils.mergeMaps(allOptions, getDtoSuffix());
    allOptions = Utils.mergeMaps(allOptions, getEnableHibernateCache());
    allOptions = Utils.mergeMaps(allOptions, getEnableSwaggerCodegen());
    allOptions = Utils.mergeMaps(allOptions, getEnableTranslation());
    allOptions = Utils.mergeMaps(allOptions, getEntitySuffix());
    allOptions = Utils.mergeMaps(allOptions, getJhiPrefix());
    allOptions = Utils.mergeMaps(allOptions, getLanguages());
    allOptions = Utils.mergeMaps(allOptions, getMessageBroker());
    allOptions = Utils.mergeMaps(allOptions, getPackageName());
    allOptions = Utils.mergeMaps(allOptions, getPackageFolder());
    allOptions = Utils.mergeMaps(allOptions, getProdDatabaseType());
    allOptions = Utils.mergeMaps(allOptions, getReactive());
    allOptions = Utils.mergeMaps(allOptions, getSearchEngine());
    allOptions = Utils.mergeMaps(allOptions, getServiceDiscoveryType());
    allOptions = Utils.mergeMaps(allOptions, getSkipClient());
    allOptions = Utils.mergeMaps(allOptions, getSkipServer());
    allOptions = Utils.mergeMaps(allOptions, getSkipUserManagement());
    allOptions = Utils.mergeMaps(allOptions, getUaaBaseName());
    allOptions = Utils.mergeMaps(allOptions, getUseSass());
    allOptions = Utils.mergeMaps(allOptions, getWebSocket());
    return allOptions;
}

module.exports = {
    getAllOptionsAsMap: getAllOptionsAsMap
}
