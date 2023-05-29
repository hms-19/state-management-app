import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styles } from "./loginStyle";

const Login = () => {
  
  const authUser = useSelector((state) => state.auth.user);

  const [cookies, setCookie] = useCookies(["token"]); 

  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const enterTextField = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogin = () => {
    if (data.username !== "" && data.password !== "") {
      if (data.username !== authUser.username) {
        Swal.fire({
          title: 'Warning!',
          text: 'Username is wrong !',
          icon: 'warning',
          confirmButtonText: 'OK'
      })
      } else {
        if (data.password !== authUser.password) {
          Swal.fire({
            title: 'Warning!',
            text: 'Password is wrong !',
            icon: 'warning',
            confirmButtonText: 'OK'
        })
        } else {
          setCookie(
            "token",
            "XVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTEXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTEXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE",
            {
              path: "/",
            }
          );
          navigate("/");
        }
      }
    } else {
      Swal.fire({
        title: 'Warning!',
        text: 'Please Fill All The Text Field !',
        icon: 'warning',
        confirmButtonText: 'OK'
    })
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.title}>
          <div>
            <h1 className="font-bold text-lg -mb-1">State Management App</h1>
          </div>
        </div>
        <div className="w-full">
          <label className="text-sm font-medium">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            className={styles.input}
            value={data.username}
            onChange={(e) => enterTextField("username", e.target.value)}
            required
          />
        </div>
        <div className="w-full my-3">
          <label className="text-sm font-medium">Password</label>
            <input
              type='password'
              placeholder="Enter your pasword"
              className={styles.input}
              value={data.password}
              onChange={(e) => enterTextField("password", e.target.value)}
              required
            />
        </div>
        <button className={styles.button} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
