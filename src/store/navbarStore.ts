import { makeAutoObservable } from 'mobx';

const tabsMap = new Map();
tabsMap.set('profile', 'profile');
tabsMap.set('my-ads', 'profile');
tabsMap.set('my-buys', 'profile');
tabsMap.set('orders-history', 'profile');
tabsMap.set('company', 'profile');
tabsMap.set('orders-active', 'orders');
tabsMap.set('history', 'orders');
tabsMap.set('equipment', 'market');
tabsMap.set('services', 'market');
tabsMap.set('place-order', 'market');
export type AllowedStrings = 'profile' | 'orders' | 'market';

class navbarStore {
  activeTab = 'profile';
  activeLink = 'profile';
  tabs: {
    [key: string]: 'extended' | 'rolled up';
  } = {
    profile: 'extended',
    orders: 'extended',
    market: 'rolled up',
  };
  queue: AllowedStrings[] = ['orders', 'profile'];
  constructor() {
    makeAutoObservable(this);
  }
  setActive = (active: string) => {
    this.activeLink = active;
    this.activeTab = tabsMap.get(active);
  };
  toggleTab = (tab: 'profile' | 'orders' | 'market') => {
    this.tabs[tab] = this.tabs[tab] === 'extended' ? 'rolled up' : 'extended';
    if (this.queue.indexOf(tab) !== -1) this.queue.splice(this.queue.indexOf(tab), 1);
    this.queue.push(tab);
  };
  collapse = () => {
    if (this.queue.length <= 1) return;
    const tab = this.queue.shift();
    if (tab) this.tabs[tab] = 'rolled up';
  };
}
export default new navbarStore();
