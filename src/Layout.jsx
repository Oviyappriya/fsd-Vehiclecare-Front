import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const Cartlink = () => {
  const { totalQty } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.account);
  if (!userInfo || userInfo.userType === "seller") {
    return "";
  }
  return (
    <Link className="btn btn-outline-light" to={"/cart"}>
      <i className="fa-solid fa-truck-monster"></i> ({totalQty})
    </Link>
  );
};
const Layout = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "account_logout" });
    navigate("/login");
  };
  return (
    <div>
      <header
        className="z-3 text-white p-3 position-sticky"
        style={{ backgroundColor: "#7432F8" }}
      >
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <h1 className="h4" style={{ color: "white" }}>
                {<i className="fa-solid fa-car"></i>} VehicleCareApp
              </h1>
            </Link>

            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-warning" type="submit">
                Search
              </button>
            </form>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Cartlink />
              <i
                tabIndex={0}
                className="fa-solid fa-right-from-bracket mx-3"
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          </div>
        </div>
      </header>
      <div style={{ minHeight: "150vh" }}>
        <Outlet />
      </div>

      <footer className="bg-black text-white text-center">
        Thank you for visiting our page !!!
      </footer>
    </div>
  );
};

export default Layout;
