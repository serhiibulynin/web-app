import React, { useState } from "react";
import {
  Button,
  InputAdornment,
  IconButton,
  Box,
  Stack,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { loginSchema } from "src/validation/loginSchema";
import { useAuthContext } from "src/context/AuthContext";
import { useSignInMutation } from "src/graphql/generated";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { palette } from "src/theme/foundations";

interface FormValues {
  password: string;
  email: string;
}

const LoginForm = () => {
  const { signIn } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = methods;

  const [signInMutation, { loading }] = useSignInMutation();

  const handleClickShowPassword = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setShowPassword(!showPassword);
    e.preventDefault();
  };

  const onSubmit = async (formValues: FormValues) => {
    await signInMutation({
      variables: {
        signInInput: { ...formValues },
      },
      onCompleted: (data) => {
        if (data) {
          localStorage.setItem("token", data.signIn.accessToken);
          signIn(data.signIn?.user);
        }
      },
      onError: (error) => {
        if (error) {
          toast.error(error.message);
        }
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Stack spacing={1}>
            <InputLabel htmlFor="email-login">Email</InputLabel>
            <OutlinedInput
              id="email-login"
              placeholder="info@email.com"
              fullWidth
              autoComplete="email"
              error={Boolean(errors.email)}
              {...register("email")}
            />
            {errors.email && (
              <FormHelperText
                error
                id="standard-weight-helper-text-email-login"
              >
                {errors?.email?.message?.toString()}
              </FormHelperText>
            )}
          </Stack>
          <Stack spacing={1}>
            <InputLabel htmlFor="password-login">Password</InputLabel>
            <OutlinedInput
              fullWidth
              error={Boolean(errors.password)}
              id="-password-login"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="********"
              {...register("password")}
            />
            {errors.password && (
              <FormHelperText
                error
                id="standard-weight-helper-text-password-login"
              >
                {errors?.password?.message?.toString()}
              </FormHelperText>
            )}
          </Stack>

          <Stack>
            <Button
              disabled={loading}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              style={{ backgroundColor: palette.black, color: "white" }}
            >
              Enter to cabinet
            </Button>
          </Stack>
        </Stack>
      </Box>
    </FormProvider>
  );
};
export default LoginForm;
