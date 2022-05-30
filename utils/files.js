import fs from 'fs/promises';
import path from 'path';

export async function getFileList() {
  const dir = path.join(process.cwd(), 'materials');
  const dirs = await fs.readdir(dir);
  const map = [];
  for (let index = 0; index < dirs.length; index++) {
    const file = dirs[index];
    if (file.indexOf('.js') > -1) {
      const subPath = path.join(dir, file);
      const text = await fs.readFile(subPath);
      map.push({
        title: file.replace('.js', ''),
        value: text.toString(),
      });
    }
  }
  return map;
}
