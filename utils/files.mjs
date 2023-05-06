import fs from "fs/promises";
import path from "path";

const dir = path.join(process.cwd(), "materials");

export async function getFileList() {
  async function deep(dir) {
    const list = [];
    const dirs = await fs.readdir(dir);
    for (let index = 0; index < dirs.length; index++) {
      const item = dirs[index];
      const id = encodeURIComponent(item);
      const parentId = encodeURIComponent(dir);
      const itemPath = path.join(dir, item);
      const isDir = (await fs.stat(itemPath)).isDirectory();
      if (isDir) {
        const _dirPath = path.join(itemPath, "/");

        list.push({
          label: item,
          value: id,
          children: await deep(_dirPath),
          parentId: parentId,
        });
      } else {
        if (item.indexOf(".js") > -1) {
          const subPath = path.join(dir, item);
          const text = await fs.readFile(subPath);
          const value = text.toString();
          if (value) {
            list.push({
              label: item.replace(".js", ""),
              value: id,
              text: value,
              parentId: parentId,
            });
          }
        }
      }
    }
    return list;
  }

  return await deep(dir);
}
