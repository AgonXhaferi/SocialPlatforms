const userRoot = 'users';
const authRoot = 'supertoken';

const v1 = 'v1';

export const routesV1 = {
  version: v1,
  user: {
    root: userRoot,
  },
  auth: {
    root: authRoot,
  },
} as const;
