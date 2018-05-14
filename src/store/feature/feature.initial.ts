import { FeatureState } from './interfaces';

type State = FeatureState;

export const initialState: State = {
  items: [
    { name: 'one', id: '1' },
    { name: 'two', id: '2' }
  ]
};