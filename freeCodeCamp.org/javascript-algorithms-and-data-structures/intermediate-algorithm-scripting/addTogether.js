const assert = require("assert");
const assertions = require("../../../assertions/assertions");

function isNumeric(n) {
  return typeof n == "number";
}

const do_log = true;

function addTogether() {
  if (do_log) console.log("args_len", 
    arguments.length, 
    arguments[0], 
    arguments.length > 1 ? arguments[1] : undefined);
  var a = arguments[0];
  if (!isNumeric(a)) {
    return undefined;
  }
  if (arguments.length === 1) {
    return b = (b) => {
      if (!isNumeric(b)) {
        return undefined;
      }
      return addTogether(a, b);
    };
  }
  var b = arguments[1];
  if (!isNumeric(b)) {
    return undefined;
  }
  return a + b;
}

const verify = (left, right) => assertions.assertEquals(left, right);

verify(addTogether(2, 3), 5);
//verify(addTogether(2,3), 6); <== this assertion would fail
verify(addTogether(23, 30), 53);
verify(addTogether(5)(7), 12);
verify(addTogether("https://www.youtube.com/watch?v=dQw4w9WgXcQ"), undefined);
verify(addTogether(2)([3]), undefined);
verify(addTogether(2, "3"), undefined);
verify(addTogether(5, undefined), undefined);
