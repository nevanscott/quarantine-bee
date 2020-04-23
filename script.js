/* global
validWordTrie
*/

/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

console.log(isAValidWord("hello"));

console.log(isAValidWord("nevan"));

console.log(wordsUsingLetters("radiwyz"));

function wordsUsingLetters(letters) {
  return searchNextLetters(letters, validWordTrie);
}

function searchNextLetters(letters, level, fragment="", words=[]) {
  if ("" in level) {
    words.push(fragment);
  }
  for (const letter of letters) {
    if (level[letter]) {
      words = searchNextLetters(letters, level[letter], fragment+letter, words);
    }
  }
  return words;
}

const testTrie = {
  w: {
    a: {
      r: {
        "": "",
        d: {
          "": ""
        }
      }
    },
    i: {
      z: {
        a: {
          r: {
            d: {
              "": "",
              r: {
                y: {
                  "": ""
                }
              }
            }
          }
        }
      }
    }
  }
};

/*
  1. Check for trees with the letters
  2. If any of those trees have "", we've made a word!
  3. Repeat step 1 on that tree
*/

function isAValidWord(guess) {
  let level = validWordTrie;
  for (const letter of guess) {
    level = level[letter];
    if (!level) return false;
  }
  return "" in level;
}
