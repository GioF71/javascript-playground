function palindrome(str) {
    const replaced = str.replace(/[^a-z0-9]/gi, '').toLowerCase();
    const half = Math.floor(replaced.length / 2);
    let result = true;
    for (let i = 0; result && i <= half; ++i) {
      result = replaced[i] == replaced[replaced.length -1 - i];
    }
    console.log(str, "->", replaced, "->", result);
    return result;
  }
  
  palindrome("eye"); // true
  palindrome("_eye"); // true
  palindrome("race car"); //true
  palindrome("not a palindrome"); //false
  palindrome("A man, a plan, a canal. Panama"); //true
  palindrome("never odd or even"); //true.
  palindrome("nope"); //false.
  palindrome("almostomla"); //false.
  palindrome("My age is 0, 0 si ega ym."); //true.
  palindrome("1 eye for of 1 eye."); //false.
  palindrome("0_0 (: /-\ :) 0-0"); //true.
  palindrome("five|\_/|four"); //false