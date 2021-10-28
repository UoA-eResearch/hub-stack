module.exports = {
  root: true,
  ignorePatterns: [
    "cypress/**/*",
    "**/*.spec.ts"
  ],
  overrides: [
    {
      files: [
        "*.ts"
      ],
      parserOptions: {
        project: [
          "tsconfig.json",
          "tsconfig.e2e.json"
        ],
        createDefaultProgram: true,
        tsconfigRootDir: __dirname // this line fixes linting in vscode as it tries to load tsconfig.json from the root folder of the mono repo
      },
      extends: [
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates"
      ],
      rules: {
        "@angular-eslint/component-selector": [
          "error",
          {
            prefix: "app",
            style: "kebab-case",
            type: "element"
          }
        ],
        "@angular-eslint/directive-selector": [
          "error",
          {
            prefix: "app",
            style: "camelCase",
            type: "attribute"
          }
        ],
        "indent": ["error", 2]
      }
    },
    {
      files: [
        "*.html"
      ],
      extends: [
        "plugin:@angular-eslint/template/recommended"
      ],
      rules: {}
    }
  ]
}
