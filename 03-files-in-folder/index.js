const path = require('path');
const fs = require('fs');

let folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  files.forEach((file) => {
    let fileFolderPath = path.join(folderPath, file.name);
    fs.stat(fileFolderPath, (err, stat) => {
      if (stat.isFile()) {
        // const fileArr = path.basename(fileFolderPath).split('.');
        // const [fileName, fileExtension] = fileArr;

        const parsedPath = path.parse(fileFolderPath);
        const fileName = parsedPath.name; // Имя файла без расширения
        const fileExtension = parsedPath.ext.slice(1);
        const fileSize = Math.round((stat.size / 1024) * 1000) / 1000;

        console.log(`${fileName} - ${fileExtension} - ${fileSize}kb`);
      }
    });
  });
});
