import { Navbar } from "../../components/Navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import useFetch from "../../components/hooks/useFetch";
import styles from "./Home.module.css";
export function Home() {
    const { data, loading, error } = useFetch("/business/warehouse/63d40782005feffa8136ce13");
    const orderObj = useFetch("/business/order/63d40782005feffa8136ce13");
    const businessObj = useContext(AuthContext);
    return (
      <div>  
            {businessObj.loading ?("loading"): (<div>
                <Navbar businessName={businessObj.business.name} />
                <div className={styles.title_warehouse}>Your Warehouses</div>
                {data !== undefined &&
                    data.map((warehouse) => (
                        <div className={styles.country}>
                            <p>{warehouse.country}</p>
                        </div>
                    ))}
                <div className={styles.title_warehouse}>Order History</div>
                {orderObj.data !== undefined &&
                    orderObj.data.map((order) => (
                        <div>
                            <p>To: {order.to}</p>
                            <p>From: {order.from}</p>
                            <p>CommodityName: {order.commodityName}</p>
                            <p>Status: {order.status}</p>
                        </div>
                    ))}
            </div>)}
        </div>    
    );
}