# 0) Instalar los node_modules

    - npm run installnode

# 1) Si no esta el dist en la lib

    - npx tsc -b

# 2) Crear un nuevo proyecto backEnd

    - npm run create nestjs api

# 3) Reload del backen 

    npm run reload dev:api

# 4) si se borra el nodemodules
    npm install @nx/angular@21.3.11 --legacy-peer-deps


# nestjs

1) Crear un nuevo proyecto nestjs

    - npm run create nestjs api

2) Levantar el servidor

    - entrar en la carpeta del proyecto.
    - docker compose up -d postgres.
    - desde la carpeta del workspace.
    - npm run dev:api