const userRoot = 'users';
const authRoot = 'supertoken';
const cultureRoot = 'culture';
const v1 = 'v1';

export const routesV1 = {
  version: v1,
  user: {
    root: userRoot,
    following: 'follow',
    cultureSubscription: 'culture/:primaryCulture',
    findUser: '/:userId',
  },
  auth: {
    root: authRoot,
  },
  culture: {
    root: cultureRoot,
    create: '',
    createEvent: '/event',
    createArticle: '/article',
    subscribe: '/subscribe',
    isSubscribed: '/is-subscribed',
  },
} as const;
