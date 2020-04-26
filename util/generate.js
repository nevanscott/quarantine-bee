const fs = require('fs');
const readline = require('readline');

async function processLineByLine(path) {
  return new Promise(function(resolve, reject) {
    const readInterface = readline.createInterface({
      input: fs.createReadStream(path)
    });
  
    const validWordLookup = {};

    readInterface.on('line', function(line) {
      validWordLookup[line] = true;
    });
  
    readInterface.on('close', function() {
      resolve(validWordLookup);
    });
  });
}

processLineByLine('en.txt').then(function(validWordLookup){
  const validWordTrie = {};
  for (const word in validWordLookup) {
      let currentSubTrie = validWordTrie;
      for (const letter of word) {
          if (!(letter in currentSubTrie)) {
              currentSubTrie[letter] = {};
          }
          currentSubTrie = currentSubTrie[letter];
      }
      currentSubTrie[''] = ''; // an empty string key means that the letter keys above this form a valid word
  }
  const re = /\"([a-z])\"/g;
  const data = JSON.stringify(validWordTrie).replace(re, '$1').replace(/\"/g, "'");
  const output = "const validWordTrie = " + data + ";";
  fs.writeFileSync('en.js', output);
});
