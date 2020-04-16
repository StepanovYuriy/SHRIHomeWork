module.exports = {
    sets: {
        desktop: {
            files: 'integration/**',
        },
    },
    baseUrl: 'localhost:3000',
    // baseUrl: 'localhost:3001', // Для тестов без запуска dev сервера
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome', // this browser should be installed on your OS
            },
            windowSize: '1024x768',
            screenshotsDir: 'images'
        },
    },
    plugins: {
        'html-reporter/hermione': {
            path: 'hermione/hermione-html-report',
        },
    },
};
