
const { stdout, stdin, exit } = process;
const { error } = require('console');

const fs = require('fs');
const path = require('path');

const readline = require('readline');

const os = require('os');
const { EOL } = require('os'); // достал окончание строки

const createFilePath = path.join(__dirname, 'text.txt')

const createFile = fs.WriteStream(createFilePath, 'utf-8')

const rl = readline.createInterface(stdin, stdout);

const bye = 'The game is over. Bye bye)'
const byeFast = 'It was very fast. Bye bye)'
const greet = ` -----------------------------
Hello. Type something, please.
('exit' or 'Ctrl + C' help you go out)
 -----------------------------`


rl.on('line', (stdin) => {

  if (stdin === `exit`) {
    stdout.write(`${bye}`)
    exit();
  }

  fs.appendFile(createFilePath, `${stdin} ${EOL}`, err => {if (err) throw err })
});

rl.on('SIGINT', () => { // клавиши 'ctrl+c'

  stdout.write(`${bye}`)
  exit();

});


rl.question(`${greet} ${EOL}`, (answer) => {

    fs.appendFile(createFilePath, `${answer} ${EOL}`, err => {if (err) throw err })

    if (answer === `exit`) {
      stdout.write(`${byeFast}`)
      exit();
    }
});







