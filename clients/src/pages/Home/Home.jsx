import { Navbar } from "../../components/Navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import useFetch from "../../components/hooks/useFetch";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
export function Home() {
    const { data, loading, error } = useFetch("/business/warehouse/63d40782005feffa8136ce13");
    const orderObj = useFetch("/business/order/63d40782005feffa8136ce13");
    const businessObj = useContext(AuthContext);
    const navigate = useNavigate();
    return (
      <div>  
            {businessObj.loading ?("loading"): (<div>
                <Navbar businessName={businessObj.business.name} />
                <div className={styles.title_warehouse}>Your Warehouses</div>
                <div className={styles.countryBox}>
                {data !== undefined &&
                    data.map((warehouse) => (
                        <div className={styles.country} onClick={(e) => {
                            e.preventDefault();
                            navigate(`/order/${warehouse._id}`);
                        }}>
                         <p>{warehouse.country}</p>
                        </div>
                    ))}
                </div>    
                <div className={styles.title_warehouse}>Order History</div>
                {orderObj.data !== undefined &&
                    orderObj.data.map((order) => (
                        <div className={styles.order}>
                            <p>To: {order.to}</p>
                            <p>From: {order.from}</p>
                            <p>CommodityName: {order.commodityName}</p>
                            <p>Status: {order.status}</p>
                        </div>
                    ))}
                {/* <button className={styles.btn} onClick={(e) => {
                    navigate("/order");
                }}>Create Order</button> */}
            </div>)}
        </div>    
    );
}