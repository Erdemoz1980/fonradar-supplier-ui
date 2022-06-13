const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            process: { env: {} },
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#1a73e8',
                            '@border-radius-base': '6px',
                            '@font-size-base': '16px',
                            '@font-family': 'Montserrat, sans-serif',

                            '@radio-size': '20px',
                            '@checkbox-size': '20px',
                            '@height-base': '40px',
                            '@input-placeholder-color': '#202124',
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
