import { makeAutoObservable } from 'mobx';

const tabsMap = new Map();
tabsMap.set('profile', 'profile');
tabsMap.set('my-ads', 'profile');
tabsMap.set('my-purchases', 'profile');
tabsMap.set('orders-history', 'profile');
tabsMap.set('company', 'profile');
tabsMap.set('orders-active', 'organization');
tabsMap.set('history', 'organization');
tabsMap.set('equipment', 'market');
tabsMap.set('services', 'market');
tabsMap.set('place-order', 'market');
tabsMap.set('company-information', 'organization');
tabsMap.set('employees', 'organization');
tabsMap.set('roles', 'organization');
// tabsMap.set('company-history', 'organization');
export type AllowedStrings = 'profile' | 'market' | 'organization';

class navbarStore {
  activeTab = 'profile';
  activeLink = 'profile';
  tabs: {
    [key: string]: 'extended' | 'rolled up';
  } = {
    profile: 'extended',
    // orders: 'extended',
    market: 'extended',
    organization: 'extended',
  };
  queue: AllowedStrings[] = ['profile'];
  constructor() {
    makeAutoObservable(this);
  }
  setActive = (active: string) => {
    this.activeLink = active;
    this.activeTab = tabsMap.get(active);
  };
  toggleTab = (tab: 'profile' | 'market' | 'organization') => {
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
