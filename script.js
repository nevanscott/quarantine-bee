/* global
validWordTrie
*/

const letters = getLetters();
const key = letters[0];
const min = 4;
let found = [];
let guesslog = loadGuessLog(letters);

const wordCount = wordsUsingLetters(letters).filter(function(word) {
  return word.includes(key);
}).length;

renderGame(letters, key);

found = rerunGuesses(guesslog, letters, key);

printFound(found);

updateCounter(found, wordCount);

document.getElementById("guesser").addEventListener('submit', function(e) {
  e.preventDefault();
  const $guess = document.getElementById("guess");
  const guess = $guess.value.toLowerCase();

  guesslog = logGuess(guess, letters, guesslog);

  if (!containsValidLetters(guess, letters)) {
    flash(`You can only use the provided letters!`);
  } else if(!containsLetter(guess, key)) {
    flash(`Your guess must contain the letter ${key.toUpperCase()}`);
  } else if (guess.length < min) {
    flash(`Words must be at least ${min} letters long!`);
  } else if (!isAValidWord(guess)) {
    flash(`“${guess}” does not appear in the word list.`);
  } else if (alreadyFound(guess, found)) {
    flash(`You already found “${guess}”!`)
  } else {
    found = success(guess, found);
    printFound(found);
    updateCounter(found, wordCount);
  }

  $guess.value = "";
});

document.getElementById("shuffle").addEventListener("click", function(e) {
  e.preventDefault();
  const shuffled = shuffle(letters.split('')).join('');
  renderGame(shuffled, key);
});

function renderGame(letters, key) {
  const $letters = document.getElementById("letters");
  $letters.innerHTML = letters.split("").map(function(letter) {
    return `<kbd class="${ (letter===key) ? "key " : "" }letter">${letter}</kbd>`;
  }).join(" ");
}

function printFound(found) {
  const $found = document.getElementById("correct");
  $found.innerHTML = found.map(function(word) {
    return `<li>${word}</li>`;
  }).join('');
}

function updateCounter(found, total) {
  const $counter = document.getElementById("counter");
  $counter.innerHTML = `You’ve found <strong>${found.length}</strong> out of ${total} words.`
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

function getLetters() {
  const url = new URL(window.location.href);
  return url.searchParams.get("letters") || getRandomQualifiedWord();
}

function getRandomQualifiedWord() {
  const qualified = getAllQualifiedWords();
  return getRandomFromArray(qualified);
}

function getRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getAllQualifiedWords() {
  return [
    "scdeoru",
    "radiwyz",
    "adklrwy"
  ];
}

function loadGuessLog(letters) {
  return JSON.parse(localStorage.getItem(letters)) || [];
}

function logGuess(guess, letters, log) {
  const updated = log.concat(guess);
  localStorage.setItem(letters, JSON.stringify(updated));
  return updated;
}

function rerunGuesses(guesses, letters, key) {
  return uniq(guesses).filter(function(guess) {
    return goodGuess(guess, letters, key);
  }).sort();
}

function goodGuess(guess, letters, key) {
  return containsValidLetters(guess, letters) && containsLetter(guess, key) && (guess.length >= min) && isAValidWord(guess);
}

function uniq(a) {
  const seen = {};
  return a.filter(function(item) {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
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

function alreadyFound(guess, found) {
  return found.includes(guess);
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

function shuffle(array) {
  let m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}
