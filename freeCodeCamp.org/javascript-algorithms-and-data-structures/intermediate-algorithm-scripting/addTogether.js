const assert = require("assert");
const assertions = require("../../../assertions/assertions");

function isNumeric(n) {
  return typeof n == "number";
}

function addTogether() {
  var a = arguments[0];
  if (!isNumeric(a)) return undefined;
  if (arguments.length === 1) {
    return function (b) {
      if (!isNumeric(b)) return undefined;
      return a + b;
    };
  }
  var b = arguments[1];
  if (toString.call(b) !== "[object Number]") return;
  return a + arguments[1];
}

//console.log(addTogether(2, 3)); //5
//console.log(addTogether(23, 30)); //53.
//console.log(addTogether(5)(7)); //12.
//console.log(addTogether("https://www.youtube.com/watch?v=dQw4w9WgXcQ")); //undefined
//console.log(addTogether(2, "3")); //undefined
//console.log(addTogether(2)([3])); //undefined
//console.log(addTogether("2", 3)); //undefined
//console.log(addTogether(5, undefined)); //undefined

const verify = (left, right) => assertions.assertEquals(left, right, true);
//const verify = (left, right) => assert(left == right);

verify(addTogether(2, 3), 5);
//verify(addTogether(2,3), 6); <== this assertion would fail
verify(addTogether(23, 30), 53);
verify(addTogether(5, 7), 12);
verify(addTogether("https://www.youtube.com/watch?v=dQw4w9WgXcQ"), undefined);
verify(addTogether(2)([3]), undefined);
verify(addTogether(2, "3"), undefined);
verify(addTogether(5, undefined), undefined);
