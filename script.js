/* global
validWordTrie
*/

/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log("hi");

console.log(isAValidWord('hello'));

console.log(isAValidWord('nevan'));


function isAValidWord(guess) {
    let level = validWordTrie;
    for (const letter of guess) {
        level = level[letter];
        if (!level) return false;
    }
    return '' in level;
}
