import logo from "../../../portfolio/img/offramplogo.png";
import "./Logo.css";

export default function Logo() {
  return (
    <div className="logo">
      <img src={logo} alt="Off Ramp band logo" />
    </div>
  );
}