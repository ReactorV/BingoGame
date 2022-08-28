import React from 'react';
import { generateTickets, getTicketRows } from "../utils";

function App() {
  const tickets = generateTickets();
  const rows = getTicketRows();

  console.log("tickets", tickets)
  console.log("rows", rows)
  return (
    <div className="App">
    </div>
  );
}

export default App;
