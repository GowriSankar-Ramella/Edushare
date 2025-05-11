import PublisherNavbar from "./PublisherNavbar";
import "./PublisherLayout.css";

const PublisherLayout = ({ children }) => {
  return (
    <>
      <PublisherNavbar />
      <div className="publisher-content">{children}</div>
    </>
  );
};

export default PublisherLayout;
