import React from "react";
import { useCookies } from "react-cookie";
import {styles} from './navbarStyle'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const Navbar = () => {
  
  const [cookies, setCookie, removeCookie] = useCookies(["token"])
  
  const authUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate()
  
  // logout
  const handleLogout = () => {
    Swal.fire({
      title: 'Do you want to logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Logout',
    }).then((result) => {
      if (result.isConfirmed) {
        removeCookie("token");
        navigate('/login')
      } 
    })
  }

  return (
    <nav className={styles.container}>
      <div>
        <span className="text-ghost-700 font-bold text-lg">
          Hello, {authUser.username}
        </span>
      </div>

      <button
        className={styles.logout}
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar
