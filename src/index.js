// Might refactor later
import fs from 'fs'
import {
  reactTs,
  reactJs,
  readme,
  dockerFile,
  dockerCompose,
  gitIgnore,
  reactSpec,
} from './templates.js'
import readline from 'readline'

// Helpers start
const specifyPathInput = (callback) => {
  let path = process.cwd()
  console.log(`Current path: ${path}`)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
   
  rl.question('Specify a relative path without "/" at start or click enter for current path: ', p => {
    if (p) {
      path += `/${p}`
    }
    callback(path);
    rl.close();
  })
}

const createFile = (fileName, template) => {
  fs.writeFile(fileName, template, (err) => {
      // throws an error, you could also catch it here
      if (err) throw err;

      // success case, the file was saved
      console.log(`${fileName} saved!`);
  });
}
// Helpers end

// Build templates here
const buildReactFile = (name, ts) => {
  if (!name) {
    console.log('Give me a filename as second param please')
    return null
  }
  console.log(`${ts
    ? 'Will create a React TypeScript file for you'
    : 'Will create a React file for you'}`
  )

  specifyPathInput((p) => {
    const template = ts ? reactTs(name) : reactJs(name)
    const fileName = `${p}/${name}.${ts ? 'tsx' : 'jsx'}`
    createFile(fileName, template)
  })
}

const buildReactSpecFile = (name) => {
  if (!name) {
    console.log('Give me a filename as second param please')
    return null
  }
  console.log('Will create a React-SPEC file for you')

  specifyPathInput(() => {
    const template = reactSpec(name)
    const fileName = `${p}/${name}.spec.jsx`
    createFile(fileName, template)
  })
}

const createDockerFiles = () => {
  console.log('Will create a Dockerfile + docker-compose.yml for you ;)')
  specifyPathInput((path) => {
    const dockerFilePath = `${path}/Dockerfile`
    const dockerComposePath = `${path}/docker-compose.yml`
    const split = path.split('/')
    const title = split[split.length - 1]
    createFile(dockerFilePath, dockerFile())
    createFile(dockerComposePath, dockerCompose())
  })
}

const buildReadmeFile = () => {
  console.log('Will create a README.md for you ;)')
  specifyPathInput((path) => {
    const fileName = `${path}/README.md`
    const split = path.split('/')
    const title = split[split.length - 1]
    createFile(fileName, readme(title.toUpperCase()))
  })
}

const createGitIgnoreFile = () => {
  console.log('Will create a .gitignore for you ;)')
  specifyPathInput((path) => {
    const fileName = `${path}/.gitignore`
    createFile(fileName, gitIgnore())
  })
}

const handleArgs = () => {
  const args = process.argv.splice(2)
  const data = {
    templateType: args[0] || '',
    name: args[1],
    isTs: args[2]
  }

  switch (data.templateType.toLowerCase()) {
    case 'react':
      buildReactFile(data.name, data.isTs)
    case 'react-spec':
      buildReactSpecFile(data.name, data.isTs)
      break;
    case 'readme':
      buildReadmeFile()
      break;
    case 'docker':
      createDockerFiles()
      break;
    case 'gitignore':
      createGitIgnoreFile()
      break;
    default:
      console.log('No match')
      console.log('Available templates are react, readme, and docker')
      console.log('CMD ex: create-file [filetemplate] [filename] [isTs]')
      console.log('You´ll be asked to specify a path in next step')
      break;
  }
}

export default handleArgs
