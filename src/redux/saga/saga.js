import { all } from 'redux-saga/effects';

import { watchAccount } from './account';
import { watchAuth } from './auth';
import { watchPaymentMethod } from './paymentMethod';
import { watchProduct } from './product';
import { watchSubscription } from './subscription';
import { watchUI } from './ui';
import { watchUser } from './user';

export default function* rootSaga() {
 yield all([
  watchAccount(),
  watchAuth(),
  watchPaymentMethod(),
  watchProduct(),
  watchSubscription(),
  watchUI(),
  watchUser(),
 ]);
}
