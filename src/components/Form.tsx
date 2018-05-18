import * as  React from 'react';
import { AddItemAction, mapDispatchToProps, PingAction } from 'store';

interface Props {
  addItem(name: string): void;
  ping(message: string): void;
}

export const Form = mapDispatchToProps<Props>((d => ({
  addItem: name => d(new AddItemAction(name)),
  ping: message => d(new PingAction(message)),
})))<Props>(({ addItem, ping }) => (
  <div>
    <button onClick={() => addItem('new item')}>Add Item</button>
    <button onClick={() => ping('Ping')}>Ping</button>
  </div>
));
