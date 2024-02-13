import { Address } from '@modules/user/domain/value-objects/address.value-object';
import { FullName } from '@modules/user/domain/value-objects/full-name.value-object';

export interface UserProps {
  role: UserRoles;
  email: string;
  address: Address;
  fullName: FullName;
  userName: string;
  age: number;
}

// Properties used for updating a user address
export interface UpdateUserAddressProps {
  country?: string;
  postalCode?: string;
  street?: string;
}

export enum UserRoles {
  admin = 'ADMIN',
  moderator = 'MODERATOR',
  guest = 'GUEST',
  standard = 'STANDARD',
}
