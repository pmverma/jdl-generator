const JhCore = require('jhipster-core');
const _ = require('lodash');
const path = require('path');
const fs = require('fs');


const { createJDLApplication } = require('jhipster-core/lib/core/jdl_application_factory');
const { OptionNames, OptionValues } = require('jhipster-core/lib/core/jhipster/application_options');
const StringJDLApplicationConfigurationOption = require('jhipster-core/lib/core/string_jdl_application_configuration_option');
const BooleanJDLApplicationConfigurationOption = require('jhipster-core/lib/core/boolean_jdl_application_configuration_option');
const ListJDLApplicationConfigurationOption = require('jhipster-core/lib/core/list_jdl_application_configuration_option');

const { getAllOptionsAsMap } = require('./lib/application_options');
const { getAuthenticationTypesFor } = require('./lib/authentication_type_generator');
const { getDatabaseTypesFor, getProdDatabaseTypeFor, getDevDatabaseTypeFor } = require('./lib/database_type_generator');
const { getHibernateCacheOptionsFor } = require('./lib/hibernate_second_level_cache_generator');
const { getClientFrameworksFor } = require('./lib/client_framework_generator');
const Utils = require('./lib/utils');

const jdlDirPath = 'jdl-files';

const monolithApp = createJDLApplication({ applicationType: 'monolith', authenticationType: 'oauth2', baseName: 'mono', creationTimestamp: 42 });
// const microApp = createJDLApplication({ applicationType: 'microservice', baseName: 'mono', creationTimestamp: 42 });
// const gatewayApp = createJDLApplication({ applicationType: 'gateway', baseName: 'mono', creationTimestamp: 42 });
// const uaaApp = createJDLApplication({ applicationType: 'uaa', baseName: 'mono', creationTimestamp: 42 });
// console.log(monolithApp);
// console.log(monolithApp.getConfigurationOptionValue('applicationType'));

const jhOptions = getAllOptionsAsMap();
const jhAppTypes = jhOptions.get(OptionNames.APPLICATION_TYPE).filter(value => value === 'monolith');
const jhBaseName = jhOptions.get(OptionNames.BASE_NAME);
const jhPackageName = jhOptions.get(OptionNames.PACKAGE_NAME);
const jhPackageFolder = jhOptions.get(OptionNames.PACKAGE_FOLDER);
const jhServiceDiscoveryTypes = jhOptions.get(OptionNames.SERVICE_DISCOVERY_TYPE).filter(value => value === 'no');
const jhCacheTypes = jhOptions.get(OptionNames.CACHE_PROVIDER);
const jhBuildToolTypes = jhOptions.get(OptionNames.BUILD_TOOL);
const jhTestFrameworks = jhOptions.get(OptionNames.TEST_FRAMEWORKS);

let jdlApps = new Set();

// app type
jhAppTypes.forEach(jhAppType => {
  let jdlApplication;
  jdlApplication = createJDLApplication({ applicationType: jhAppType });
  jdlApplication.setConfigurationOption(new StringJDLApplicationConfigurationOption(OptionNames.BASE_NAME, jhBaseName[0]))
  jdlApplication.setConfigurationOption(new StringJDLApplicationConfigurationOption(OptionNames.PACKAGE_NAME, jhPackageName[0]));
  jdlApplication.setConfigurationOption(new StringJDLApplicationConfigurationOption(OptionNames.PACKAGE_FOLDER, jhPackageFolder[0]));
  jdlApplication.setConfigurationOption(new StringJDLApplicationConfigurationOption(OptionNames.SERVICE_DISCOVERY_TYPE, jhServiceDiscoveryTypes[0]));

  // auth type
  const jhAuthTypes = getAuthenticationTypesFor(jhAppType);
  jhAuthTypes.forEach(jhAuthType => {
    jdlApplication.setConfigurationOption(new StringJDLApplicationConfigurationOption(OptionNames.AUTHENTICATION_TYPE, jhAuthType));

    // database type
    const jhDatabaseTypes = getDatabaseTypesFor(jdlApplication);
    jhDatabaseTypes.forEach(jhDatabaseType => {
      jdlApplication.setConfigurationOption(new StringJDLApplicationConfigurationOption(OptionNames.DATABASE_TYPE, jhDatabaseType));

      // prod database type
      const jhProdDatabaseTypes = getProdDatabaseTypeFor(jdlApplication);
      jhProdDatabaseTypes.forEach(jhProdDatabaseType => {
        jdlApplication.setConfigurationOption(new StringJDLApplicationConfigurationOption(OptionNames.PROD_DATABASE_TYPE, jhProdDatabaseType));

        // dev database type
        const jhDevDatabaseTypes = getDevDatabaseTypeFor(jdlApplication);
        jhDevDatabaseTypes.forEach(jhDevDatabase => {
          jdlApplication.setConfigurationOption(new StringJDLApplicationConfigurationOption(OptionNames.DEV_DATABASE_TYPE, jhDevDatabase));

          // cache options
          jhCacheTypes.forEach(jhCacheType => {
            jdlApplication.setConfigurationOption(new StringJDLApplicationConfigurationOption(OptionNames.CACHE_PROVIDER, jhCacheType));

            // hibernate 2nd level cache
            const jhHibernateCacheOptions = getHibernateCacheOptionsFor(jdlApplication);
            jhHibernateCacheOptions.forEach(jhHibernateCacheOption => {
              jdlApplication.setConfigurationOption(new BooleanJDLApplicationConfigurationOption(OptionNames.ENABLE_HIBERNATE_CACHE, jhHibernateCacheOption));

              // build tool
              jhBuildToolTypes.forEach(jhBuildToolType => {
                jdlApplication.setConfigurationOption(new StringJDLApplicationConfigurationOption(OptionNames.BUILD_TOOL, jhBuildToolType));

                // client frameworks
                const jhClientFrameworks = getClientFrameworksFor(jdlApplication);
                jhClientFrameworks.forEach(jhClientFramework => {
                  jdlApplication.setConfigurationOption(new StringJDLApplicationConfigurationOption(OptionNames.CLIENT_FRAMEWORK, jhClientFramework));

                  // add test frameworks for all app
                  jdlApplication.setConfigurationOption(new ListJDLApplicationConfigurationOption(OptionNames.TEST_FRAMEWORKS, jhTestFrameworks));

                  const jdlAppClone = _.cloneDeep(jdlApplication);
                  jdlApps.add(jdlAppClone);
                });
              });
            });
          });
        });
      });
    });
  });
});

if (!fs.existsSync(jdlDirPath)) {
  fs.mkdirSync(jdlDirPath);
}

jdlApps.forEach(jdlApp => {
  const jdlValidateObject = new JhCore.ValidatedJDLObject();
  jdlValidateObject.addApplication(jdlApp);

  const jdlPath = Utils.getJdlFilename(jdlApp).concat(".jdl");
  JhCore.exportToJDL(jdlValidateObject, path.join(jdlDirPath, jdlPath));
});

