# Packman Using Html Canvas

small project to learn html canvas

- https://www.youtube.com/watch?v=5IMXpp3rohQ&t=8103s following this tutorial to create a packman using HTML canvas

```
project
│   README.md
│   app.ts
│   tsconfig.json
|   index.html main file
    src
│   │   gameObject.ts contains Game main classes Player Ghosts ...
│   │   map.ts render the map using the map in the app.ts
│   │   contextService.ts contains the context instant and canvas
    build compiled ts files and linked to the index.html
```

## Quick start

open web server using

- using the live-server
  - install live server`npm install -g live-server`
  - Than in the same dir run `live-server`
- using python3
  - `python3 -m http.server`

## Edit the files you need typescript and web server

- requires
- nodejs
- `npm install -g typescript`
  - run `tsc -w` to compile typescript
  - run open of the above to open the server
