import { makeAutoObservable, runInAction } from 'mobx';

import {
  CustomPageEmployee,
  EmployeeTasksResponse,
  InviteRequest,
  PositionSummary,
} from '../api/data-contracts';
import { myApi } from '../api/V1';
import { errorNotify, successNotify } from '../utils/toaster';

class employeeStore {
  employeeList: CustomPageEmployee = {
    content: [],
    totalPages: 0,
    totalElements: 0,
    number: 0,
    size: 12,
    isEmpty: true,
  };
  employeeDetail: EmployeeTasksResponse | undefined = undefined;
  employeeDetailExt: { activeTab: 'history' | 'active' } = { activeTab: 'active' };
  posiitons: PositionSummary[] = [];
  constructor() {
    makeAutoObservable(this);
  }
  getEmployees = async () => {
    const response = await myApi.getEmployees();
    this.employeeList = response.data;
  };
  resetEmployee = () => {
    this.employeeDetail = undefined;
  };

  getEmployeeDetails = async (id: number) => {
    const response = await myApi.getEmployee(id, {
      active: this.employeeDetailExt.activeTab === 'active',
    });
    this.employeeDetail = response.data;
  };
  switchDetailsTab = (tab: 'history' | 'active') => async () => {
    this.employeeDetailExt.activeTab = tab;
    this.employeeDetail?.employee.employeeId &&
      this.getEmployeeDetails(this.employeeDetail?.employee.employeeId);
  };
  getDropdownPositions = async () => {
    const response = await myApi.getPositionsDropdown();
    runInAction(() => {
      this.posiitons = response.data;
    });
  };
  inviteEmployee = async (values: InviteRequest) => {
    try {
      const response = await myApi.sendInvitation(values);
      successNotify('Приглашение успешно отправлено');
      return response.data;
    } catch (error) {
      console.log(error);
      errorNotify('Произошла ошибка при отправке пришлашения');
    }
  };
  removeEmployeeFromTask = async (taskId: number, id: number) => {
    try {
      await myApi.updateTask({
        taskId: taskId,
        removedEmployees: [id],
        addedEmployees: [],
      });
      if (this.employeeDetail && this.employeeDetail.tasks.content)
        this.employeeDetail.tasks.content = this.employeeDetail.tasks.content.filter(
          (task) => task.orderId !== taskId,
        );
      successNotify('Сотрудник успешно снят с заказа');
    } catch (error) {
      console.log(error);
      errorNotify('Произошла ошибка при отстранении сотрудника');
    }
  };
}

export default new employeeStore();
