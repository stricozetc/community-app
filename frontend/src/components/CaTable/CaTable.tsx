import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles
} from '@material-ui/core';
import * as classNames from 'classnames';
import { CaDelete } from 'components/form-controls/CaDelete';
import { CaEdit } from 'components/form-controls/CaEdit';
import { HeaderName, TypeOfColumn } from 'models';
import * as React from 'react';
import { I18n, TranslationFunction } from 'react-i18next';
import { i18nInstance } from 'utils/i18n';

import { CaTableProps } from './CaTable.model';
import { styles } from './CaTable.styles';

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timezone: 'UTC',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};

export const CaTable = withStyles(styles)((props: CaTableProps) => {
  const { columnDef, rowData, classes } = props;

  const getTextContentOfTheCell = (column: HeaderName, row: any, t: TranslationFunction) => {
    let textContent;
    const text = row[`${column.field}`];

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

  const getButtonContentOfTheCell = (column: HeaderName, row: any, t: TranslationFunction) => {
    const isCellHaveEditButton = column.editAction;
    const isCellHaveDeleteButton = column.deleteAction;
    let buttonContent;

    if (isCellHaveEditButton || isCellHaveDeleteButton) {
      buttonContent =
        <div className={classes.buttonsInCellWithButtons}>
          {column.editAction ? <CaEdit editHandler={() => column.editAction && column.editAction(row.id)}/> : null}
          {column.deleteAction ? <CaDelete deleteHandler={() => column.deleteAction && column.deleteAction(row)} /> : null}
        </div>;
    }

    return buttonContent;
  };

  const getContentOfTheCell = (column: HeaderName, row: any, t: TranslationFunction) => {
    const textContent = getTextContentOfTheCell(column, row, t);

    const buttonContent = getButtonContentOfTheCell(column, row, t);

    return (
      <div className={classes.cellWithButtons}>
        <div className={classes.textInCellWithButtons}>{textContent}</div>
        {buttonContent}
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
