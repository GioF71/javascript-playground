const Person = function (firstAndLast) {
  // Only change code below this line
  // Complete the method below and implement the others similarly
  var firstName;
  var lastName;

  function setup(value) {
    const arr = value.split(" ");
    firstName = arr[0];
    lastName = arr[1];
  }

  setup(firstAndLast);

  this.getFullName = function () {
    return firstName + " " + lastName;
  };

  this.getFirstName = function () {
    return firstName;
  };

  this.getLastName = function () {
    return lastName;
  };

  this.setFullName = function (fullName) {
    setup(fullName);
  };

  this.setFirstName = function (first) {
    firstName = first;
  };

  this.setLastName = function (last) {
    lastName = last;
  };
};

const bob = new Person("Bob Ross");
bob.getFullName();
console.log(bob.firstName);
console.log(bob.getFirstName());
bob.setFirstName("Bobby");
console.log(bob.getFirstName());
console.log(bob.getFullName());
bob.setFullName("Bobby Brown");
console.log(bob.getFirstName());
console.log(bob.getLastName());
console.log(bob.getFullName());
bob.setLastName("White");
console.log(bob.getFirstName());
console.log(bob.getLastName());
console.log(bob.getFullName());
