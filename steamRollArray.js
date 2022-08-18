function flatten(arr, result = []) {
    if (Array.isArray(arr)) {
      for (const elem of arr) {
        console.log("recuring on element", elem);
        flatten(elem, result);
      }
    } else {
      console.log("adding non-array element", arr);
      result.push(arr);
    }
    return result;
  }
  
  function steamrollArray(arr) {
    const result = flatten(arr);
    console.log(arr, "->", result);
    return result;
  }
  
  steamrollArray([1, [2], [3, [[4]]]]);