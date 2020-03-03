const { OptionNames, OptionValues } = require('jhipster-core/lib/core/jhipster/application_options');

function getAuthenticationTypesFor(appType) {
    const jhAppTypes = OptionValues[OptionNames.APPLICATION_TYPE];
    const jhAuthTypes = OptionValues[OptionNames.AUTHENTICATION_TYPE];
    let authTypes;
    switch (appType) {
        case jhAppTypes.monolith:
            authTypes = [jhAuthTypes.jwt, jhAuthTypes.session, jhAuthTypes.oauth2];
            break;
        case jhAppTypes.microservice:
        case jhAppTypes.gateway:
            authTypes = [jhAuthTypes.jwt, jhAuthTypes.oauth2, jhAuthTypes.uaa];
            break;
        case jhAppTypes.uaa:
        authTypes = [jhAuthTypes.uaa];
        break;
        default:
            break;
    }
    return authTypes;
}

module.exports = {
    getAuthenticationTypesFor: getAuthenticationTypesFor
}