import React, { useState,useContext } from "react";
import style from "./Order.module.css";
import useFetch from '../../components/hooks/useFetch';
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
export default function Order() {
  const { id } = useParams();  
  const navigate = useNavigate();
  const { data, error, loading } = useFetch(`/wareHouse/find/${id}`);  
  const wareHouseObj = useFetch(`/wareHouse/inventory/${id}`);
  const businessObj=useContext(AuthContext);
  const countries = [
    "ABW",
    "AFG",
    "AGO",
    "AIA",
    "ALB",
    "AND",
    "ARE",
    "ARG",
    "ARM",
    "ASM",
    "ATA",
    "ATF",
    "ATG",
    "AUS",
    "AUT",
    "AZE",
    "BDI",
    "BEL",
    "BEN",
    "BES",
    "BFA",
    "BGD",
    "BGR",
    "BHR",
    "BHS",
    "BIH",
    "BLM",
    "BLR",
    "BLZ",
    "BMU",
    "BOL",
    "BRA",
    "BRB",
    "BTN",
    "BWA",
    "CAF",
    "CAN",
    "CCK",
    "CHE",
    "CHL",
    "CHN",
    "CIV",
    "CMR",
    "COD",
    "COG",
    "COK",
    "COL",
    "COM",
    "CPV",
    "CRI",
    "CUB",
    "CUW",
    "CXR",
    "CYM",
    "CYP",
    "CZE",
    "DEU",
    "DJI",
    "DMA",
    "DNK",
    "DOM",
    "DZA",
    "ECU",
    "EGY",
    "ERI",
    "ESH",
    "ESP",
    "EST",
    "ETH",
    "FIN",
    "FJI",
    "FRA",
    "FRO",
    "FSM",
    "GAB",
    "GBR",
    "GEO",
    "GGY",
    "GHA",
    "GIB",
    "GIN",
    "GLP",
    "GMB",
    "GNB",
    "GNQ",
    "GRC",
    "GRD",
    "GRL",
    "GTM",
    "GUF",
    "GUM",
    "GUY",
    "HKG",
    "HND",
    "HRV",
    "HTI",
    "HUN",
    "IDN",
    "IMN",
    "IND",
    "IOT",
    "IRL",
    "IRN",
    "IRQ",
    "ISL",
    "ISR",
    "ITA",
    "JAM",
    "JEY",
    "JOR",
    "JPN",
    "KAZ",
    "KEN",
    "KGZ",
    "KHM",
    "KIR",
    "KNA",
    "KWT",
    "LBN",
    "LBR",
    "LBY",
    "LCA",
    "LIE",
    "LKA",
    "LSO",
    "LTU",
    "LUX",
    "LVA",
    "MAC",
    "MAR",
    "MCO",
    "MDA",
    "MDG",
    "MDV",
    "MEX",
    "MHL",
    "MKD",
    "MLI",
    "MLT",
    "MMR",
    "MNE",
    "MNG",
    "MNP",
    "MOZ",
    "MRT",
    "MSR",
    "MTQ",
    "MUS",
    "MWI",
    "MYS",
    "MYT",
    "NAM",
    "NCL",
    "NER",
    "NFK",
    "NGA",
    "NIC",
    "NIU",
    "NLD",
    "NOR",
    "NPL",
    "NRU",
    "NZL",
    "OMN",
    "PAK",
    "PAN",
    "PCN",
    "PER",
    "PHL",
    "PLW",
    "PNG",
    "POL",
    "PRI",
    "PRT",
    "PRY",
    "PSE",
    "PYF",
    "QAT",
    "REU",
    "ROU",
    "RUS",
    "RWA",
    "SAU",
    "SDN",
    "SEN",
    "SGP",
    "SGS",
    "SHN",
    "SJM",
    "SLB",
    "SLE",
    "SLV",
    "SMR",
    "SOM",
    " SPM",
    " SRB",
    "SSD",
    "STP",
    "SUR",
    "SVK",
    "SVN",
    "SWE",
    "SWZ",
    "SYC",
    "SYR",
    "TCA",
    "TCD",
    "TGO",
    "THA",
    "TJK",
    "TKL",
    "TKM",
    "TLS",
    "TON",
    "TTO",
    "TUN",
    "TUR",
    "TUV",
    "TWN",
    "TZA",
    "UGA",
    "UKR",
    "URY",
    "USA",
    "UZB",
    "VCT",
    "VEN",
    "VNM",
    "VUT",
    "WLF",
    "WSM",
    "YEM",
    "ZAF",
    "ZMB",
    "ZWE",
  ];
  const [volume,setVolume]=useState(0);
  const [qty, setQty] = useState(0);
  const [destination,setDestination]=useState("");
  const [product, setProduct] = useState("");
  const [err, setErr] = useState("");
  const getName = () => {
      let idx = -1;
      if (product !== "") {
          for (let i = 0; i < wareHouseObj.data.length; i++) {
              if (product === wareHouseObj.data[i]._id) {
                  idx = i;
                  break;
              }
          }
      } else
          idx = 0;
      return wareHouseObj.data[idx].name;
  }
 const handleSubmit = async () => {
      const productName = getName();
      try {
          const res = await axios.post(`/order/${businessObj.business._id}`, {
              from: `${data.name}`,
              to: `${destination}`,
              commodityName: `${productName}`,
              qty: `${qty}`,
              volume: `${volume}`,
              price: "20000"
          });
    } catch (err) {
        throw (err);
    }
  }
  return (
    <React.Fragment>
      <div className={style.title}>Create Shipment</div>
      <form onSubmit={async(e)=>{
            e.preventDefault();
            try {
                await handleSubmit();
                navigate("/home");
            } catch (err) {
                setErr(err);
            }  
      }}>
        <div>
          <div>From which warehouse</div>
          <input type="text" value={data.country} disabled />
        </div>
        <div>
          <div>Destination</div>
          <select value={destination} onChange={(e)=>setDestination(e.target.value)} required>
            {countries.map((country) => (
              <option value={country}>{country}</option>
            ))}
          </select>
        </div>
        <div className="quantity">
          <div>Quantity</div>
          <input
            className={style.quantity1}
            type="number"
            placeholder="Enter Quantity"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            required
          />
        </div>
        <div>
          <div>Product</div>
                  <select value={product} onChange={(e) => {
                      setProduct(e.target.value)
                      console.log(e.target.value);
                }} required>
            {wareHouseObj.data.map((prod) => (
              <option value={prod._id}>{prod.name}</option>
            ))}
          </select>
        </div>
        <div className="volume">
          <div>Volume</div>
          <input
            className={style.quantity1}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            type="number"
            placeholder="Enter Quantity"
            required
          />
        </div>
        <span>{err}</span>
        <input className="btnClass" type="submit"/>
      </form>
    </React.Fragment>
  );
}
