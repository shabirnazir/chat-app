import React from "react";
import Button from "react-bootstrap/Button";
import css from "./Users.module.css";
import { useNavigate } from "react-router-dom";
const ShowUsers = (props) => {
  const { users, totalPages, currentPage, handlePrev, handleNext } = props;
  const history = useNavigate();

  return (
    <div>
      <h2 className={css.heading}>Users</h2>
      <hr />
      <div className={css.container}>
        {users.map((user) => (
          <div key={user._id} className={css.user}>
            <div>
              {" "}
              {user.firstName} {user.lastName}
            </div>
            <Button
              variant="outline-primary"
              onClick={() => {
                history(`/user/${user._id}`);
              }}
            >
              Message
            </Button>
          </div>
        ))}
      </div>
      <div className={css.pagination}>
        <Button
          variant="outline-primary"
          onClick={() => handlePrev()}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        <div className={css.page}>
          Page {currentPage} of {totalPages}
        </div>
        <Button
          variant="outline-primary"
          onClick={() => handleNext()}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ShowUsers;
