export { default } from 'next-auth/middleware';

// Next Auth middleware will prevent access to matched routes unless current user is logged in.
export const config = {
  matcher: [
    '/properties/add',
    '/profile',
    '/properties/saved',
    '/messages',
  ]
};
