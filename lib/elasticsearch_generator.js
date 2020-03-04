const { OptionNames, OptionValues } = require('jhipster-core/lib/core/jhipster/application_options');

function getElasticsearchOptionFor(jdlApp) {
    const jhDatabaseTypes = OptionValues[OptionNames.DATABASE_TYPE];

    const jdlDatabaseType = jdlApp.getOptionValue(OptionNames.DATABASE_TYPE);

    let elasticsearchOption;
    if (jdlDatabaseType === jhDatabaseTypes.sql || jdlDatabaseType === jhDatabaseTypes.mongodb) {
        elasticsearchOption = ['elasticsearch', false]
    }

    return elasticsearchOption;
}

module.exports = {
    getElasticsearchOptionFor: getElasticsearchOptionFor
}