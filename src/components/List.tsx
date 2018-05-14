import { Item } from 'models';
import * as  React from 'react';
import { mapStateToProps } from 'store';

interface Props {
  items: Item[]
}

export const List = mapStateToProps(s => ({ items: s.feature.items }))<Props>(({ items }) => (
  <ul>
    {items.map(item => (
      <li key={item.id}>
        {item.name}
      </li>
    ))}
  </ul>
));
