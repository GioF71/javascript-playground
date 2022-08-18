function rot13(str) {
  let result = [];
  const base = "A".charCodeAt(0);
  const limit = "Z".charCodeAt(0);
  for (let i = 0; i < str.length; ++i) {
    const curr = str[i];
    let rotated = curr;
    if (curr >= "A" && curr <= "Z") {
      const curr_asc = str.charCodeAt(i);
      let transformed = curr_asc + 13;
      if (transformed > limit) {
        transformed = transformed - (limit - base + 1);
      }
      rotated = String.fromCharCode(transformed);
    }
    result.push(rotated);
  }
  const resultStr = result.join("");
  console.log(str, "->", resultStr);
  return resultStr;
}

rot13("SERR PBQR PNZC"); //FREE CODE CAMP
rot13("SERR CVMMN!"); //FREE PIZZA!
rot13("SERR YBIR?"); //FREE LOVE?
rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT."); //THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.
