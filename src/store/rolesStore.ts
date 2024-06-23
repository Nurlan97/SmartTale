import { makeAutoObservable, runInAction } from 'mobx';

import { Position, PositionDto, PositionSummary } from '../api/data-contracts';
import { myApi } from '../api/V1';
import { errorNotify, successNotify } from '../utils/toaster';

class rolesStore {
  position: PositionDto | undefined = undefined;
  positions: PositionSummary[] = [];
  constructor() {
    makeAutoObservable(this);
  }
  getPositions = async () => {
    try {
      const response = await myApi.getAllPositions();
      runInAction(() => {
        this.positions = response.data;
      });
    } catch (error) {
      console.log(error);
      errorNotify('Произошла ошибка при загрузке, повторите попытку');
    }
  };
  createPosition = (data: Position) => {
    try {
      myApi.createPosition(data);
      successNotify('Позиция успешно создана');
    } catch (error) {
      console.log(error);
      errorNotify('Произошла ошибка при создании позиции');
    }
  };
  updatePostiion = (data: Position) => {
    try {
      myApi.updatePosition(data);
      successNotify('Позиция успешно обновлена');
    } catch (error) {
      console.log(error);
      errorNotify('Произошла ошибка при обновлении позиции');
    }
  };
  getPosition = async (id: number) => {
    try {
      const response = await myApi.getOnePosition(id);
      runInAction(() => {
        this.position = response.data;
      });
    } catch (error) {
      console.log(error);
      errorNotify('Произошла ошибка при загрузке, повторите попытку');
    }
  };
  clearPosition = () => {
    this.position = undefined;
  };
}
export default new rolesStore();
