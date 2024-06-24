import { makeAutoObservable, runInAction } from 'mobx';

import { CreateOrgRequest, CustomPageOrderAccepted } from '../api/data-contracts';
import { myApi } from '../api/V1';

export type TDate = [Date | null, Date | null];
export enum dateFilters {
  accepted = 'дате принятия',
  deadline = 'дедлайну',
  completed = 'дате завершения',
  empty = '. . .',
}
interface dateFilter {
  currentType: dateFilters;
  from: Date | null;
  to: Date | null;
}

interface IMyOrganization {
  description: string;
  name: string;
  logoUrl: string;
  registeredAt: string;
}
function getKeyByValue(object: any, value: any) {
  return Object.keys(object).find((key) => object[key] === value);
}

class organizationOrderStore {
  activeTab: 'active' | 'completed' = 'active';
  viewedImage: string = '';
  fileImage: File | undefined = undefined;

  dateFilter: dateFilter = {
    currentType: dateFilters.empty,
    from: null,
    to: null,
  };
  data: CustomPageOrderAccepted = {
    totalPages: 0,
    totalElements: 0,
    size: 0,
    content: [],
    number: 0,
    isEmpty: false,
  };

  myOrganization: IMyOrganization = {
    description: '',
    name: '',
    logoUrl: '',
    registeredAt: '',
  };
  constructor() {
    makeAutoObservable(this);
  }

  setDateRange = (range: TDate) => {
    this.dateFilter.from = range[0];
    this.dateFilter.to = range[1];
    if (this.dateFilter.from && this.dateFilter.to) this.getOrders();
  };
  setFilter = (type: dateFilters) => {
    this.dateFilter.currentType = type;
    if (this.dateFilter.from && this.dateFilter.to) this.getOrders();
  };

  setActiveTab = async (tab: 'active' | 'completed') => {
    console.log(tab);
    try {
      const response = await myApi.getOrders({ active: tab === 'active' });
      runInAction(() => {
        this.activeTab = tab;
        this.data = response.data;
      });
    } catch (error) {
      console.log(error);
    }
  };
  getOrders = async () => {
    try {
      const body: { [key: string]: any } = { active: this.activeTab === 'active' };
      if (getKeyByValue(dateFilters, this.dateFilter.currentType) !== 'empty') {
        body.dateFrom = this.dateFilter.from
          ? this.dateFilter.from.toISOString().slice(0, 10)
          : undefined;
        body.dateTo = this.dateFilter.to
          ? this.dateFilter.to.toISOString().slice(0, 10)
          : undefined;
        body.dateType = this.dateFilter.currentType
          ? getKeyByValue(dateFilters, this.dateFilter.currentType)
          : undefined;
      }
      const response = await myApi.getOrders(body);
      runInAction(() => {
        this.data = response.data;
      });
    } catch (error) {
      console.log(error);
    }
  };

  getMyOrganization = async () => {
    try {
      const response = await myApi.getOrganization();
      runInAction(() => {
        this.myOrganization.description = response.data.description;
        this.myOrganization.logoUrl = response.data.logoUrl;
        this.myOrganization.name = response.data.name;
        this.myOrganization.registeredAt = response.data.registeredAt;
      });
    } catch (error) {
      console.log(error);
    }
  };
  addImage = (file: File) => {
    this.fileImage = file;
    this.viewedImage = URL.createObjectURL(file);
  };
  deleteImage = () => {
    this.fileImage = undefined;
    this.viewedImage = '';
  };
  updateImage = (file: File) => {
    this.fileImage = file;
    this.viewedImage = URL.createObjectURL(file);
  };
  createOrganization = async (dto: CreateOrgRequest) => {
    try {
      await myApi.createOrganization({
        dto,
        logo: this.fileImage,
      });
    } catch (error) {
      console.error('Error', error);
    }
  };
}
export default new organizationOrderStore();
