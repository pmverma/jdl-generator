const { OptionNames, OptionValues } = require('jhipster-core/lib/core/jhipster/application_options');

function getClientFrameworksFor(appType) {
    const jhAppTypes = OptionValues[OptionNames.APPLICATION_TYPE];
    const jhClientFramework = OptionValues[OptionNames.CLIENT_FRAMEWORK];
    let clientFramework;
    switch (appType) {
        case jhAppTypes.monolith:
        case jhAppTypes.gateway:
            clientFramework = Object.values(jhClientFramework).filter(value => typeof value !== 'function');
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