import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React from "react";
import { User } from "src/graphql/generated";
import { palette } from "src/theme/foundations";
// import EditIcon from "@mui/icons-material/Edit";

interface MobileTableProps {
  users: User[] | undefined;
  handleEditUser: (userId: number) => () => void;
}

function MobileTable({ users, handleEditUser }: MobileTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody sx={{ backgroundColor: palette.background }}>
          {users?.map((user: User) => (
            <Box
              key={user.id}
              style={{ backgroundColor: palette.white, marginTop: "20px" }}
              onClick={handleEditUser(user.id)}
            >
              <TableRow
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "space-between",
                  justifyContent: "space-between",
                  padding: "8px",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <TableCell sx={{ border: "none" }}>Имя</TableCell>
                <TableCell sx={{ border: "none" }}>{user.firstName}</TableCell>
              </TableRow>
              <TableRow
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "space-between",
                  justifyContent: "space-between",
                  padding: "8px",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <TableCell sx={{ border: "none" }}>Фамилия</TableCell>
                <TableCell sx={{ border: "none" }}>{user.lastName}</TableCell>
              </TableRow>
              <TableRow
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "space-between",
                  justifyContent: "space-between",
                  padding: "8px",
                }}
              >
                <TableCell sx={{ border: "none" }}>Почта</TableCell>
                <TableCell sx={{ border: "none" }}>{user.email}</TableCell>
              </TableRow>
            </Box>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default MobileTable;
