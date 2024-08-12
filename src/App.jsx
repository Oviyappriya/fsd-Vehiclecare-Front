import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import ServiceListing from './pages/ServiceListing.jsx';
import UserProfile from './pages/UserProfile.jsx';
import Cart from './pages/Cart.jsx';
import ServiceInfo from './pages/ServiceInfo.jsx';
import Layout from './Layout.jsx';
import store from './store/store.js';

function App() {
  return (
   <Provider store={store}>
     <Router>
      <Routes>
        <Route element={<Layout />}>
        <Route path="/" element={<ServiceListing />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/:serviceSku" element={<ServiceInfo />} />
        </Route>
      </Routes>
    </Router>
   </Provider>
  );
}
export default App;
