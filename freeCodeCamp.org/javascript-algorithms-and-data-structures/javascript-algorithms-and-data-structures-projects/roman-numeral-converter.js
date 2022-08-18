const table = [
  ["M", 1000],
  ["CM", 900],
  ["D", 500],
  ["CD", 400],
  ["C", 100],
  ["XC", 90],
  ["L", 50],
  ["XL", 40],
  ["X", 10],
  ["IX", 9],
  ["V", 5],
  ["IV", 4],
  ["I", 1],
];

function convertToRoman(num) {
  let arabic = num;
  let roman = [];
  for (const elem of table) {
    const elemValue = elem[1];
    const occurences = Math.floor(arabic / elemValue);
    if (occurences > 0) {
      for (let o = 0; o < occurences; ++o) {
        roman.push(elem[0]);
      }
      arabic -= elemValue * occurences;
    }
  }
  const result = roman.join("");
  console.log(num, "->", result);
  return result;
}

convertToRoman(36); //XXXVI
convertToRoman(2); //II.
convertToRoman(3); //III.
convertToRoman(4); //IV.
convertToRoman(5); //V.
convertToRoman(9); //IX.
convertToRoman(12); //XII.
convertToRoman(16); //XVI.
convertToRoman(29); //XXIX.
convertToRoman(44); //XLIV.
convertToRoman(45); //XLV.
convertToRoman(68); //LXVIII
convertToRoman(83); //LXXXIII
convertToRoman(97); //XCVII
convertToRoman(99); //XCIX
convertToRoman(400); //CD
convertToRoman(500); //D
convertToRoman(501); //DI
convertToRoman(649); //DCXLIX
convertToRoman(798); //DCCXCVIII
convertToRoman(891); //DCCCXCI
convertToRoman(1000); //M
convertToRoman(1004); //MIV
convertToRoman(1006); //MVI
convertToRoman(1023); //MXXIII
convertToRoman(2014); //MMXIV
convertToRoman(3999); //MMMCMXCIX
