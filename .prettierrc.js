module.exports = {
    useTabs: true,
    trailingComma: "none",
    arrowParens: "avoid",
    endOfLine: "auto",
    printWidth: 120,
    overrides: [
        {
            files: "*.js",
            options: {
                useTabs: false,
                tabWidth: 4
            }
        }
    ]
};
