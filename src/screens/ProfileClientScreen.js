import React, { useEffect , Fragment} from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";


export default function ProfileClientScreen(props) {
    const userId = props.match.params.id;
  
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
    dispatch(detailsUser(userId));
    }
  }, [dispatch, userId, user]);

  return (
 
    <div className="form-container col-md-4">
    

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Fragment>
          {user ? (
            <div
              className="card card-body text-center"
             
            >
                  <h2>User Profile</h2>
              <h2>
                <span style={{ marginRight: "10px", paddingLeft: "10px" }}>
                  <i className="fas fa-user" />{" "}
                </span>
                {user.name}
              </h2>
              <h2>
                <i className="fas fa-envelope" /> : {user.email}
              </h2>
            </div>
          ) : (
            <div>Ningún usuario seleccionado</div>
          )}
          </Fragment>
      )}
    </div>
 
  );
}
