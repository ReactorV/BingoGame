import { Box, Typography } from '@mui/material';
import { ITicketCell } from "../types";

interface TicketCell {
    cell: ITicketCell;
}

export const TicketCell = ({ cell }: TicketCell) => {

    return (
        <Box display="flex" alignItems="center" justifyContent="center" border="1px solid #adadad" borderRadius={1}>
            <Typography variant='subtitle1'>
                {cell.number}
            </Typography>
        </Box>
    )
}