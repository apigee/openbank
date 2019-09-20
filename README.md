# Apigee Banking

## User Guide

[![Docs](./docs-src/docs.png)](https://apigee.github.io/reference-bank-uk)

__[Read the User Guide](https://apigee.github.io/reference-bank-uk)__

## Previous Versions

This is a refactored version of the Apigee Reference Implementation. Improvements include:
- Mocks generated from Official Open Banking OpenAPI Specifications, using Hosted Targets
- Smaller code base, reducing maintenance cost with new OBIE versions
- Drupal 8 Kickstarter Portal
- Shared flows that you can add to your own implementations 
- Improved documentation with CodeLabs

To access the previous version, see [here](https://github.com/apigee/openbank/tree/deprecated)

## User Guide Development

All documentation should be managed in the `docs-src` folder. Codelabs is used to generate the User Guide and plantuml for sequence diagrams. Install them as below.

```
# Install claat
go get github.com/googlecodelabs/tools/claat

# Install plantuml
apt-get install -y plantuml

# Alternatively, you can download the plantuml jar file
```

You can then use the following commands to generate and serve the docs locally.

```
npm run generateDocs
npm run serveDocs
```

## Disclaimer

This is not an officially supported Google Product.
