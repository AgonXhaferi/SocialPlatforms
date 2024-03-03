const userRoot = 'users' as const;
const authRoot = 'supertoken' as const;
const cultureRoot = 'culture' as const;
const v1 = 'v1';

export const routesV1 = {
  version: v1,
  user: {
    root: userRoot,
  },
  auth: {
    root: authRoot,
  },
  culture: {
    root: cultureRoot,
  },
} as const;
