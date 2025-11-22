
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { logout } from "../../../store/authSlice";
import authService from "../../../appwrite/auth";

import './CardNav.css';

const CardNav = ({
  logo,
  logoAlt = 'Logo',
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor,
  buttonBgColor,
  buttonTextColor
}) => {

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const authStatus = useSelector((state) => state.auth.status)

  const isLanding = location.pathname === "/";

  const handleButtonClick = () => {
    if (isLanding) {
      navigate("/login");
      return;
    }

    if (authStatus) {
      authService.logout().then(() => {
        dispatch(logout());
        navigate("/login");
      });
    } else {
      navigate("/login");
    }
  };

  const buttonLabel = isLanding ? "Entrar" : authStatus ? "Sair" : "Entrar";

  return (
    <div className={`card-nav-container ${className}`}>
      <nav className={`card-nav`} style={{ backgroundColor: baseColor }}>
        <div className="card-nav-top">

          <div className="logo-container">
            <Link to="/">
              <img src={logo} alt={logoAlt} className="logo" />
            </Link>
          </div>

          <button
            type="button"
            className="card-nav-cta-button"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
            onClick={handleButtonClick}
          >
            { buttonLabel }
          </button>
        </div>

      </nav>
    </div>
  );
};

export default CardNav;
