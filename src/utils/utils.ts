import {ITicketCell, TicketType} from '../types';
import {random} from 'lodash-es';

export const getRangeNumbers = (min = 1, max = 90): number[] =>
    Array.from({length: max - min + 1}, (number, index) => ++index);

export const selectNextNumber = (numbers: number[]) => {
    const index = Math.floor(Math.random() * (numbers.length - 1));

    return numbers[index];
}

export const getShuffledNumbers = (numbers): ITicketCell[] => {
    const nums = [...numbers];
    const shuffledNumbers: ITicketCell[] = [];

    while (nums.length) {
        const nextNumber = selectNextNumber(nums);
        shuffledNumbers.push({ number: nextNumber, selected: false });

        const index = nums.indexOf(nextNumber);
        nums.splice(index, 1);
    }

    return shuffledNumbers;
}

export const generateTickets = (): TicketType[] => {
    const rangeNumbers = getRangeNumbers(1, 90);
    const shuffledNumbers = getShuffledNumbers(rangeNumbers);
    const tickets: TicketType[] = [];

    while (shuffledNumbers.length) {
        const ticket = shuffledNumbers.splice(0, 15);

        tickets.push(ticket);
    }

    return tickets;
}

export const generateNumsForColumns = () => {
    const rangeNumbers = getRangeNumbers(1, 90);
    const rangeNums = [...rangeNumbers];
    const columns: number[][] = [];
    let count = 9;
    let idx = 0;

    while (rangeNums.length) {
        const columnNumbers = rangeNums.splice(0, count);
        const fullColumnNumbers = [...columnNumbers];

        columns.push(fullColumnNumbers);

        // to add 9 numbers for 1th ticket and 11 numbers for 9th ticket
        if (idx === 0 || idx === 7) {
            count++;
        }

        idx++;
    }

    return columns;
}

export const getColumnsWithIntegers = () => {
    const columns = generateNumsForColumns();
    // console.log('columns generateNumsForColumns: ', columns);

    const ticketsColumns = Array(columns.length).fill([]);
    // let ticketsColumns: number[][][] = Array.from({length: columns.length}, () => []);

    columns.forEach((item, i) => {
        //debugger
        const columnNumbers = [...item];
        let ticketColumnNumbers: number[][] = Array.from({length: 6}, () => []);
        let index = 0;

        while(columnNumbers.length) {
            const randomIndex = random(0, columnNumbers.length - 1);
            const randomNumber = columnNumbers.splice(randomIndex, 1)[0];

            // randomly distribute six digits, one in each column and the remaining 3 digits
            if (index === 6) {
                const randomIndex = random(0, 5);
                const arr = ticketColumnNumbers[randomIndex];

                if (arr.length < 3) {
                    arr.push(randomNumber)
                }
            } else {
                ticketColumnNumbers[index].push(randomNumber)
                index++;
            }
        }

        const sortedColumnNumbers = ticketColumnNumbers.map(item => item.length > 1 ? item.sort() : item)
        ticketsColumns[i] = [...sortedColumnNumbers];
        ticketColumnNumbers = [];
    })

    console.log('columns getColumnsWithIntegers: ', ticketsColumns);
    return ticketsColumns;
}

export const getSortedColumnsWithZero = () => {
    const columns = getColumnsWithIntegers();
    console.log('columns getColumnsWithIntegers: ', columns);

    return columns.map((column, index) => {
        return column.map(arr => {
            const columnWithZero = [...arr];

            while (columnWithZero.length < 3) {
                const index = random(0, 2);
                columnWithZero.splice(index, 0, 0);
            }

            return columnWithZero;
        });
    })
}

export const getColumnsForTicket = () => {
    const columns = getSortedColumnsWithZero();
    console.log('columns getSortedColumnsWithZero: ', columns);
    const ticketsColumns: number[][][] = Array.from({length: 6}, () => []);

    columns.forEach((ticketColumn, i ) => {
        ticketColumn.forEach((column, idx) => {
            ticketsColumns[idx].push(column);
        })
    })
    console.log("ticketsColumns:", ticketsColumns)
}

export const getColumnsForTickets = () => {
    const columns = getColumnsWithIntegers();
    const tickets: number[][] = [];

    // generate 6 tickets with columns without zero
    for(let i = 0; i < 6; i++) {
        const ticket = getTicketIntegerNumbers(columns);

        tickets.push(ticket);
    }

    console.log("tickets getColumnsForTickets:", tickets)
}

const getTicketIntegerNumbers = (cols) => {
    const columns = [...cols];
    const ticket: number[] = [];
    const ticketFlatLength = ticket.flat().length;

    while (ticketFlatLength < 15 && ticket.length < 9) {
        columns.forEach((ticketColumn, i ) => {
            if (ticketFlatLength === 15) {
                if (ticket.length === 9) {
                    return ticket;
                }

                getTicketIntegerNumbers(cols);
            }

            const randomIndex = random(0, ticketColumn.length - 1);
            const column = ticketColumn[randomIndex];

            if (ticketFlatLength + column?.length <= 15) {
                ticket.push(column)
                ticketColumn.splice(randomIndex, 1);
            }
        })
    }

    return ticket;
}