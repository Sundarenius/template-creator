import fs from 'fs'
import { reactTs } from './templates.js'

const createFile = (fileName, template) => {
  fs.writeFile(fileName, template, (err) => {
      // throws an error, you could also catch it here
      if (err) throw err;

      // success case, the file was saved
      console.log(`${fileName} saved!`);
  });
}


const buildReactFile = (name, ts, path) => {
  const template = reactTs(name)
  const fileName = `${path}/${name}.${ts ? 'tsx' : 'jsx'}`
  createFile(fileName, template)
}

const handleArgs = () => {
  const args = process.argv.splice(2)
  const data = {
    templateType: args[0],
    name: args[1],
    path: args[2],
    isTs: args[3]
  }
  const commandPath = process.cwd()
  let path = commandPath

  if (data.path && data.path.length > 1) {
    path += `${data.path.replace('.', '')}`
  }

  switch (data.templateType.toLowerCase()) {
    case 'react':
    default:
      buildReactFile(data.name, data.isTs, path)
      break;
  }
}

export default handleArgs
