// import { Modal } from "@mui/material";
import React from "react";
// import { useGetUsers } from "src/graphql/hooks/useQueries";

interface DeleteUserModalProps {
  open: boolean;
  handleClose: () => void;
  user: any;
}

// const [deleteUserMutation, { loading }] = useDeleteUserById();

// const deleteUserHandler = (formValues: FormValues) => {
//   deleteUserMutation({
//     variables: {
//       updateUserByIdId: user?.id,
//       input: { ...formValues },
//     },
//     onCompleted: (data) => {
//       console.log(data);
//       if (data) {
//         toast.success("Успешно обновлено");
//         handleClose();
//       }
//     },
//     onError: (error) => {
//       if (error) {
//         toast.error(error.message);
//       }
//     },
//     awaitRefetchQueries: true,
//     refetchQueries: [GET_USERS],
//   });
// };

const DeleteUserModal: React.FC<DeleteUserModalProps> = () => {
  // const { data, error } = useGetUsers();

  return <div>s</div>;
};

export default DeleteUserModal;
