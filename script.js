/* global
validWordTrie
*/

/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

console.log(isAValidWord("hello"));

console.log(isAValidWord("nevan"));

console.log(wordsUsingLetters("radiwyz"));

function wordsUsingLetters(letters) {
  
}

function isAValidWord(guess) {
  let level = validWordTrie;
  for (const letter of guess) {
    level = level[letter];
    if (!level) return false;
  }
  return "" in level;
}
