import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // const [anchorEl, setAnchorEl] = useState(null);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const navigate = useNavigate();
  // const submitHandle = (i) => {
  //   navigate(`/products?category=${i.title}`);
  //   setDropDown(false);
  //   window.location.reload();
  // };

  // search
  const [searchOpen, setSearchOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const searchLoading = searchOpen && options.length === 0;

  // useEffect(() => {
  //   let active = true;

  //   if (!searchLoading) {
  //     return undefined;
  //   }

  //   (async () => {
  //     await sleep(1e3); // For demo purposes.

  //     if (active) {
  //       setOptions([]);
  //     }
  //   })();

  //   return () => {
  //     active = false;
  //   };
  // }, [searchLoading]);

  // useEffect(() => {
  //   if (!searchOpen) {
  //     setOptions([]);
  //   }
  // }, [searchOpen]);

  // cart drawer
  const [drawerCartOpen, setDrawerCartOpen] = useState(false);
  const [drawerWishlistOpen, setDrawerWishlistOpen] = useState(false);

  const toggleCartDrawer = (newdrawerCartOpen) => () => {
    setDrawerCartOpen(newdrawerCartOpen);
  };

  const toggleWishlistDrawer = (newdrawerWishlistOpen) => () => {
    setDrawerWishlistOpen(newdrawerWishlistOpen);
  };

  return (
    <>
      <div
        className={`${
          active === true ? "bg-white shadow-md fixed top-0 left-0 z-10" : null
          // } transition hidden 800px:flex items-center justify-between w-full py-10 bg-[#4caf50] h-[70px]`}
        } transition hidden 800px:flex items-center justify-between w-full py-10 h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
              />
            </Link>
          </div>

          {/* navitems */}
          <div className={`${styles.noramlFlex}`}>
            {/* <Navbar active={activeHeading} /> */}
            <Autocomplete
              id="asynchronous-demo"
              open={searchOpen}
              onOpen={() => {
                setSearchOpen(true);
              }}
              onClose={() => {
                setSearchOpen(false);
              }}
              isOptionEqualToValue={(option, value) =>
                option.title === value.title
              }
              fullWidth
              size="small"
              autoFocus={false}
              autoHighlight={false}
              getOptionLabel={(option) => option.title}
              options={options}
              loading={searchLoading}
              sx={{
                width: {
                  sm: 300, // Width for small screens
                  md: 400, // Width for medium screens
                  lg: 500, // Width for large screens
                },
              }}
              renderInput={(params) => (
                <TextField {...params} placeholder="Search for products..." />
              )}
            />
          </div>

          <Stack direction="row" gap={2}>
            <Box position="relative">
              <Button
                variant="contained"
                color="success"
                aria-label="wishlist"
                onClick={toggleWishlistDrawer(true)}
              >
                <FavoriteBorderIcon />
              </Button>
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                {wishlist && wishlist.length}
              </span>
            </Box>
            <Box position="relative">
              <Button
                variant="contained"
                color="success"
                aria-label="cart"
                onClick={toggleCartDrawer(true)}
              >
                <AddShoppingCartIcon />
              </Button>
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                {cart && cart.length}
              </span>
            </Box>
            <Box>
              {isAuthenticated ? (
                <Link to="/profile">
                  <Button variant="contained" color="success" aria-label="cart">
                    <AccountCircleIcon />
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button variant="contained" color="success" aria-label="cart">
                    <AccountCircleIcon />
                  </Button>
                </Link>
              )}
            </Box>

            {/* cart popup */}
            {/* {openCart ? <Cart setOpenCart={setOpenCart} /> : null} */}

            {/* wishlist popup */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </Stack>

          {/* <div className="flex"> */}
          {/* <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <Button
                  color="success"
                  aria-label="cart"
                  sx={{ ":hover": { bgcolor: "#4caf50", color: "white" } }}
                >
                  <FavoriteBorderIcon />
                </Button>
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div> */}

          {/* <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <Button
                  color="success"
                  aria-label="cart"
                  sx={{ ":hover": { bgcolor: "#4caf50", color: "white" } }}
                >
                  <AddShoppingCartIcon />
                </Button>
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div> */}

          {/* <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${user?.avatar?.url}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div> */}

          {/* cart popup */}
          {/* {openCart ? <Cart setOpenCart={setOpenCart} /> : null} */}

          {/* wishlist popup */}
          {/* {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null} */}
          {/* </div> */}
        </div>
      </div>

      {/* <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between"> */}
      {/* <Button
            id="basic-button"
            color="success"
            variant="contained"
            aria-controls={dropdownOpen ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={dropdownOpen ? "true" : undefined}
            gutterBottom
            onClick={handleClick}
            sx={{ textTransform: "none", fontSize: 18 }}
            endIcon={<KeyboardArrowDownIcon />}
          >
            All category
          </Button> */}
      {/* <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={dropdownOpen}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{
              maxHeight: "25rem",
              overflowY: "auto",
            }}
          > */}
      {/* {categoriesData &&
              categoriesData.map((i, index) => (
                <MenuItem
                  key={index}
                  onClick={() => submitHandle(i)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar src={i.image_Url} />
                  <Typography variant="body1" gutterBottom sx={{ ml: 2 }}>
                    {i.title}
                  </Typography>
                </MenuItem>
              ))} */}
      {/* </Menu> */}
      {/* <div className="w-full relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-gray-300 border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    return (
                      <Link to={`/product/${i._id}`}>
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={`${i.images[0]?.url}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div> */}
      {/* <div className={`${styles.button}`}>
            <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
              <h1 className="text-[#fff] flex items-center">
                {isSeller ? "Go Dashboard" : "Become Seller"}{" "}
                <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div> */}
      {/* <div className={`${styles.noramlFlex}`}>
            <div className="relative cursor-pointer mr-[15px]">
              {isAuthenticated ? (
                <Link to="/profile">
                  <img
                    src={`${user?.avatar?.url}`}
                    className="w-[35px] h-[35px] rounded-full"
                    alt=""
                  />
                </Link>
              ) : (
                <Link to="/login">
                  <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                </Link>
              )}
            </div>
          </div> */}
      {/* </div>
      </div> */}

      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
                className="mt-3 cursor-pointer"
              />
            </Link>
          </div>
          <div>
            <Stack direction="row" gap={1}>
              <Box position="relative">
                <Button
                  variant="contained"
                  color="success"
                  aria-label="wishlist"
                  onClick={toggleWishlistDrawer(true)}
                >
                  <FavoriteBorderIcon />
                </Button>
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </Box>
              <Box position="relative">
                <Button
                  variant="contained"
                  color="success"
                  aria-label="cart"
                  onClick={toggleCartDrawer(true)}
                >
                  <AddShoppingCartIcon />
                </Button>
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </Box>
              {/* cart popup */}
              {/* {openCart ? <Cart setOpenCart={setOpenCart} /> : null} */}

              {/* wishlist popup */}
              {openWishlist ? (
                <Wishlist setOpenWishlist={setOpenWishlist} />
              ) : null}
            </Stack>
            {/* <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span class="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart && cart.length}
              </span>
            </div> */}
          </div>
          {/* cart popup */}
          {/* {openCart ? <Cart setOpenCart={setOpenCart} /> : null} */}

          {/* wishlist popup */}
          {/* {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null} */}
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px]"
                    onClick={() => setOpenWishlist(true) || setOpen(false)}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span class="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData.map((i) => {
                      const d = i.name;

                      const Product_name = d.replace(/\s+/g, "-");
                      return (
                        <Link to={`/product/${Product_name}`}>
                          <div className="flex items-center">
                            <img
                              src={i.image_Url[0]?.url}
                              alt=""
                              className="w-[50px] mr-2"
                            />
                            <h5>{i.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Navbar active={activeHeading} />
              <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />

              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      <img
                        src={`${user.avatar?.url}`}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                      />
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px] text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <Drawer
        anchor="right"
        open={drawerCartOpen}
        onClick={toggleCartDrawer(false)}
      >
        {Cart({ setDrawerCartOpen })}
      </Drawer>

      <Drawer
        anchor="right"
        open={drawerWishlistOpen}
        onClick={toggleWishlistDrawer(false)}
      >
        {Wishlist({ setDrawerWishlistOpen })}
      </Drawer>
    </>
  );
};

export default Header;
