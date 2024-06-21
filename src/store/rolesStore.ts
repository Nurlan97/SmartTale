import { makeAutoObservable, runInAction } from 'mobx';

import { Position, PositionDto, PositionSummary } from '../api/data-contracts';
import { myApi } from '../api/V1';

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
    }
  };
  createPosition = (data: Position) => {
    myApi.createPosition(data);
  };
  updatePostiion = (data: Position) => {
    myApi.updatePosition(data);
  };
  getPosition = async (id: number) => {
    try {
      const response = await myApi.getOnePosition(id);
      runInAction(() => {
        this.position = response.data;
      });
    } catch (error) {
      console.log(error);
    }
  };
  deletePosition = () => {
    this.position = undefined;
  };
}
export default new rolesStore();
