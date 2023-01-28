import "./newOrder.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { orderInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewOrder = () => {
  const [info, setInfo] = useState({});
  const [businessId, setBusinessId] = useState(undefined);
  const [orders, setOrders] = useState([]);

  const { data, loading, error } = useFetch("/business");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    console.log(businessId);
    e.preventDefault();
    const orderNumbers = orders.split(",").map((order) => ({ number: order }));
    try {
      await axios.post(`/order/${businessId}`, { ...info, orderNumbers });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(info)
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Theater</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {orderInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Orders</label>
                <textarea
                  onChange={(e) => setOrders(e.target.value)}
                  placeholder="give comma between orders."
                />
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;