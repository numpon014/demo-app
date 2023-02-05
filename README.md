# Demo App
https://webquest-demo.numpon.com

## Techstack
**F/E:** Typescript, React, Antd, React-i18next, Jest, Styled-components <br/>
**CI/CD:** GitHub Action <br/>
**Infrastructure:** Terraform, AWS S3, AWS CloudFront

### Infrastructure
![infrastructure.png](readme/infrastructure.png)
<br/>
See implementation [here](./terraform/main.tf)

### CI/CD
See implementation [here](./.github/workflows/prod-build-deploy.yml)

### Localization 
See implementation [here](./src/i18n/index.tsx)

### Linting and Unit Testing
* Eslint
* Jest and testing-library
