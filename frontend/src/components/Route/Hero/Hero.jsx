import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { Button } from "@mui/material";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url(https://pickbazarlaravel.s3.ap-southeast-1.amazonaws.com/904/grocery.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={`${styles.section} text-center  w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[50px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Groceries Delivered in 90 Minute
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          Get your healthy foods & snacks delivered at your doorsteps all day
          everyday
        </p>
        <Link to="/products" className="inline-block">
          <Button
            color="success"
            variant="contained"
            sx={{ fontSize: 20, mt: 4, textTransform: "none" }}
          >
            {/* <div className={`${styles.button} mt-5`}> */}
            {/* <span className="text-[#fff] font-[Poppins] text-[18px]"> */}
            Shop Now
            {/* </span> */}
            {/* </div> */}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
