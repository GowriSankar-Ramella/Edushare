import UserNavbar from "./UserNavbar";
import "./UserLayout.css";

const UserLayout = ({ children }) => {
  return (
    <>
      <UserNavbar />
      <div className="user-content">{children}</div>
    </>
  );
};

export default UserLayout;
