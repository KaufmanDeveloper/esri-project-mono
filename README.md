# esri-project-mono

This is for testing out features using ESRI's API.  

## Iterating

### Example to add a new dotnet API project

- dotnet new webapi -o apps/backend/EsriExample --use-controllers - Creates new .NET web api with scaffolding
- dotnet new sln -n EsriExample - creates a root repo level solution file (by the way, on this, the new .slnx files are so much nicer than the old .sln files I found. They're much more readable and use xml like the .csproj file uses.)
- dotnet sln EsriExample.slnx add apps/backend/EsriExample.csproj - Adds our new .net api project to the root solution file
- Update the backend scripts in the root `package.json`

### Example to add a new React project

- pnpm create vite apps/frontend/EsriExample --template react-ts
- pnpm install
- Update the pnpm scripts in the root `package.json`
- Add new React project directory to `pnpm-workspace.yaml`
