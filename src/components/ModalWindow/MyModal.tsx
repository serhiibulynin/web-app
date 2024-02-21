import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "src/constants";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { createUserSchema } from "src/validation/createUserSchema";
import { GET_USERS } from "src/graphql/queries";
import "react-toastify/dist/ReactToastify.css";
import { useCreateUserMutation } from "src/graphql/generated";

interface UserModalProps {
  open: boolean;
  handleClose: () => void;
}

interface FormValues {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

const MyModal: React.FC<UserModalProps> = ({ open, handleClose }) => {
  const navigate = useNavigate();

  const methods = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(createUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      email: "",
    },
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = methods;

  const [createUserMutation] = useCreateUserMutation();

  const createUserHandler = (formValues: FormValues) => {
    createUserMutation({
      variables: {
        createUserInput: { ...formValues },
      },
      onCompleted: (data) => {
        if (data) {
          toast.success("Успешно");
          navigate(ROUTES.users);
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

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 4,
          padding: 4,
          width: "70%",
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
          onClick={handleClose} // Добавить иконку
        >
          X
        </Button>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Создать Пользователя
        </Typography>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(createUserHandler)} noValidate>
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
              variant="outlined"
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
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 2 }}>
              Пароль
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              {...register("password")}
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box>
              <Typography>{errors.password?.message}</Typography>
            </Box>
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
                margin: "20px auto 0",
                display: "flex",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >
              Создать
            </Button>
          </form>
        </FormProvider>
      </Box>
    </Modal>
  );
};

export default MyModal;
