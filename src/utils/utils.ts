interface ITicketCell {
    number: number;
    selected: boolean;
}

type ITicket = ITicketCell[];

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

export const generateTickets = (): ITicket[] => {
    const rangeNumbers = getRangeNumbers(1, 90);
    const shuffledNumbers = getShuffledNumbers(rangeNumbers);
    const tickets: ITicket[] = [];

    while (shuffledNumbers.length) {
        const ticket = shuffledNumbers.splice(0, 15);

        tickets.push(ticket);
    }

    return tickets;
}

export const getTicketRows = () => {
    const ticket = [
        {
            "number": 71,
            "selected": false
        },
        {
            "number": 10,
            "selected": false
        },
        {
            "number": 68,
            "selected": false
        },
        {
            "number": 39,
            "selected": false
        },
        {
            "number": 74,
            "selected": false
        },
        {
            "number": 50,
            "selected": false
        },
        {
            "number": 53,
            "selected": false
        },
        {
            "number": 81,
            "selected": false
        },
        {
            "number": 75,
            "selected": false
        },
        {
            "number": 78,
            "selected": false
        },
        {
            "number": 88,
            "selected": false
        },
        {
            "number": 41,
            "selected": false
        },
        {
            "number": 73,
            "selected": false
        },
        {
            "number": 65,
            "selected": false
        },
        {
            "number": 21,
            "selected": false
        }
    ]
    const rows: ITicketCell[][] = [];

    for (let row = 0; row < 3; row++) {
        rows[row] = Array(9).fill(0);

        // There are only 5 numbers in a row, we should loop only 5 times.
        // For the number 90 and set the last column with index to 8
        for (let i = 0; i < 5; i++) {
            const value = ticket.pop() as ITicketCell;
            const column = value.number === 90 ? 8 : Math.floor(value.number / 10)

            rows[row][column] = { number: value.number, selected: value.selected}
        }
    }

    return rows
}
