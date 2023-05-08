
const { stdout } = process

const { error } = require('console');

const fs = require('fs');
const path = require('path');

const stream = fs.ReadStream(path.join(__dirname, 'text.txt'), 'utf-8') // создаю объект потока и сразу указываю кодировку, чтобы автоматически преобразовывать буфер в строку
//console.log(stream)

stream.on('readable', function(){
  let data = stream.read(); // запускаю событие «readable», это событие означает, что данные просчитаны и находятся во внутреннем буфере потока, который мы можем получить используя вызов «read()»
  if (data != null) stdout.write(data); // чтобы не выводило null (ошибку) когда данные заканчиваются

  //if (data != null) console.log(data); // чтобы не выводило null когда данные заканчиваются (тоже работает)
});


stream.on('error', function(error){
  return console.error(error.message);
});


/* можно оставить, но не вижу смысла */
// stream.on('end', function(){
//   console.log("THE END");
// });





/* node index выводит из 'родной' директории (сразу не дочитал, что нужно делать :)

const { error } = require('console');
const fs = require('fs');
const path = require('path');

  fs.readFile('text.txt', 'utf-8',(error, data) => {
    if (error) return console.error(error.message);
    console.log(data);
  });

*/




