module.exports = {
    env: {
        browser: true,
        commonjs: true,
		node: true,
    },
    extends: ['airbnb', 'airbnb/hooks'],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        'linebreak-style': 0,
		indent: 'off',
		'no-tabs': 0,
    },
};
