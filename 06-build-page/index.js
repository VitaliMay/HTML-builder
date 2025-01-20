const fs = require('fs');
const fsPr = fs.promises;
const path = require('path');
const { EOL } = require('os');

const stylesDir = path.join(__dirname, 'styles');
const outputDir = path.join(__dirname, 'project-dist');
const outputFile = path.join(outputDir, 'style.css');

const assetsDirName = 'assets';
const assetsDirPath = path.join(__dirname, assetsDirName);
const assetsPathCopy = path.join(outputDir, assetsDirName);

const templateFilePath = path.join(__dirname, 'template.html');
const componentsDir = path.join(__dirname, 'components');
const outputFileHtmlPath = path.join(outputDir, 'index.html');

/************************************************** */

async function replaceHTML() {
  let templateFile = await fsPr.readFile(templateFilePath, 'utf-8');
  const componentsAll = await fsPr.readdir(componentsDir, {
    withFileTypes: true,
  });

  for (const file of componentsAll) {
    const filePath = path.join(componentsDir, file.name);

    if (file.isFile()) {
      const parsedPath = path.parse(filePath);
      const fileName = parsedPath.name;
      const fileExtension = parsedPath.ext;

      if (fileExtension === '.html') {
        const fileContent = await fsPr.readFile(filePath, 'utf-8');
        const regex = new RegExp(`\\{\\{\\s*${fileName}\\s*\\}\\}`, 'g');
        templateFile = templateFile.replace(regex, fileContent);
      }
    }
  }

  await fsPr.writeFile(outputFileHtmlPath, templateFile, 'utf-8');
}

replaceHTML();

/************************************************** */

async function mergeStyles() {
  try {
    await fsPr.mkdir(outputDir, { recursive: true });

    const filesAll = await fsPr.readdir(stylesDir, { withFileTypes: true });

    const stylesArr = [];

    for (const file of filesAll) {
      const filePath = path.join(stylesDir, file.name);

      if (file.isFile()) {
        // const stat = await fsPr.stat(filePath);

        const parsedPath = path.parse(filePath);
        const fileExtension = parsedPath.ext;
        // const fileName = parsedPath.name;
        // const fileSize = Math.round((stat.size / 1024) * 1000) / 1000;

        if (fileExtension === '.css') {
          const fileContent = await fsPr.readFile(filePath, 'utf-8');
          stylesArr.push(fileContent);
          // console.log(`${fileName} - ${fileExtension} - ${fileSize}kb`);
        }
      }
    }

    await fsPr.writeFile(outputFile, stylesArr.join(EOL), 'utf-8');
  } catch (err) {
    console.error('Error merge styles:', err.message);
  }
}

mergeStyles();

/************************************************** */

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

copyDir(assetsDirPath, assetsPathCopy).catch((err) =>
  console.error('Error copy directory:', err),
);
