const fileNameToId = (filename) => `${filename.match(/[A-Z][a-z]+/g).map(v => v.toLowerCase()).join('-')}-container`
export const reactTs = (filename) => {
  return `import type { FC } from 'react';

interface Props {}

const ${filename}:FC<Props> = (): JSX.Element => {
  const txt = '${filename} page';
  return (
    <div id="${fileNameToId(filename)}">
      <h3>{txt}</h3>
    </div>
  );
};

export default ${filename};
`
}


export const reactJs = (filename) => {
  return `
const ${filename} = () => {
  const txt = '${filename} page';
  return <h1>{txt}</h1>;
};

export default ${filename};
`
}

export const readme = (title) => {
  return `# ${title}

...information/introduction...

## Maintainers
This project was built and maintained by Håkan Sundström.
https://github.com/Sundarenius
`
}

export const dockerFile = () => {
  return `# 1 docker build -f Dockerfile -t name-of-image .
# 2 docker run --name name-of-container -p 3030:3030 --rm -i name-of-image

FROM node:14

# ENV variables
ENV appDir=appdir
ENV port=8080

# Create app directory
WORKDIR /\${appDir}
COPY package.json /\${appDir}
COPY . /\${appDir}

# Add this start.sh if you have many custom commands or just use multiple RUN commands
# ADD start.sh /
# RUN chmod 755 ./start.sh
# CMD ["./start.sh"]

RUN npm install

# RUN rm -rf ./node_modules ./package-lock.json && npm install
# RUN rm -rf ./node_modules ./yarn.lock && yarn install --force

CMD ["npm", "run", "serve"]

EXPOSE \${port}  
`
}

export const dockerCompose = () => {
  return `# Rebuild images: 'docker compose build'
# Start container: 'docker compose up --force-recreate'
# Sync ports here and in Dockerfile

version: "3.9"  # optional since v1.27.0
services:
  my-service:
    container_name: 'my-container'
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    volumes:
      - '.:/appdir'
`
}

export const gitIgnore = () => `**/node_modules
**/.DS_Store
**/.nuxt
**/certs
**/.env
**/build
**/dist
data
`
