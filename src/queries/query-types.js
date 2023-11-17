const types = {
 account: {
  account: 'account',
  activity: 'activity/account/<id>',
  paymentMethod: 'account/<id>/paymentMethod',
  rewards: 'account/<id>/rewards',
  subscription: 'account/<id>/subscription',
 },
 product: {
  products: 'products',
 },
 user: {
  me: 'user/me',
 },
};

export default types;
