import { myApi } from '../api/V1';
import { cacheService } from './cacheService';

const USER_KEY = 'user';

class MyRepository {
  public getOrderQuery = (id: number) =>
    cacheService.createQuery(
      [id],
      () => {
        return myApi.getOrder(id);
      },
      { enabledAutoFetch: true },
    );
}

export const myReposytory = new MyRepository();
