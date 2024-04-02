import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import { Grid, Paper, Typography } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  cursor: "pointer",
}));

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts;
      setData(d);
    } else {
      const d =
        allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
    //    window.scrollTo(0,0);
  }, [allProducts]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={3} />
          <br />
          <div className="bg-[#f0f0f0]">
            <div className={`${styles.section}`}>
              <Grid
                container
                spacing={{ xs: 2, md: 2 }}
                columns={{ xs: 2, sm: 8, md: 12 }}
                // sx={{ minHeight: "70vh" }}
                // sx={{ bgcolor: "#f0f0f0" }}
              >
                {data &&
                  data.map((i, index) => (
                    <Grid item xs={2} sm={4} md={3} key={index}>
                      <ProductCard data={i} key={index} />
                    </Grid>
                  ))}
              </Grid>
              {data && data.length === 0 ? (
                <h1 className="text-center w-full pb-[100px] text-[20px]">
                  No products Found!
                </h1>
              ) : null}
            </div>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsPage;
