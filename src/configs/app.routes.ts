const userRoot = 'users';
const authRoot = 'supertoken';
const cultureRoot = 'culture';
const chatRoot = 'chat';
const followRoot = 'follow';
const v1 = 'v1';

export const routesV1 = {
  version: v1,
  user: {
    root: userRoot,
    following: {
      root: `/${followRoot}`,
      areFollowing: `/${followRoot}/are-followers`,
    },
    cultureSubscription: 'culture/:primaryCulture',
    findUser: '/:userId',
  },
  chat: {
    root: chatRoot,
    message: '/message',
    findChat: '/:chatId',
    doesChatExist: '/exist',
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
    findLatestArticle: '/find-latest-articles',
    findLatestEvents: '/find-latest-events',
  },
} as const;
