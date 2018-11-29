import * as React from 'react';
import { YandexMapProps } from './YandexMap.model';

import { Map, Placemark, YMaps } from 'react-yandex-maps';

import './YandexMap.scss';

export class YandexMap extends React.Component<YandexMapProps> {
  constructor(props: YandexMapProps) {
    super(props);
  }
  public render(): JSX.Element {
    const {
      positionX,
      positionY
    } = this.props;

    return (
      <YMaps>
        <Map
          defaultState={{
            center: [positionX, positionY],
            zoom: this.props.zoom
          }}
          className='ca-map'
        >
          <Placemark
            geometry={[positionX, positionY]}
          />
        </Map>
      </YMaps>
    );
  }
}
