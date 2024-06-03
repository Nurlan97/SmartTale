import { injectStores } from '@mobx-devtools/tools';

import PlaceOrderStore from './adStore';
import appStore from './appStore';
import equipmentStore from './equipmentStore';
import kanbanStore from './kanbanStore';
import modalStore from './modalStore';
import navbarStore from './navbarStore';
import servicesStore from './servicesStore';
import userStore from './userStore';

const createPlaceOrderStore = (images: string[]) => {
  const placeOrderStoreInstance = new PlaceOrderStore(images);
  // injectStores({
  //   placeOrderStoreInstance,
  // });
  return placeOrderStoreInstance;
};
const emptyPlaceOrderStore = new PlaceOrderStore([]);
export type typePlaceOrderStore = typeof emptyPlaceOrderStore;

injectStores({
  equipmentStore,
  navbarStore,
  servicesStore,
  userStore,
  modalStore,
  appStore,
  kanbanStore,
});

export {
  appStore,
  createPlaceOrderStore,
  equipmentStore,
  kanbanStore,
  modalStore,
  navbarStore,
  servicesStore,
  userStore,
};
