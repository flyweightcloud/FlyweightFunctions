# Flyweight Functions

Quickly build custom Azure Functions in Github Codespaces that can be consumed by Power Automate, Powerapps, or any HTTP consuming API.

## Goals

- You should be able to edit and deploy this from Github Codespaces. No local development setup!
- Should use a sane set a default and encourage good coding practices
    - Provides a testing framework
    - Uses Typescript
    - Code is formatted to the same standards at most Microsoft Typescript projects
    - CI/CD by default (Can deploy from Github releases or manually from Codespaces)
- Should be able to consume it from Powerapps and Power Automate with minimal setup (Swagger support out of the box)
- Should be easy to debug using the Swagger UI

## Functions (Give them a try)

- [Programmer Jokes](https://flyweight-functions.azurewebsites.net/api/Jokes/swagger-ui)
- [Regex Matcher](https://flyweight-functions.azurewebsites.net/api/Regex/swagger-ui)
- [XPath Matcher](https://flyweight-functions.azurewebsites.net/api/XPathFinder/swagger-ui)

## Customize / Build your own

Use this repository as a template. Simply click the green "Use this template" button on top of this page.

### Codespace installation and setup

- Create a new Codespace (or clone the project and open it in VSCode)
- Hit Ctrl-Shift-P and type "Azure Login" then login to Azure
- Hit Ctrl-Shift-P and type "Azure Deploy" and select the Azure Function you wish to deploy it to
