var assert = require('assert');

function assertRegexTest(sentence, regex, bool_result = true) {
    assert(regex.test(sentence) == bool_result);
    console.log("Verified [", bool_result, "] for Regex [", regex, "] test on string [", sentence, "]");
}

const default_representer = (x) => { return String(x);};

const assertEquals = (
        left, 
        right, 
        expected_result = true, 
        representer_function = default_representer) => {
    const message = "Expecting [" + representer_function(left) + "] got [" + representer_function(right) + "]";
    const comp_result = (left == right);
    assert(comp_result === expected_result, message);
}

module.exports = { assertRegexTest, assertEquals};