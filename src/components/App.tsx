import React, { useState } from 'react';
import { Box, Button } from '@mui/material';

import { Strip } from './Strip';
import { generateTickets, generateNumsForColumns, getColumnsForTickets } from "../utils";
import { TicketType } from "../types";

function App() {
    const [tickets, setTickets] = useState<TicketType[]>([])
    //console.log("tickets :", tickets)

    const handleButtonClick = () => {
        const newTickets = generateTickets();

        const numbersForCols = generateNumsForColumns();
        // console.log("newTickets :", newTickets)

        // const numbersSorted = getSortedColumnsWithZero();
        // console.log("getSortedColumnsWithZero :", numbersSorted)
        getColumnsForTickets()

        setTickets(newTickets);
    }

  return (
        <Box display="flex" justifyContent="center">
            <Box display="flex" justifyContent="space-between" width='60vw' padding={4}>
                <Strip tickets={tickets} />
                <Box display="flex" alignItems="center">
                    <Button
                        color='primary'
                        variant='contained'
                        onClick={handleButtonClick}
                    >
                        Start game
                    </Button>
                </Box>

            </Box>
        </Box>
  );
}

export default App;
