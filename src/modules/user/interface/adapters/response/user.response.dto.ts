export class UserResponseDto {
  id: string;
  name: string;
  lastname: string;
  username: string;
  email: string;
  country: string;
  postalCode: string;
  street: string;
  age: number;

  constructor(
    id: string,
    name: string,
    lastname: string,
    username: string,
    email: string,
    country: string,
    postalCode: string,
    street: string,
    age: number,
  ) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
    this.country = country;
    this.postalCode = postalCode;
    this.street = street;
    this.age = age;
  }
}
