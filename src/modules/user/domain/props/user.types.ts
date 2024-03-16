import { Address } from '@modules/user/domain/value-objects/address.value-object';
import { FullName } from '@modules/user/domain/value-objects/full-name.value-object';

export interface UserProps {
  id: string;
  role: UserRoles;
  email: string;
  address: Address;
  fullName: FullName;
  culture: string;
  userName: string;
  age: number;
}

export interface UpdateUserAddressProps {
  email?: string;
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
