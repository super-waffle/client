import { Link } from "react-router-dom";
import "../statics/css/Layout/footer.css";

export default function Footer() {
  const logo = "../../images/logo-400.png";
  return (
    <footer className="footer">
      <div className="footer__contents"></div>

      <div className="footer__rights">
        <div className="footer__logo">
          <img src="../../images/superWaffle.png" />
          <div>© Super Waffle</div>
        </div>
        <div className="footer__link">
          <Link to={"/"}>Service</Link>
          <Link to={"/"}>Policy</Link>
          <Link to={"/"}>Creator</Link>
        </div>
      </div>
    </footer>
  );
}
