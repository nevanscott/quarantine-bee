/* global
validWordTrie
*/

const letters = "radiwyz";
const key = "r";
const min = 4;
let correct = [];

document.getElementById("guesser").addEventListener('submit', function(e) {
  e.preventDefault();
  const $guess = document.getElementById("guess");
  const guess = $guess.value.toLowerCase();
    
  if(!containsLetter(guess, key)) {
    flash(`Your guess must contain the letter ${key.toUpperCase()}`);
  } else if (!containsValidLetters(guess, letters)) {
    flash(`You can only use the provided letters!`);
  } else if (guess.length < min) {
    flash(`Words must be at least ${min} letters long!`);
  } else if (!isAValidWord(guess)) {
    flash(`“${guess}” does not appear in the word list.`);
  } else if (alreadyFound(guess, correct)) {
    flash(`You already found “${guess}”!`)
  } else {
    correct = success(guess, correct);
    printCorrect(correct);
  }
  
  $guess.value = "";
});

function printCorrect(correct) {
  const $correct = document.getElementById("correct");
  console.log(correct.map(function(word) {
    return `<li>${word}</li>`;
  }));
  $correct.innerHTML = correct.map(function(word) {
    return `<li>${word}</li>`;
  }).join('');
}

function success(guess, correct=[]) {
  return correct.concat(guess).sort();
}

function flash(message, duration=3000) {
  const $flash = document.getElementById("flash");
  $flash.innerHTML = message;
  $flash.classList.add("active");
  setTimeout(function() {
    $flash.classList.remove("active");
  }, duration);
}

function containsValidLetters(guess, letters) {
  for (const letter of guess) {
    if (!(letters.includes(letter))) return false;
  }
  return true;
}

function containsLetter(guess, letter) {
  return guess.includes(letter);
}

function alreadyFound(guess, correct) {
  return correct.includes(guess);
}

function wordsUsingLetters(letters) {
  return searchNextLetters(letters, validWordTrie).filter(word => word.length > 3);
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

function isAValidWord(guess) {
  let level = validWordTrie;
  for (const letter of guess) {
    level = level[letter];
    if (!level) return false;
  }
  return "" in level;
}
