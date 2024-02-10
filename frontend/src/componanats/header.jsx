import React, { useState, useEffect } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import _debounce from "lodash/debounce";
import _throttle from "lodash/throttle";
import MenuIcon from "@mui/icons-material/Menu";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { signout } from "../actions/authAction";

const Header = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.authenticated);
  const user = useSelector((state) => state.auth.user);

  const [scrolling, setScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const debouncedSetScrolling = _debounce(() => {
    setScrolling(false);
  }, 1000);
  useEffect(() => {
    const handleScroll = _throttle(() => {
      setScrolling(true);
      debouncedSetScrolling();
    }, 200);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [debouncedSetScrolling]);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  const clickSignout = () => {
    dispatch(signout());
  };

  return (
    <div>
      <div className="main-header-container">
        <div className="detailbar-container">
          <div className="detailbar-inner">
            <div className="logo-container">
              <img src="../../public/book1.png" className="logo" />
            </div>
            <div className="option-container">
              <ul className="option-ul">
                <a href="/login">
                  {authenticated ? (
                    <li className="li-style">
                      <PersonOutlineOutlinedIcon
                        style={{
                          fontSize: "17px",
                          color: "#333",
                          marginRight: "5px",
                        }}
                      />
                      {user.FirstName}
                    </li>
                  ) : (
                    <li className="li-style">
                      <PersonOutlineOutlinedIcon
                        style={{
                          fontSize: "21px",
                          color: "#333",
                          marginRight: "5px",
                        }}
                      />
                      Sign In
                    </li>
                  )}
                </a>
                <a href="/register">
                  {authenticated ? (
                    <li
                      className="li-style"
                      onClick={(e) => {
                        e.stopPropagation();
                        clickSignout();
                      }}
                    >
                      <LogoutIcon
                        style={{
                          fontSize: "21px",
                          color: "#333",
                          marginRight: "5px",
                        }}
                      />
                      Logout
                    </li>
                  ) : (
                    <li className="li-style">Join Now</li>
                  )}
                </a>
              </ul>
            </div>
          </div>
        </div>
        <div className="navbar-container">
          <div className="navbar-inner">
            <div className="nav-container">
              <ul className="navbar-ul">
                <li className="navbar-li-style"><a href="/">Home</a></li>
                <li className="navbar-li-style"><a href="/admin">BOOK MANAGE</a></li>
                <li className="navbar-li-style">
                  nav 3 <KeyboardArrowDownOutlinedIcon />
                  {scrolling === false ? (
                    <div className="submanu-container">
                      <div className="inner-sub" id="inner-sub">
                        <div className="submanu">
                          <h3>sub nav</h3>
                          <p>option 1</p>
                          <p>option 2</p>
                          <p>option 3</p>
                          <p>option 4</p>
                        </div>
                        <div className="submanu">
                          <h3>sub nav</h3>
                          <p>option 1</p>
                          <p>option 2</p>
                          <p>option 3</p>
                          <p>option 4</p>
                        </div>
                        <div className="submanu">
                          <h3>sub nav</h3>
                          <p>option 1</p>
                          <p>option 2</p>
                          <p>option 3</p>
                          <p>option 4</p>
                        </div>
                        <div className="submanu">
                          <h3>sub nav</h3>
                          <p>option 1</p>
                          <p>option 2</p>
                          <p>option 3</p>
                          <p>option 4</p>
                        </div>
                      </div>
                      <div className="bottom-div">
                        <p className="bottom-p">Books & Magazines Overview</p>
                      </div>
                    </div>
                  ) : null}
                </li>

                <li className="navbar-li-style">nav4</li>
                <li className="navbar-li-style">nav5</li>
                <li className="navbar-li-style">nav6</li>
                <li className="navbar-li-style">nav7</li>
                <li className="navbar-li-style">nav8</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-header">
        {menuOpen === false ? (
          <div className="main-header">
            <div className="logo-div">
              <img src="../../public/book1.png" />
            </div>
            <div className="action-div">
              <MenuIcon className="action-icons" onClick={handleClick} />
            </div>
          </div>
        ) : (
          <div className="main-header2">
            <div className="head">
              <div className="logo-div">
                <img src="../../public/book1.png" />
              </div>
              <div className="action-div" id="icon-action">
                <CloseIcon className="action-icons" onClick={handleClick} />
              </div>
            </div>
            <div className="manu-body">
              <div className="inner-sub">
                <h3>Main Menu</h3>
                <ul className="navbar-main-ul">
                  <li className="navbar-main-li">Home</li>
                  <li className="navbar-main-li">Book Manage</li>
                  <li className="navbar-main-li">
                    Nav 3
                    <KeyboardArrowDownOutlinedIcon style={{ float: "right" }} />
                    <ul>
                      <li className="navbar-main-sub">
                        Sub Nav 1
                        <KeyboardArrowDownOutlinedIcon
                          style={{ float: "right" }}
                        />
                        <ul className="navbar-main-sub-navigations">
                          <li className="navbar-main-sub-navigations-li">
                            sample 1
                          </li>
                          <li className="navbar-main-sub-navigations-li">
                            sample 2
                          </li>
                          <li className="navbar-main-sub-navigations-li">
                            sample 3
                          </li>
                        </ul>
                      </li>
                      <li className="navbar-main-sub">
                        Sub Nav 2
                        <KeyboardArrowDownOutlinedIcon
                          style={{ float: "right" }}
                        />
                        <ul className="navbar-main-sub-navigations">
                          <li className="navbar-main-sub-navigations-li">
                            sample 1
                          </li>
                          <li className="navbar-main-sub-navigations-li">
                            sample 2
                          </li>
                          <li className="navbar-main-sub-navigations-li">
                            sample 3
                          </li>
                        </ul>
                      </li>
                      <li className="navbar-main-sub">
                        Sub Nav 3
                        <KeyboardArrowDownOutlinedIcon
                          style={{ float: "right" }}
                        />
                        <ul className="navbar-main-sub-navigations">
                          <li className="navbar-main-sub-navigations-li">
                            sample 1
                          </li>
                          <li className="navbar-main-sub-navigations-li">
                            sample 2
                          </li>
                          <li className="navbar-main-sub-navigations-li">
                            sample 3
                          </li>
                        </ul>
                      </li>
                      <li className="navbar-main-sub">
                        Sub Nav 4
                        <KeyboardArrowDownOutlinedIcon
                          style={{ float: "right" }}
                        />
                        <ul className="navbar-main-sub-navigations">
                          <li className="navbar-main-sub-navigations-li">
                            sample 1
                          </li>
                          <li className="navbar-main-sub-navigations-li">
                            sample 2
                          </li>
                          <li className="navbar-main-sub-navigations-li">
                            sample 3
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className="navbar-main-li">dining</li>
                  <li className="navbar-main-li">event</li>
                  <li className="navbar-main-li">more</li>
                </ul>
              </div>
              <hr className="hr-line" />
              <div className="action-container">
                <div className="action-inne">
                  <PersonOutlineOutlinedIcon style={{ marginRight: "10px" }} />
                  Sign In
                </div>
                <div className="action-inne">
                  <PersonAddAltOutlinedIcon style={{ marginRight: "10px" }} />
                  Join Now
                </div>
                <div className="action-inne">
                  <ArticleOutlinedIcon style={{ marginRight: "10px" }} />
                  Find Reservations
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
