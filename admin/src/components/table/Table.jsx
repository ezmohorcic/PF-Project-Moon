import React from "react";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { format } from "timeago.js";

const List = ({ orders }) => {
  if(orders !== null) {


  let ordersCopy = [...orders];
  //function that sort orders de createdAt date
  const sortByDate = (a, b) => {
    if (a.createdAt < b.createdAt) return 1;
    if (a.createdAt > b.createdAt) return -1;
    return 0;
  };
  //sort orders by date
  ordersCopy.sort(sortByDate);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Nº TRANSACTION</TableCell>
            <TableCell className="tableCell">TYPE</TableCell>
            <TableCell className="tableCell">BY</TableCell>
            <TableCell className="tableCell">TO</TableCell>
            <TableCell className="tableCell">AMOUNT</TableCell>
            <TableCell className="tableCell">DATE</TableCell>
            <TableCell className="tableCell">PAYMENT METHOD</TableCell>
            <TableCell className="tableCell">TICKET</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {ordersCopy?.map((order) => (

            <TableRow key={order._id}>
              <TableCell className="tableCell">{order._id}</TableCell>
              <TableCell className="tableCell">{order.type}</TableCell>
              <TableCell className="tableCell">{order.user.username}</TableCell>
              <TableCell className="tableCell">{order.to.username}</TableCell>
              <TableCell className="tableCell">$ {order.amount}</TableCell>
              <TableCell className="tableCell">
                {format(order.createdAt)}
              </TableCell>
              <TableCell className="tableCell">{order.card}</TableCell>
              <TableCell className="tableCell">
                <a
                  style={{ textDecoration: "none" }}
                  href={order.ticket}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className={`status Approved`}>LINK</span>
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  
  }
};

export default List;
