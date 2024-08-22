import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleAPIPost } from "../apis/apis";
import { useEffect } from "react";
import Loader from "../components/Loader";

const BookingSuccess = () => {
  const [params] = useSearchParams();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const processBooking = async () => {
    try {
      setLoading(true);
      const response = await handleAPIPost("/booking/place-booking", cart);

      alert(response.msg);
      navigate(`/bookingSuccess?bookingNo=${response.bookingNo}`);

      dispatch({ type: "cart_clear" });
    } catch (err) {
      console.log(err);
      alert("Something went wrong, Please try again later");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!params.get("bookingNo")) {
      processBooking();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) {
    return <Loader />;
  }

  return (
    <div style={{ color: "greenyellow" }}>
      <h1>
        Booking Successfully{" "}
        {params.get("bookingNo") && `BookingId:${params.get("bookingNo")}`}
      </h1>
    </div>
  );
};

export default BookingSuccess;
