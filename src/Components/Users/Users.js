import { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaUsers } from "react-icons/fa";
import css from "./Users.module.css";
import axios from "axios";
import ShowUsers from "./ShowUsers";
const LIMIT = 10;
function Users(props) {
  const { user } = props;
  const [showMenu, setShowMenu] = useState(false);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/data/all", {
          params: {
            page: currentPage,
            limit: LIMIT,
          },
        });
        const data = response.data;
        setUsers(data.users);
        setTotalPages(data.totalPages);
        setCurrentPage(data.currentPage);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const handleNext = async () => {
    try {
      const response = await axios.get("/data/all", {
        params: {
          page: currentPage + 1,
          limit: LIMIT,
        },
      });
      const data = response.data;
      setUsers(data.users);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePrev = async () => {
    try {
      const response = await axios.get("/data/all", {
        params: {
          page: currentPage - 1,
          limit: LIMIT,
        },
      });
      const data = response.data;
      setUsers(data.users);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => setShowMenu(false);
  const handleShow = () => setShowMenu(true);
  return (
    <>
      <span className={css.users} onClick={handleShow}>
        <FaUsers className={css.icon} /> Users
      </span>
      <Offcanvas show={showMenu} onHide={() => handleClose()}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{user?.name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <ShowUsers
              users={users}
              totalPages={totalPages}
              currentPage={currentPage}
              handlePrev={handlePrev}
              handleNext={handleNext}
            />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Users;
