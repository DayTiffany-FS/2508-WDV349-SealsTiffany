import NavBar from "./NavBar";
import Logo from "./Logo";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <Logo />
      {children}
    </>
  );
}