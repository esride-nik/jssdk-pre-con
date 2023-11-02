# Steps to reproduce

## Get Template to run
1. Install VS Code
2. Install git ```git -v```
3. Install node ```node -v```
4. Create new Vite Template `npm create vite@latest`
    - Choose Vanilla and Typescript
5. `cd <proj-name>` and `npm install`, then `npm run dev`

## Setup a map
1. Install ArcGIS JS `npm i @arcgis/core`
2. Remove counter.ts, content of main.ts, style.css and images.
3. Remove unneeded imports from html and add arcgis css