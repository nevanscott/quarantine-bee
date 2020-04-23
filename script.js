/* global
validWordTrie
*/

/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

console.log(isAValidWord("hello"));

console.log(isAValidWord("nevan"));

console.log(wordsUsingLetters("radiwyz"));

function wordsUsingLetters(letters) {
  for (const letter of letters) {
    console.log(validWordTrie[letter]);
  }
  return true;
}

/*
  1. Check for trees with the letters
  2. If any of those trees have "", we've made a word!
  3. Do this recursively
*/

function isAValidWord(guess) {
  let level = validWordTrie;
  for (const letter of guess) {
    level = level[letter];
    if (!level) return false;
  }
  return "" in level;
}
