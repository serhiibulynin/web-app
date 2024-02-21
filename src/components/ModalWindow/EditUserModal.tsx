// Ваш EditUserModal.tsx
import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useUpdateUserById } from "src/graphql/hooks/useMutations";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { editUserSchema } from "src/validation/editUserSchema";
import { GET_USERS } from "src/graphql/queries";

interface EditUserModalProps {
  open: boolean;
  handleClose: () => void;
  user: any;
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  open,
  handleClose,
  user,
}) => {
  const methods = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(editUserSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = methods;

  const [updateUserMutation] = useUpdateUserById();

  const updateUserHandler = (formValues: FormValues) => {
    updateUserMutation({
      variables: {
        updateUserByIdId: user?.id,
        input: { ...formValues },
      },
      onCompleted: (data) => {
        // console.log(data);
        if (data) {
          toast.success("Успешно обновлено");
          handleClose();
        }
      },
      onError: (error) => {
        if (error) {
          toast.error(error.message);
        }
      },
      awaitRefetchQueries: true,
      refetchQueries: [GET_USERS],
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <FormProvider {...methods}>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 4,
            padding: 4,
            width: "90%",
            margin: "auto",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Button
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "#ccc",
              fontSize: "24px",
            }}
            onClick={handleClose}
          >
            X
          </Button>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Редактирование пользователя
          </Typography>
          <form
            onSubmit={handleSubmit(updateUserHandler)}
            noValidate
            style={{ width: "100%" }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Имя
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              {...register("firstName")}
              id="firstName"
              autoComplete="name"
              autoFocus
            />
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Фамилия
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              {...register("lastName")}
              id="lastName"
              autoComplete="name"
            />
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Почта
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              {...register("email")}
              autoComplete="email"
            />
            <Box>
              <Typography>{errors.email?.message}</Typography>
            </Box>
            <Box
              sx={{
                width: "100%", // Set width to 100%
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#333",
                  "&:hover": {
                    backgroundColor: "black",
                  },
                  width: "100%",
                  justifyContent: "center",
                  margin: "20px auto 0",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={handleSubmit(updateUserHandler)}
              >
                Сохранить
              </Button>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: "#333",
                  "&:hover": {
                    backgroundColor: "black",
                  },
                  width: "100%",
                  justifyContent: "center",
                  margin: "20px auto 0",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={handleClose}
              >
                Отмена
              </Button>
            </Box>
          </form>
        </Box>
      </FormProvider>
    </Modal>
  );
};

export default EditUserModal;
