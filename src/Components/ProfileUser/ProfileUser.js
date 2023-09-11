import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { FaUserCircle } from "react-icons/fa";
import css from "./ProfileUser.module.css";

function ProfileUser(props) {
  const { user, handleLogout } = props;
  return (
    <>
      <OverlayTrigger
        trigger="click"
        key="bottom"
        placement="bottom"
        overlay={
          <Popover id={`popover-positioned-bottom}`}>
            <Popover.Header as="h3">{user.name}</Popover.Header>
            <Popover.Body>
              <Button variant="secondary" onClick={() => handleLogout()}>
                {" "}
                Log out
              </Button>
            </Popover.Body>
          </Popover>
        }
      >
        <Button variant="outline-light">
          <span className={css.logout}>
            <FaUserCircle className={css.icon} />
            {/* {user.name} */}
          </span>
        </Button>
      </OverlayTrigger>
    </>
  );
}

export default ProfileUser;
