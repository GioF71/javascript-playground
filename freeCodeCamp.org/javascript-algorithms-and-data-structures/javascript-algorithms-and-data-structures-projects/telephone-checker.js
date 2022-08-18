var re =
  /^([+]?1[\s]?)?((?:[(](?:[2-9]1[02-9]|[2-9][02-8][0-9])[)][\s]?)|(?:(?:[2-9]1[02-9]|[2-9][02-8][0-9])[\s.-]?)){1}([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2}[\s.-]?){1}([0-9]{4}){1}$/;

function telephoneCheck(str) {
  const result = re.test(str);
  console.log(str, "->", result);
  return result;
}

telephoneCheck("555-555-5555");
telephoneCheck("1 555-555-5555"); //true.
telephoneCheck("1 (555) 555-5555"); //true.
telephoneCheck("5555555555"); //true.
telephoneCheck("555-555-5555"); //true.
telephoneCheck("(555)555-5555"); //true.
telephoneCheck("1(555)555-5555"); //true.
telephoneCheck("555-5555"); //false.
telephoneCheck("5555555"); //false.
telephoneCheck("1 555)555-5555"); //false.
telephoneCheck("1 555 555 5555"); //true.
telephoneCheck("1 456 789 4444"); //true.
telephoneCheck("123**&!!asdf#"); //false.
telephoneCheck("55555555"); //false.
telephoneCheck("(6054756961)"); //false.
telephoneCheck("2 (757) 622-7382"); //false.
telephoneCheck("0 (757) 622-7382"); //false.
telephoneCheck("-1 (757) 622-7382"); //false.
telephoneCheck("2 757 622-7382"); //false.
telephoneCheck("10 (757) 622-7382"); //false.
telephoneCheck("27576227382"); //false.
telephoneCheck("(275)76227382"); //false.
telephoneCheck("2(757)6227382"); //false.
telephoneCheck("2(757)622-7382"); //false.
telephoneCheck("555)-555-5555"); //false.
telephoneCheck("(555-555-5555"); //false.
telephoneCheck("(555)5(55?)-5555"); //false.
telephoneCheck("55 55-55-555-5"); //false.
telephoneCheck("11 555-555-5555"); //false
