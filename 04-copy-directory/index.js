const fs = require('fs');
const fsPr = fs.promises;
const path = require('path');

const dirName = 'files';
const dirPath = path.join(__dirname, dirName);

const dirNameCopy = `${dirName}-copy`;
const dirPathCopy = path.join(__dirname, dirNameCopy);

async function copyDir(pathOriginal, pathCopy) {
  try {
    await fsPr.rm(pathCopy, { force: true, recursive: true });
  } catch (err) {
    console.error('Error delete directory:', err);
    return;
  }

  const originalDir = await fsPr.readdir(pathOriginal, { withFileTypes: true });

  await fsPr.mkdir(pathCopy, { recursive: true });

  for (const file of originalDir) {
    const fileOriginal = path.join(pathOriginal, file.name);
    const fileCopy = path.join(pathCopy, file.name);
    if (file.isFile()) {
      await fsPr.copyFile(fileOriginal, fileCopy);
    } else if (file.isDirectory()) {
      await copyDir(fileOriginal, fileCopy);
    }
  }
}

copyDir(dirPath, dirPathCopy).catch((err) =>
  console.error('Error copy directory:', err),
);
