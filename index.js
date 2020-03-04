const _ = require('lodash');

const { getAllOptionsAsMap } = require('./lib/application_options');
const { getAuthenticationTypesFor } = require('./lib/authentication_type_generator');
const { getDatabaseTypesFor, getDevDatabaseTypeFor } = require('./lib/database_type_generator');
const { createJDLApplication } = require('jhipster-core/lib/core/jdl_application_factory');
const { OptionNames, OptionValues } = require('jhipster-core/lib/core/jhipster/application_options');
const JDLApplicationConfiguration = require('jhipster-core/lib/core/jdl_application_configuration');
const StringJDLApplicationConfigurationOption = require('jhipster-core/lib/core/string_jdl_application_configuration_option');
const IntegerJDLApplicationConfigurationOption = require('jhipster-core/lib/core/integer_jdl_application_configuration_option');
const BooleanJDLApplicationConfigurationOption = require('jhipster-core/lib/core/boolean_jdl_application_configuration_option');
const ListJDLApplicationConfigurationOption = require('jhipster-core/lib/core/list_jdl_application_configuration_option');


const monolithApp = createJDLApplication({ applicationType: 'monolith', authenticationType: 'oauth2', baseName: 'mono', creationTimestamp: 42 });

const microApp = createJDLApplication({ applicationType: 'microservice', baseName: 'mono', creationTimestamp: 42 });

const gatewayApp = createJDLApplication({ applicationType: 'gateway', baseName: 'mono', creationTimestamp: 42 });

const uaaApp = createJDLApplication({ applicationType: 'uaa', baseName: 'mono', creationTimestamp: 42 });

// console.log(monolithApp);
// console.log(getAllOptionsAsMap());
// console.log(monolithApp.hasConfigurationOption('applicationType'));
console.log(getDatabaseTypesFor(monolithApp))

const jhOptions = getAllOptionsAsMap();
const jhAppTypes = jhOptions.get(OptionNames.APPLICATION_TYPE).filter(value => value === 'monolith');
const jhBaseName = jhOptions.get(OptionNames.BASE_NAME);
const jhPackageName = jhOptions.get(OptionNames.PACKAGE_NAME);
const jhPackageFolder = jhOptions.get(OptionNames.PACKAGE_FOLDER);
const jhServiceDiscoveryTypes = jhOptions.get(OptionNames.SERVICE_DISCOVERY_TYPE).filter(value => value === 'no');
const jhAuthTypes = jhOptions.get(OptionNames.AUTHENTICATION_TYPE);
const jhDatabaseTypes = jhOptions.get(OptionNames.DATABASE_TYPE);
const jhCacheTypes = jhOptions.get(OptionNames.CACHE_PROVIDER);
const jhBuildToolTypes = jhOptions.get(OptionNames.BUILD_TOOL);
const jhClientFrameworkTypes = jhOptions.get(OptionNames.CLIENT_FRAMEWORK);

let jdlApps = new Set();
//choose app type
jhAppTypes.forEach(jhAppType => {
    let jdlApplication;
    jdlApplication = createJDLApplication({ applicationType: jhAppType });
    jdlApplication.config.setOption(new StringJDLApplicationConfigurationOption(OptionNames.BASE_NAME, jhBaseName[0]));
    jdlApplication.config.setOption(new StringJDLApplicationConfigurationOption(OptionNames.PACKAGE_NAME, jhPackageName[0]));
    jdlApplication.config.setOption(new StringJDLApplicationConfigurationOption(OptionNames.PACKAGE_FOLDER, jhPackageFolder[0]));
    jdlApplication.config.setOption(new StringJDLApplicationConfigurationOption(OptionNames.SERVICE_DISCOVERY_TYPE, jhServiceDiscoveryTypes[0]));

    //choose auth type
    const jhAuthTypes = getAuthenticationTypesFor(jhAppType);
    jhAuthTypes.forEach(jhAuthType => {
        jdlApplication.config.setOption(new StringJDLApplicationConfigurationOption(OptionNames.AUTHENTICATION_TYPE, jhAuthType));

        //choose database type
        const jhDatabaseTypes = getDatabaseTypesFor(jdlApplication);
        jhDatabaseTypes.forEach(jhDatabaseType => {
            jdlApplication.config.setOption(new StringJDLApplicationConfigurationOption(OptionNames.DATABASE_TYPE, jhDatabaseType));

            const jdlAppClone = _.cloneDeep(jdlApplication);
            jdlApps.add(jdlAppClone);

        });
    });
});

jdlApps.forEach(app => {
    // console.log(app.config.getOption(OptionNames.APPLICATION_TYPE).value, '-',
    //     app.config.getOption(OptionNames.AUTHENTICATION_TYPE).value, '-',
    //     app.config.getOption(OptionNames.DATABASE_TYPE).value);
});