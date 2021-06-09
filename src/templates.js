export const reactTs = (filename) => {
  return `import type { FC } from 'react';

const ${filename}:FC = () => {
  const txt = '${filename} page';
  return <h1>{txt}</h1>;
};

export default ${filename};
`
}
