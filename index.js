const { getAllOptionsAsMap } = require('./lib/application_options');
const { getAuthenticationTypesFor } = require('./lib/authentication_type_generator');
const { getDatabaseTypesFor, getDevDatabaseTypeFor } = require('./lib/database_type_generator');
const { createJDLApplication } = require('jhipster-core/lib/core/jdl_application_factory');

const monolithApp = createJDLApplication({applicationType: 'monolith', databaseType: 'no', baseName: 'mono',creationTimestamp: 42});

const microApp = createJDLApplication({    applicationType: 'microservice',    baseName: 'mono',    creationTimestamp: 42  });

const gatewayApp = createJDLApplication({    applicationType: 'gateway',    baseName: 'mono',    creationTimestamp: 42  });

const uaaApp = createJDLApplication({    applicationType: 'uaa',    baseName: 'mono',    creationTimestamp: 42  });

// console.log(getAllOptionsAsMap());
// console.log(monolithApp.getOptionValue('applicationType'));
console.log(getDevDatabaseTypeFor(monolithApp))