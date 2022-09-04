import React from 'react';
import { Box, Paper } from '@mui/material';
import { Ticket } from './Ticket';
import { TicketType } from "../types";

interface IStrip {
    tickets: TicketType[];
}

export const Strip = ({ tickets }: IStrip) => {
    return (
        <Paper elevation={3} sx={{ minWidth: '56%', minHeight: '788px', mr: 2, p: 2 }}>
            <Box display="flex" flexDirection="column">
                {tickets.map((ticket, i) => <Ticket ticket={ticket} key={`${ticket[0]}` + i}/>)}
            </Box>
        </Paper>
    );
};
