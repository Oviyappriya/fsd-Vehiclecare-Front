import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
const  Cartlink= () =>{
    const {services} = useSelector((state) => state.cart)
    return(
        <li className="nav-item">
        <Link className="btn btn-outline-light" to={'/cart'}>
        <i className="fa-solid fa-truck-monster"></i>{" "}{services.length}
        </Link>
        </li>
    )
}
const Layout = () =>{
    return(
        <div>
        <header className="z-3 text-white p-3 position-sticky" style={{backgroundColor:"#7432F8"}}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <Link to={'/'} style={{textDecoration:"none" }}>
            <h1 className="h4" style={{color:"white"}}>{<i className="fa-solid fa-car"></i>}{" "}VehicleCareApp</h1>
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
            <Cartlink />
          
          </div>
        </div>
      </header>
      <div style={{minHeight:"100vh"}}>
      <Outlet />
      </div>
      
      <footer className="bg-black text-white text-center">Thank you for visiting our page !!!</footer>
        </div>
    )
}

export default Layout;