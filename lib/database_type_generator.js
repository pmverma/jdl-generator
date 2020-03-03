const { OptionNames, OptionValues } = require('jhipster-core/lib/core/jhipster/application_options');

function getDatabaseTypesFor(jdlApp) {
    const jhAppTypes = OptionValues[OptionNames.APPLICATION_TYPE];
    const jhDatabaseTypes = OptionValues[OptionNames.DATABASE_TYPE];
    const jhAuthTypes = OptionValues[OptionNames.AUTHENTICATION_TYPE];

    const jdlAppType = jdlApp.getOptionValue(OptionNames.APPLICATION_TYPE);
    const jdlAuthType = jdlApp.getOptionValue(OptionNames.AUTHENTICATION_TYPE);

    let databaseTypes = Object.values(jhDatabaseTypes).filter(value => typeof value !== 'function');
    if (jdlAppType === jhAppTypes.uaa) {
        databaseTypes = databaseTypes.filter(value => value !== jhDatabaseTypes.no);
    }
    if (jdlAuthType === jhAuthTypes.oauth2) {
        databaseTypes = databaseTypes.filter(value => value !== jhDatabaseTypes.cassandra);
    }
    return databaseTypes;
}

function getDevDatabaseTypeFor(jdlApp) {
    const jhDevDatabaseTypes = OptionValues[OptionNames.DEV_DATABASE_TYPE];
    const jhDatabaseTypes = OptionValues[OptionNames.DATABASE_TYPE];

    const jdlDatabaseType = jdlApp.getOptionValue(OptionNames.DATABASE_TYPE);
    const jdlProdDatabaseType = jdlApp.getOptionValue(OptionNames.PROD_DATABASE_TYPE);

    let devDatabaseTypes;

    if (jdlDatabaseType === jhDatabaseTypes.sql) {
        devDatabaseTypes = Object.values(jhDevDatabaseTypes).filter(value => typeof value !== 'function');
        devDatabaseTypes.push(jdlProdDatabaseType);
    } else {
        devDatabaseTypes = [jdlProdDatabaseType];
    }

    return devDatabaseTypes;
}

module.exports = {
    getDatabaseTypesFor: getDatabaseTypesFor,
    getDevDatabaseTypeFor: getDevDatabaseTypeFor
}