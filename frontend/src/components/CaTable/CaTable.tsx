import './CaTable.scss';
import * as React from 'react';

import {CaTableProps} from './CaTable.model';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CaChart } from 'components/CaChart/CaChar';


export const CaTable = (props: CaTableProps) => {
  const rowData = props.rowData;
  const columnDef = props.columnDef;

  const kindsOfStatistic = Object.keys(rowData[0]);

  return(
    <Table className="statistic-table">
        <TableHead className="statistic-table__table-head">
            <TableRow>
                {columnDef.map((nameOfColumn, index) => {
                    const numeric = index !== 0;
                    return (
                        <TableCell key={nameOfColumn} numeric={numeric} className={`statistic-table__column${index + 1}-cell statistic-table__table-head-cell`}>{nameOfColumn}</TableCell>
                    )
                })}
            </TableRow>
        </TableHead>
        <TableBody>
            {rowData.map((user, index) => {
            return (
                <TableRow className="statistic-table__row" key={index}>
                    {kindsOfStatistic.map((nameOfStatistic, index) => {
                        const numeric = index !== 0;
                        return (
                            <TableCell numeric={numeric} key={index} className={`statistic-table__column${index + 1}-cell`}>{user[nameOfStatistic]}</TableCell>
                        )
                    }
                    )}
                </TableRow>
            );
            })}
        </TableBody>
        <div>
            <CaChart />
        </div>
    </Table>
  )
}