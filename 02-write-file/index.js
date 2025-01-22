const { stdout, stdin } = process;
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { EOL } = require('os');

const createFilePath = path.join(__dirname, 'text.txt');

// добавляет текст
// const writeStream = fs.createWriteStream(createFilePath, { flags: 'a' });
// очищает файл
const writeStream = fs.createWriteStream(createFilePath, { flags: 'w' });

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

const bye = 'The game is over. Bye bye!';
const byeFast = 'It was very fast. Bye bye!';
const greet = `-----------------------------
Hello. Type something, please.
('exit' or 'Ctrl + C' help you go out)
-----------------------------`;

stdout.write(`${greet} ${EOL}`);

rl.on('line', (input) => {
  if (input.trim() === 'exit') {
    stdout.write(`${bye}`);
    rl.close();
    return;
  }

  // fs.appendFile(createFilePath, `${input}${EOL}`, (err) => {
  //   if (err) {
  //     console.error('Error writing to file', err);
  //   }
  // });
  // Если уж создал writeStream, то лучше его и использовать (хотя appendFile веселее)

  writeStream.write(`${input}${EOL}`, (err) => {
    if (err) {
      console.error('Error writing to file', err);
    }
  });
});

// 'Ctrl + C'
rl.on('SIGINT', () => {
  stdout.write(`${byeFast}${EOL}`);
  rl.close();
  writeStream.end();
});
