export const reactTs = (filename) => {
  return `import type { FC } from 'react';

interface Props {}

const ${filename}:FC<Props> = (): JSX.Element => {
  const txt = '${filename} page';
  return (
    <h1>
      {txt}
    </h1>
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
