import React, {memo} from 'react';
import {Box, Paper} from '@mui/material';
import {ITicketCell, TicketType} from "../types";
import { TicketCell } from './TicketCell';

interface ITicket {
    ticket: TicketType;
}

export const Ticket = memo(({ ticket }: ITicket) => {
    const getTicketRows = (ticket: TicketType) => {
        const rows: ITicketCell[][] = [];

        for (let row = 0; row < 3; row++) {
            rows[row] = Array(9).fill(0);

            // There are only 5 numbers in a row, we should loop only 5 times.
            // For the number 90 and set the last column with index to 8
            for (let i = 0; i < 5; i++) {

                const value = ticket.pop() as ITicketCell;
                const column = value.number === 90 ? 8 : Math.floor(value.number / 10);

                rows[row][column] = { number: value.number, selected: value.selected };
            }
        }

        return rows
    }

    const rows = getTicketRows(ticket);
// console.log(' rows', rows);

    return (
        <Paper elevation={2} sx={{ mx: 2, my: 1 }}>
            <Box sx={{
                display: 'grid',
                gridTemplateRows: 'repeat(3, 1fr)',
                gridTemplateColumns: 'repeat(9, 1fr)',
                columnGap: '2px',
                rowGap: '2px',
                p: 1
            }}>
                {rows.map((row, rowsIdx) => {
                    return row.map((cell, rowIdx) => <TicketCell cell={cell} key={rowsIdx + rowIdx} /> )
                })}
            </Box>
        </Paper>
    )
});
