import { dbAccess } from './db-access';

describe('dbAccess', () => {
  it('should work', () => {
    expect(dbAccess()).toEqual('db-access');
  });
});
