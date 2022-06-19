import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const dir = path.join(process.cwd(), 'materials');

export async function getFileList() {
  async function deep(dir) {
    const list = [];
    const dirs = await fs.readdir(dir);
    for (let index = 0; index < dirs.length; index++) {
      const item = dirs[index];
      const itemPath = path.join(dir, item);
      const isDir = (await fs.stat(itemPath)).isDirectory();
      if (isDir) {
        const _dirPath = path.join(itemPath, '/');
        list.push({
          title: item,
          value: nanoid(),
          disabled: true,
          children: await deep(_dirPath),
        });
      } else {
        if (item.indexOf('.js') > -1) {
          const subPath = path.join(dir, item);
          const text = await fs.readFile(subPath);
          const value = text.toString();
          if (value) {
            list.push({
              title: item.replace('.js', ''),
              value,
            });
          }
        }
      }
    }
    return list;
  }

  return await deep(dir);
}
