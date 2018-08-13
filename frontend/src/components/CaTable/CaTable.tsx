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
//import { tableCellDataType } from 'models';
import { I18n, TranslationFunction } from 'react-i18next';

import { CaDelete } from '../form-controls/CaDelete/CaDelete';
import { CaEdit } from '../form-controls/CaEdit';

import { CaTableProps } from './CaTable.model';
import { styles } from './CaTable.styles';
import { i18nInstance } from '../../utils/i18n';

import { TypeOfColumn } from 'models';

// enum TypeOfColumn {
//   string = 'String',
//   timeCount = 'Spent Time',
//   points = 'Points',
//   result = 'Result',
//   date = 'Date'
// }


export const CaTable = withStyles(styles)((props: CaTableProps) => {
  const { columnDef, rowData, classes } = props;

  //const arrayOfColumnName = columnDef.map(column => column.headerName);

  const getTextContentOfTheCell = (column: any, row: any, t: TranslationFunction) => {
    let textContent;
    const text = row[`${column.field}`];

    const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timezone: 'UTC',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        };

    switch (column.type) {
      case TypeOfColumn.string : {
        textContent = text;
        break;
      }
      case TypeOfColumn.timeCount : {
        textContent = t('minutes', { count: text });
        break;
      }
      case TypeOfColumn.points : {
        textContent = text;
        break;
      }
      case TypeOfColumn.result : {
        textContent = text ? 'Win' : 'Lose';
        break;
      }
      case TypeOfColumn.date : {
        textContent = new Date(text).toLocaleString(i18nInstance.language, options);
        break;
      }
      default: {
        textContent = text;
      }
    }
    return textContent;
  };

  const getButtonContentOfTheCell = (column: any, row: any, t: TranslationFunction) => {
    const isCellHaveEditButton = column.editAction;
    const isCellHaveDeleteButton = column.deleteAction;
    let buttonContent;

    if (isCellHaveEditButton || isCellHaveDeleteButton) {
      buttonContent =
        <div className={classes.buttonsInCellWithButtons}>
          {column.editAction ? <CaEdit editHandler={() => column.editAction(row.id)}/> : null}
          {column.deleteAction ? <CaDelete deleteHandler={() => column.deleteAction(row)} /> : null}
        </div>;
    }

    return buttonContent;
  };

  const getContentOfTheCell = (column: any, row: any, t: TranslationFunction) => {
    const textContent = getTextContentOfTheCell(column, row, t);

    const buttonContent = getButtonContentOfTheCell(column, row, t);

    return (
      <div className={classes.cellWithButtons}>
        <div className={classes.textInCellWithButtons}>{textContent}</div>
        {buttonContent ? buttonContent : null}
      </div>
    );
  };

  return (

    <I18n>
      {
        (t) => (
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow className={classes.tableHeadRow}>
                {columnDef.map((nameOfColumn, index) => {
                  const numeric = index !== 0;
                  return (
                    <TableCell
                      key={nameOfColumn.headerName}
                      numeric={numeric}
                      className={classNames(classes.columnCell, classes.tableHeadCell)}
                    >
                      {t(nameOfColumn.headerName)}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowData.map((row, rowIndex) => {
                return (
                  <TableRow key={rowIndex}>
                    {columnDef.map((column, propertyIndex) => {
                      const numeric = propertyIndex !== 0;

                      return (
                        <TableCell
                          numeric={numeric}
                          key={propertyIndex}
                          className={classes.columnCell}
                        >
                          {getContentOfTheCell(column, row, t)}
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
