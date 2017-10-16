class Person {
  constructor(name = 'Anonymous', age = 0) {
    this.name = name;
    this.age = age;
  }

  getGreeting() {
    return `Hi, this is ${this.name}. `;
  }

  getInfo() {
    return `${this.name} is ${this.age} years young`;
  }
}

class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }
  hasMajor() {
    return !!this.major;
  }

  getInfo() {
    let info = super.getInfo();

    if (this.hasMajor()) {
      info += `Student's major is ${this.major}`;
    }
    return info;
  }
}

class Traveler extends Person {
  constructor(name, age, homelocation) {
    super(name, age);
    this.homelocation = homelocation;
  }
  getGreeting() {
      let greeting = super.getGreeting();
      if (this.homelocation) {
          greeting+=`I am vising from ${this.homelocation}.`
      }
      return greeting;
  }
}

const me = new Traveler('Ann Kelley', 26, 'CA');
console.log(me.getGreeting());
console.log(me.getInfo());
console.log(me);
