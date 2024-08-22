import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PropTypes from "prop-types";
import { Provider, useSelector } from "react-redux";
import ServiceListing from "./pages/ServiceListing.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import Cart from "./pages/Cart.jsx";
import ServiceInfo from "./pages/ServiceInfo.jsx";
import Layout from "./Layout.jsx";
import store from "./store/store.js";
import Login from "./pages/Login.jsx";
import Registration from "./pages/Registration.jsx";
import BookingSuccess from "./pages/BookingSuccess.jsx";
import "./App.css";

const ProtectedComponent = ({ component }) => {
  const { authenticated } = useSelector((state) => state.account);
  if (authenticated) {
    return component;
  }
  return <Navigate to="/login" />;
};
ProtectedComponent.propTypes = {
  component: PropTypes.node.isRequired,
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={<ProtectedComponent component={<ServiceListing />} />}
            />
            <Route
              path="/profile"
              element={<ProtectedComponent component={<UserProfile />} />}
            />
            <Route
              path="/cart"
              element={<ProtectedComponent component={<Cart />} />}
            />
            <Route
              path="/bookingSuccess"
              element={<ProtectedComponent component={<BookingSuccess />} />}
            />
            <Route
              path="/:serviceSku"
              element={<ProtectedComponent component={<ServiceInfo />} />}
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </Router>
    </Provider>
  );
}
export default App;
