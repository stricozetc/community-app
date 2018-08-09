import * as React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles
} from '@material-ui/core';

import * as classNames from 'classnames';
import { tableCellDataType } from 'models';
import { I18n, TranslationFunction } from 'react-i18next';

import { CaDelete } from '../form-controls/CaDelete/CaDelete';
import { CaEdit } from '../form-controls/CaEdit';

import { CaTableProps } from './CaTable.model';
import { styles } from './CaTable.styles';
import { i18nInstance } from '../../utils/i18n';


export const CaTable = withStyles(styles)((props: CaTableProps) => {
  const { columnDef, rowData, classes } = props;

  const arrayOfColumnName = columnDef.map(column => column.headerName);
  const arrayOfPropertyName = columnDef.map(column => column.field);

  const getCellData = (data: any, property: string, t: TranslationFunction) => {
    let dataForCell;
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };

    switch (property) {
      case (tableCellDataType.playedTime): {
        dataForCell = t('minutes', { count: data[property] });
        break;
      }
      case (tableCellDataType.playedInWeek): {
        dataForCell = t('minutes', { count: data[property] });
        break;
      }
      case (tableCellDataType.result): {
        dataForCell = data[property] ? 'W' : 'L';
        break;
      }
      case 'createdAt': {
        dataForCell = new Date(data[property]).toLocaleString(i18nInstance.language, options);
        break;
      }
      case 'updatedAt': {
        dataForCell = new Date(data[property]).toLocaleString(i18nInstance.language, options);
        break;
      }
      case 'game': {
        dataForCell =
          <div className={classes.cellWithButtons}>
            <div className={classes.textInCellWithButtons}>{data[property].appName}</div>
            <div className={classes.buttonsInCellWithButtons}>
              <CaEdit editHandler={data[property].edit} />
              <CaDelete deleteHandler={data[property].delete} />
            </div>
          </div>;
        break;
      }
      default: {
        dataForCell = data[property];
      }
    }

    return dataForCell;
  };

  return (

    <I18n>
      {
        (t) => (
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow className={classes.tableHeadRow}>
                {arrayOfColumnName.map((nameOfColumn, index) => {
                  const numeric = index !== 0;
                  return (
                    <TableCell
                      key={nameOfColumn}
                      numeric={numeric}
                      className={classNames(classes.columnCell, classes.tableHeadCell)}
                    >
                      {t(nameOfColumn)}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowData.map((user, rowIndex) => {
                return (
                  <TableRow key={rowIndex}>
                    {arrayOfPropertyName.map((property, propertyIndex) => {
                      const numeric = propertyIndex !== 0;


                      return (
                        <TableCell
                          numeric={numeric}
                          key={propertyIndex}
                          className={classes.columnCell}
                        >
                          {getCellData(user, property, t)}
                        </TableCell>
                      );
                    }
                    )}
                  </TableRow>
                );

              })}
            </TableBody>
          </Table>
        )
      }
    </I18n>
  );
});
