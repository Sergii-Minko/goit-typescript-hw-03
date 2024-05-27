class Key {
  private signature: number;
  constructor() {
    this.signature = Math.random();
  }

  public getSignature() {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {}

  getKey() {
    return this.key;
  }
}

abstract class House {
  private tenants: Person[] = [];
  protected door: boolean = false;
  constructor(protected key: Key) {}

  public comeIn(person: Person) {
    if (this.door) {
      this.tenants.push(person);
      console.log(
        `Person with key ${person
          .getKey()
          .getSignature()} has entered the house.`
      );
    } else {
      console.log(
        `The door is closed. Person with key ${person
          .getKey()
          .getSignature()} cannot enter.`
      );
    }
  }

  public abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  constructor(key: Key) {
    super(key);
  }

  public openDoor(key: Key) {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
      console.log("The door is now open.");
    } else {
      console.log("The key does not match. The door remains closed.");
    }
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};
