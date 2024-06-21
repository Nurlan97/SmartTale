import { makeAutoObservable, runInAction } from 'mobx';

import {
  EmployeeSummary,
  MonitoringOrder,
  UpdateTaskRequest,
} from '../api/data-contracts';
import { myApi } from '../api/V1';

export default class taskStore {
  task: MonitoringOrder | undefined = undefined;
  detailedExt: {
    id: number;
    activeImg: number;
    activeTab: 'description' | 'size' | 'contacts';
  } = { id: 0, activeImg: 0, activeTab: 'description' };
  employeesDD: EmployeeSummary[] = [];
  constructor() {
    makeAutoObservable(this);
  }
  getTask = async (id: number) => {
    try {
      this.detailedExt.id = id;
      const response = await myApi.getOrder(id);
      runInAction(() => {
        this.task = response.data;
      });
    } catch (error) {
      console.log(error);
    }
  };
  setImage = (num: number) => () => {
    this.detailedExt.activeImg = num;
  };
  getDDEmployees = async () => {
    try {
      const response = await myApi.getEmployeesBeforeAssign();
      this.employeesDD = response.data;
    } catch (error) {
      console.log(error);
    }
  };
  updateTask = async (task: UpdateTaskRequest) => {
    try {
      await myApi.updateTask(task);
      this.getTask(this.detailedExt.id);
    } catch (error) {
      console.log(error);
    }
  };
  removeTask = () => {
    this.task = undefined;
  };
}
