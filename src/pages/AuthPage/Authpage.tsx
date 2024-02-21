import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import LoginForm from "./LoginForm";

function AuthPage() {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Grid
        container
        direction="column"
        sx={{
          minHeight: "100vh",
        }}
      >
        <Container component="main" maxWidth="xs">
          <Grid container spacing={3} maxWidth="xs" mt={8}>
            <Grid item xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="baseline"
                sx={{ mb: { xs: -0.5, sm: 0.5 } }}
              >
                <Typography component="h1" variant="h5">
                  Login
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <LoginForm />
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Box>
  );
}
export default AuthPage;
