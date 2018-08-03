import * as React from 'react';

import { withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as classNames from 'classnames';

import { CaTableProps, CellWithElement } from './CaTable.model';
import { styles } from './CaTable.styles';

import './CaTable.scss';

export const CaTable = withStyles(styles)((props: CaTableProps) => {
  const { columnDef, rowData, classes } = props;

  const arrayOfColumnName = columnDef.map(column => column.headerName);
  const arrayOfPropertyName = columnDef.map(column => column.field); 

  return (
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
                {nameOfColumn}

              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {rowData.map((row, rowIndex) => {
          return (
            <TableRow key={rowIndex}>
              {arrayOfPropertyName.map((property, propertyIndex) => {
                const numeric = propertyIndex !== 0;

                const cellContent = createCellContent(row[property]);

                return (
                  <TableCell
                    numeric={numeric}
                    key={propertyIndex}
                    className={classes.columnCell}
                  >
                    {cellContent}
                  </TableCell>
                );
              }
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
});

function checkPropertyInObject(object: object, property: string): boolean {
  return !!object[property];
}

function createCellContent(cell: CellWithElement | string): JSX.Element | string | number {
  if (typeof(cell) === 'string' || typeof(cell) === 'number' ) {
    return cell;
  } else {
        const isCellHasEditButton = checkPropertyInObject(cell, 'edit');
        const isCellHasDeleteButton = checkPropertyInObject(cell, 'delete');

        return (
            <div className='cell'>
              <div className='myGames__name-block'>{cell.name}</div>
              <div className='myGames__buttons-block'>
                {isCellHasEditButton
                  ?
                    <button className='myGames__button myGames__button_edit' onClick={cell.edit}>
                      Edit
                    </button>
                  :
                    null
                }

                {isCellHasDeleteButton
                  ?
                    <button className='myGames__button myGames__button_delete' onClick={cell.delete}>
                      Delete
                    </button>
                  :
                    null
                }
              </div>
            </div>
        );
    }
  }
