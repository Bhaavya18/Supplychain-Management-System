import * as React from "react";
import { useState,useContext } from "react";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
export function Login() {
  const [credentials, setCredentials] = useState({
        name: undefined,
        password: undefined,
  });  
  const [err, setErr] = useState("");
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async() => {
     dispatch({ type: "LOGIN_START" });
      try {
          const res=await axios.post("/auth/login", credentials);
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
          navigate("/home");
      } catch (err) {
           dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
          setErr(err);
      }
  }
  return (
    <div className={style.box}>
      <h1 className={style.heading}>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label>Name</label>
        <input
          type="text"
          required
          id="name"
          value={credentials.name}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          required
          id="password"
          value={credentials.password}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        {err !== "" && <p>{err}</p>}
        <input disabled={loading} type="submit" className={style.submit} />
      </form>
    </div>
  );
}
