import * as migration_20260324_034308_initial from './20260324_034308_initial';

export const migrations = [
  {
    up: migration_20260324_034308_initial.up,
    down: migration_20260324_034308_initial.down,
    name: '20260324_034308_initial'
  },
];
