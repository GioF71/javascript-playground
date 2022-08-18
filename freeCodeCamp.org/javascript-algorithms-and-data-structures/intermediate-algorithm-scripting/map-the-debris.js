function orbitalPeriod(arr) {
  const GM = 398600.4418;
  const earthRadius = 6367.4447;

  const calc = (avgAlt) => {
    return Math.round(
      2 * Math.PI * Math.sqrt(Math.pow(avgAlt + earthRadius, 3) / GM)
    );
  };

  for (let elem of arr) {
    elem["orbitalPeriod"] = calc(elem.avgAlt);
    delete elem.avgAlt;
  }

  console.log(arr);
  return arr;
}

// [{name: "sputnik", orbitalPeriod: 86400}]
orbitalPeriod([{ name: "sputnik", avgAlt: 35873.5553 }]);

//[{name : "iss", orbitalPeriod: 5557}, {name: "hubble", orbitalPeriod: 5734}, {name: "moon", orbitalPeriod: 2377399}]
orbitalPeriod([{name: "iss", avgAlt: 413.6}, {name: "hubble", avgAlt: 556.7}, {name: "moon", avgAlt: 378632.553}]); 
