// TODO: Write code to define and export the Employee class
class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }
  // methods
  getName() {
    return this.name;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  // returns 'employee'
  getRole() {
    return "Employee";
  }
}

module.exports = Employee;
