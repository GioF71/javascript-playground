const assert = require("assert");

const STATUS = {
  OPEN: "OPEN", 
  CLOSED: "CLOSED",
  INSUFFICIENT_FUNDS: "INSUFFICIENT_FUNDS"
}

const MONEY = {
  PENNY: "PENNY",
  NICKEL: "NICKEL",
  DIME: "DIME",
  QUARTER: "QUARTER",
  ONE: "ONE",
  FIVE: "FIVE",
  TEN: "TEN",
  TWENTY: "TWENTY",
  ONE_HUNDRED: "ONE HUNDRED"
};

const table = [
  [MONEY.PENNY, 0.01],
  [MONEY.NICKEL, 0.05],
  [MONEY.DIME, 0.1],
  [MONEY.QUARTER, 0.25],
  [MONEY.ONE, 1],
  [MONEY.FIVE, 5],
  [MONEY.TEN, 10],
  [MONEY.TWENTY, 20],
  [MONEY.ONE_HUNDRED, 100]
];

const multiplier = 100; // lowest value is 0.01

const amountMultiply = (nativeAmount, order = 2) => {
  //const strAmount = (nativeAmount * Math.pow(10, order)).toFixed(0);
  const strAmount = (nativeAmount).toFixed(order).replace(".", "");
  return parseInt(strAmount);
}

const checkCashRegister = (price, cash, cid) => {
  //console.log(price, cash, cid);
  const current_cid = JSON.parse(JSON.stringify(cid)); 
  let m_diff = amountMultiply(cash - price);
  let change = [];
  let result = {};
  for (let i = table.length - 1; m_diff > 0 && i >= 0; --i) {
    const curr_unit = table[i][1];
    const m_curr_unit = amountMultiply(table[i][1]);
    if (m_diff >= m_curr_unit) {
      const curr_avail = amountMultiply(current_cid[i][1]);
      const unit_avail_count = curr_avail / m_curr_unit;
      if (unit_avail_count > 0) {
        const m_needed_count = Math.floor(m_diff / m_curr_unit);
        const drawn = Math.min(m_needed_count, unit_avail_count);
        const amount = drawn * curr_unit;
        // back to float for cid output
        current_cid[i][1] = (unit_avail_count - drawn) * curr_unit;
        // decrement difference and store
        m_diff -= (m_curr_unit * drawn);
        change.push([table[i][0], amount]);
      }
    }
  }
  // is difference at zero?
  if (m_diff == 0) {
    // closed? close if all is at 0
    const must_close = current_cid.every(x => x[1] == 0);
    result.status = must_close ? STATUS.CLOSED : STATUS.OPEN;
    result.change = must_close ? cid : change;
  } else {
    result.status = STATUS.INSUFFICIENT_FUNDS;
    result.change = [];
  }
  return result;
}

const isDeepEqual = (object1, object2) => {
  const objKeys1 = Object.keys(object1);
  const objKeys2 = Object.keys(object2);
  if (objKeys1.length !== objKeys2.length) return false;
  for (const key of objKeys1) {
    const value1 = object1[key];
    const value2 = object2[key];
    const isObjects = isObject(value1) && isObject(value2);
    if ((isObjects && !isDeepEqual(value1, value2)) ||
        (!isObjects && value1 !== value2)) {
      return false;
    }
  }
  return true;
};

const isObject = (object) => {
  return object != null && typeof object === "object";
};

const compare_register = (left, right) => {
  return isDeepEqual(left, right);
}

assert(amountMultiply(0.5) === 50);
assert(amountMultiply(1.01) === 101);
assert(amountMultiply(10) === 1000);
assert(amountMultiply(19.5) === 1950);
assert(amountMultiply(3.26) === 326);
assert(amountMultiply(3.261) === 326); // wrong input, still works, maybe improperly (?)
assert(amountMultiply(3.261, 3) === 3261); // would be a correct input if multiplier === 1000

const t1 = {status: STATUS.OPEN, change: [[MONEY.QUARTER, 0.5]]};
const v1 = checkCashRegister(19.5, 20, [[MONEY.PENNY, 1.01], [MONEY.NICKEL, 2.05], [MONEY.DIME, 3.1], [MONEY.QUARTER, 4.25], [MONEY.ONE, 90], [MONEY.FIVE, 55], [MONEY.TEN, 20], [MONEY.TWENTY, 60], [MONEY.ONE_HUNDRED, 100]]);
assert(compare_register(t1, v1));

const t2 = {status: STATUS.OPEN, change: [[MONEY.TWENTY, 60], [MONEY.TEN, 20], [MONEY.FIVE, 15], [MONEY.ONE, 1], [MONEY.QUARTER, 0.5], [MONEY.DIME, 0.2], [MONEY.PENNY, 0.04]]};
const v2 = checkCashRegister(3.26, 100, [[MONEY.PENNY, 1.01], [MONEY.NICKEL, 2.05], [MONEY.DIME, 3.1], [MONEY.QUARTER, 4.25], [MONEY.ONE, 90], [MONEY.FIVE, 55], [MONEY.TEN, 20], [MONEY.TWENTY, 60], [MONEY.ONE_HUNDRED, 100]]);
assert(compare_register(t2, v2));

const t3 = {status: STATUS.INSUFFICIENT_FUNDS, change: []};
const v3 = checkCashRegister(19.5, 20, [[MONEY.PENNY, 0.01], [MONEY.NICKEL, 0], [MONEY.DIME, 0], [MONEY.QUARTER, 0], [MONEY.ONE, 0], [MONEY.FIVE, 0], [MONEY.TEN, 0], [MONEY.TWENTY, 0], [MONEY.ONE_HUNDRED, 0]]);
assert(compare_register(t3, v3));

const t4 = {status: STATUS.INSUFFICIENT_FUNDS, change: []};
const v4 = checkCashRegister(19.5, 20, [[MONEY.PENNY, 0.01], [MONEY.NICKEL, 0], [MONEY.DIME, 0], [MONEY.QUARTER, 0], [MONEY.ONE, 1], [MONEY.FIVE, 0], [MONEY.TEN, 0], [MONEY.TWENTY, 0], [MONEY.ONE_HUNDRED, 0]]);
assert(compare_register(t4, v4));

const t5 = {status: STATUS.CLOSED, change: [[MONEY.PENNY, 0.5], [MONEY.NICKEL, 0], [MONEY.DIME, 0], [MONEY.QUARTER, 0], [MONEY.ONE, 0], [MONEY.FIVE, 0], [MONEY.TEN, 0], [MONEY.TWENTY, 0], [MONEY.ONE_HUNDRED, 0]]};
const v5 = checkCashRegister(19.5, 20, [[MONEY.PENNY, 0.5], [MONEY.NICKEL, 0], [MONEY.DIME, 0], [MONEY.QUARTER, 0], [MONEY.ONE, 0], [MONEY.FIVE, 0], [MONEY.TEN, 0], [MONEY.TWENTY, 0], [MONEY.ONE_HUNDRED, 0]]);
assert(compare_register(t5, v5));

console.log("finished");