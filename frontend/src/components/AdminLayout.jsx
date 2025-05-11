import AdminNavbar from "./AdminNavbar";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminNavbar />
      <div className="admin-content">{children}</div>
    </>
  );
};

export default AdminLayout;
