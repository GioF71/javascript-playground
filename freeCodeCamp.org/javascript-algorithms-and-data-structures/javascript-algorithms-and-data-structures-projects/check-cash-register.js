const table = [
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.1],
  ["QUARTER", 0.25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100]
];

function checkCashRegister(price, cash, cid) {
  console.log(price, cash, cid);
  const initial_cid = JSON.parse(JSON.stringify(cid)); 
  let diff = cash - price;
  let change = [];
  let result = {};
  for (let i = table.length - 1; diff > 0 && i >= 0; --i) {
    const curr_unit = table[i][1];
    // if diff >= unit && some qty for this unit
    if (diff >= curr_unit && cid[i][1] > 0) {
      const needed_count = Math.floor(diff / curr_unit);
      const avail_count = Math.round(cid[i][1] / curr_unit);
      const to_be_drawn_count = Math.min(needed_count, avail_count);
      const amount = to_be_drawn_count * curr_unit;
      cid[i][1] = (avail_count - to_be_drawn_count) * curr_unit;
      diff = Math.round((diff - amount) * 100.0) / 100.0;
      change.push([table[i][0], amount]);
    }
  }
  // is diff == 0?
  if (diff == 0) {
    // closed?
    const closed = cid.every(x => x[1] == 0);
    result["status"] = closed ? "CLOSED" : "OPEN";
    result["change"] = closed ? initial_cid : change;
  } else {
    result["status"] = "INSUFFICIENT_FUNDS";
    result["change"] = [];
  }
  console.log(result);
  return result;
}

//{status: "OPEN", change: [["QUARTER", 0.5]]}
checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

//{status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}
checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);

//{status: "INSUFFICIENT_FUNDS", change: []}
checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);

//{status: "INSUFFICIENT_FUNDS", change: []}
checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);

//{status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}
checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);

