import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useGetCurrentUserQuery } from "src/graphql/generated";

import Drawer from "../Drawer/Drawer";

const Header = () => {
  const { data } = useGetCurrentUserQuery();

  return (
    <Box
      component="main"
      sx={{
        height: "10vh",
        width: "100%",
        backgroundColor: "#333",
        position: "relative",
        zIndex: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Drawer />
      <Grid>
        <Button
          variant="text"
          startIcon={<PersonIcon sx={{ color: "white" }} />}
          sx={{ marginRight: "20px" }}
        >
          <span style={{ color: "white", margin: 0 }}>
            {data?.getCurrentUser?.firstName}
          </span>
        </Button>
      </Grid>
    </Box>
  );
};

export default Header;
