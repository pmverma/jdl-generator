const { OptionNames, OptionValues } = require('jhipster-core/lib/core/jhipster/application_options');

function getDatabaseTypesFor(jdlApp) {
  const jhAppTypes = OptionValues[OptionNames.APPLICATION_TYPE];
  const jhDatabaseTypes = OptionValues[OptionNames.DATABASE_TYPE];
  const jhAuthTypes = OptionValues[OptionNames.AUTHENTICATION_TYPE];

  const jdlAppType = jdlApp.getConfigurationOptionValue(OptionNames.APPLICATION_TYPE);
  const jdlAuthType = jdlApp.getConfigurationOptionValue(OptionNames.AUTHENTICATION_TYPE);

  let databaseTypes = Object.values(jhDatabaseTypes).filter(value => typeof value !== 'function');
  if (jdlAppType === jhAppTypes.uaa) {
    databaseTypes = databaseTypes.filter(value => value !== jhDatabaseTypes.no);
  }
  if (jdlAuthType === jhAuthTypes.oauth2) {
    databaseTypes = databaseTypes.filter(value => value !== jhDatabaseTypes.cassandra);
  }
  return databaseTypes;
}

function getProdDatabaseTypeFor(jdlApp) {
  const jhDatabaseTypes = OptionValues[OptionNames.DATABASE_TYPE];
  const jhProdDatabaseTypes = OptionValues[OptionNames.PROD_DATABASE_TYPE];

  const jdlDatabaseType = jdlApp.getConfigurationOptionValue(OptionNames.DATABASE_TYPE);

  let prodDatabaseTypes = [];

  if (jdlDatabaseType === jhDatabaseTypes.sql) {
    prodDatabaseTypes = Object.values(jhProdDatabaseTypes)
      .filter(value => typeof value !== 'function')
      .filter(value => value !== jhProdDatabaseTypes.no);
  } else if (jdlDatabaseType === jhDatabaseTypes.no) {
    prodDatabaseTypes = [jhDatabaseTypes.no];
  } else {
    prodDatabaseTypes = [jdlDatabaseType];
  }

  return prodDatabaseTypes;
}
function getDevDatabaseTypeFor(jdlApp) {
  const jhDatabaseTypes = OptionValues[OptionNames.DATABASE_TYPE];
  const jhDevDatabaseTypes = OptionValues[OptionNames.DEV_DATABASE_TYPE];

  const jdlDatabaseType = jdlApp.getConfigurationOptionValue(OptionNames.DATABASE_TYPE);
  const jdlProdDatabaseType = jdlApp.getConfigurationOptionValue(OptionNames.PROD_DATABASE_TYPE);

  let devDatabaseTypes = [];

  if (jdlDatabaseType === jhDatabaseTypes.sql) {
    devDatabaseTypes = Object.values(jhDevDatabaseTypes).filter(value => typeof value !== 'function').filter(value => value !== 'h2Memory');
    devDatabaseTypes.push(jdlProdDatabaseType);
  } else {
    devDatabaseTypes = [jdlProdDatabaseType];
  }

  return devDatabaseTypes;
}

module.exports = {
  getDatabaseTypesFor: getDatabaseTypesFor,
  getDevDatabaseTypeFor: getDevDatabaseTypeFor,
  getProdDatabaseTypeFor: getProdDatabaseTypeFor
}
