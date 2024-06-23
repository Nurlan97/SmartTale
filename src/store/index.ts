import { injectStores } from '@mobx-devtools/tools';

import PlaceAdvStore, { AdType } from './adStore';
import appStore from './appStore';
import equipmentStore from './equipmentStore';
import jobStore from './jobStore';
import kanbanStore from './kanbanStore';
import modalStore from './modalStore';
import navbarStore from './navbarStore';
import notifyStore from './notifyStore';
import searchStore from './searchStore';
import servicesStore from './servicesStore';
import userStore from './userStore';

const createPlaceAdvStore = (id?: number, type?: AdType) => {
  const placeAdvStoreInstance = new PlaceAdvStore(id, type);
  return placeAdvStoreInstance;
};
const emptyPlaceAdvStore = new PlaceAdvStore();
export type typePlaceAdvStore = typeof emptyPlaceAdvStore;

injectStores({
  equipmentStore,
  navbarStore,
  jobStore,
  servicesStore,
  userStore,
  modalStore,
  appStore,
  kanbanStore,
  searchStore,
  notifyStore,
});

export {
  appStore,
  createPlaceAdvStore,
  equipmentStore,
  jobStore,
  kanbanStore,
  modalStore,
  navbarStore,
  notifyStore,
  searchStore,
  servicesStore,
  userStore,
};
