import React, { useState } from "react";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import Loader from "../components/Layout/Loader";
import ProfileSideBar from "../components/Profile/ProfileSidebar";
import ProfileContent from "../components/Profile/ProfileContent";
import { useSelector } from "react-redux";
import Footer from "../components/Layout/Footer";
import { Drawer, Paper } from "@mui/material";

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />

          {/* <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}> */}
          <Paper
            className={`${styles.section}`}
            sx={{ display: "flex", p: 4, my: 5 }}
          >
            <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%] border-r border-gray-300">
              <ProfileSideBar active={active} setActive={setActive} />
            </div>
            <ProfileContent active={active} />
          </Paper>
          <Footer />
        </>
      )}
    </div>
  );
};

export default ProfilePage;
