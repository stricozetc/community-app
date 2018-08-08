import * as React from 'react';

import { withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import * as classNames from 'classnames';
import { tableCellDataType } from 'models';
import { I18n, TranslationFunction } from 'react-i18next';

import { CaDelete } from '../form-controls/CaDelete/CaDelete';
import { CaEdit } from '../form-controls/CaEdit';

import { CaTableProps } from './CaTable.model';
import { styles } from './CaTable.styles';


export const CaTable = withStyles(styles)((props: CaTableProps) => {
  const { columnDef, rowData, classes } = props;

  const arrayOfColumnName = columnDef.map(column => column.headerName);
  const arrayOfPropertyName = columnDef.map(column => column.field);

  const getCellData = (data: any, property: string, t: TranslationFunction) => {
    let dataForCell;

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
        const date = new Date(data[property])
        dataForCell = t('key', { date });
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
