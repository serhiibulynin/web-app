import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "src/components/ModalWindow/MyModal";
// import { Link } from "react-router-dom";
import { buttonData } from "src/constants/buttons";

interface ButtonProps {
  icon: React.ReactNode;
  text: string;
  link: string;
  iconSize?: string;
}

const NavigationButton: React.FC<ButtonProps> = ({
  link,
  icon,
  text,
  iconSize,
}) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={2} sx={{ textAlign: "center" }}>
      <Link to={link} style={{ textDecoration: "none", color: "inherit" }}>
        {React.cloneElement(icon as React.ReactElement, {
          style: { fontSize: iconSize },
        })}
      </Link>
      <Typography align="center" variant="body1" sx={{ marginTop: "8px" }}>
        {text}
      </Typography>
    </Grid>
  );
};

const Mainpage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
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
        Главная
      </Typography>
      <Container
        sx={{
          maxWidth: 1200,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          {buttonData.map((button, index) => (
            <Grid
              className="openModalBtn"
              key={index}
              item
              xs={12}
              sm={6}
              md={4}
              lg={2}
              sx={{
                "& .MuiButton-root": {
                  width: "100%",
                  "& svg": {
                    width: "100%",
                    height: "100%",
                  },
                },
              }}
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <NavigationButton
                link={button.link}
                icon={button.icon}
                text={button.text}
                iconSize="150px"

                // onClick={() => handleButtonClick(button.text)}
              />
            </Grid>
          ))}
          {modalOpen && (
            <Modal open={modalOpen} handleClose={() => setModalOpen(false)} />
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Mainpage;
