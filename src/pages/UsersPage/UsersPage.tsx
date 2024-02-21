import React, { useState } from "react";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
  TableContainer,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
import { useGetUsers } from "src/graphql/hooks/useQueries";
import { isMobile } from "src/constants";
import EditUserModal from "src/components/ModalWindow/EditUserModal";
import DeleteUserModal from "src/components/ModalWindow/DeleteUserModal";
import MobileTable from "./MobileTable";

const UsersPage = () => {
  const { data } = useGetUsers();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteUserId] = useState<string | null>(null);

  const handleEditUser = (userId: number) => () => {
    setEditUserId(userId);
    setEditModalOpen(true);
  };

  return (
    <div style={{ maxWidth: "100%" }}>
      <Typography
        variant="subtitle1"
        sx={{
          textAlign: "center",
          fontSize: "30px",
          marginTop: "30px",
          marginBottom: "30px",
        }}
        className="pageTitle"
      >
        Пользователи
      </Typography>
      {isMobile ? (
        <MobileTable users={data?.getUsers} handleEditUser={handleEditUser} />
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            padding: "20px",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Имя</TableCell>
                <TableCell>Фамилия</TableCell>
                <TableCell>Почта</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.getUsers?.map((user: any) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <IconButton onClick={handleEditUser(user.id)}>
                      <EditIcon />
                    </IconButton>
                    {/* <IconButton>
                    <DeleteIcon
                      onClick={() => {
                        handleDeleteClick(user.id);
                        setDeleteModalOpen(true);
                      }}
                    />
                  </IconButton> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {editModalOpen && (
        <EditUserModal
          open={editModalOpen}
          handleClose={() => setEditModalOpen(false)}
          user={data?.getUsers.find((user: any) => user.id === editUserId)}
        />
      )}
      {deleteModalOpen && (
        <DeleteUserModal
          open={deleteModalOpen}
          handleClose={() => setDeleteModalOpen}
          user={data?.getUsers.find((user: any) => user.id === deleteUserId)}
        />
      )}
    </div>
  );
};

export default UsersPage;
