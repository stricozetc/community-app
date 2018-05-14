import * as  React from 'react';
import { AddItemAction, mapDispatchToProps } from 'store';

interface Props {
  addItem(name: string): void;
}

export const Form = mapDispatchToProps<Props>((d => ({
  addItem: name => d(new AddItemAction(name))
})))<Props>(({ addItem }) => (
  <div>
    <button onClick={() => addItem('new item')}>Add Item</button>
  </div>
));
