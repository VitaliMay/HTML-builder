const fs = require('fs');
const fsPr = fs.promises;
const path = require('path');
const { EOL } = require('os');

const stylesDir = path.join(__dirname, 'styles');
const outputDir = path.join(__dirname, 'project-dist');
const outputFile = path.join(outputDir, 'bundle.css');

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
