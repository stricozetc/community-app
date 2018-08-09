import { WinRateDiagram } from 'components/WinRateDiagram';
import * as React from 'react';
import { I18n } from 'react-i18next';

import { CaSelect } from '../form-controls/CaSelect';

import { ChartTableProps } from './ChartTable.model';
import './ChartTable.scss';

export class ChartTable extends React.Component<ChartTableProps> {
  public render(): JSX.Element {
    const { statistics } = this.props;

    return (
      <I18n>
        {
          ( t ) => (
            <div className='chart-table'>
              <div className='chart-table__head'>
                <div className='chart-table__chart-select'>
                  <CaSelect
                    values={['winRate']}
                    displayedValues={[t('winRate')]}
                    handleChange={() => console.log('qdqw')}
                    currentValue={'winRate'}
                  />
                </div>
              </div>
              <div className='chart-table__content'>
                <WinRateDiagram gameData={statistics.recentGames} />
              </div>
            </div>
          )
        }
      </I18n>
    );
  }
}
