import React from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";

import { experimentalStyled as styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  cursor: "pointer",
}));

const Categories = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className={`${styles.section} my-5`}>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            fontFamily: "'Quicksand', sans-serif",
          }}
        >
          All Categories
        </Typography>
      </div>

      <div className={`${styles.section}`}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, sm: 8, md: 12 }}
          >
            {categoriesData &&
              categoriesData.map((i, index) => {
                const handleSubmit = (i) => {
                  navigate(`/products?category=${i.title}`);
                };
                return (
                  <Grid
                    item
                    xs={2}
                    sm={4}
                    md={3}
                    key={index}
                    onClick={(i) => handleSubmit(i)}
                  >
                    <Item
                      sx={{
                        ":hover": {
                          boxShadow: 4,
                          color: "white",
                          bgcolor: "#2e7d32",
                          transition: "ease-in-out",
                          transitionDuration: "300ms",
                        },
                      }}
                    >
                      <Stack gap={4} p={2}>
                        <img
                          src={i.image_Url}
                          className="aspect-[3/2] object-contain"
                        />
                        <Typography variant="h6" className="truncate">
                          {i.title}
                        </Typography>
                      </Stack>
                    </Item>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Categories;
