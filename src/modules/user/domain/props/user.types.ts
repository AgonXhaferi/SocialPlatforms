import { Address } from '@modules/user/domain/value-objects/address.value-object';

export interface UserProps {
  role: UserRoles;
  email: string;
  address: Address;
}

// Properties that are needed for a user creation
export interface CreateUserProps {
  email: string;
  address: Address;
}

// Properties used for updating a user address
export interface UpdateUserAddressProps {
  country?: string;
  postalCode?: string;
  street?: string;
}

export enum UserRoles {
  admin = 'admin',
  moderator = 'moderator',
  guest = 'guest',
}
