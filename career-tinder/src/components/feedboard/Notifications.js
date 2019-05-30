import React from "react";
import moment from "moment";
import { MDBIcon } from "mdbreact";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import * as ROUTES from "../../constants/routes";
import { Redirect } from "react-router-dom";

class Notifications extends React.Component {
  render() {
    const { auth, notifications } = this.props;
    if (!auth.uid && !auth.emailVerified)
      return <Redirect to={ROUTES.LOG_IN} />;
    return (
      <div className="container">
        <div className="profile-form-wrapper">
          <div className="card border-info mb-3">
            <div className="card-header">
              <MDBIcon icon="user" className="mr-1" /> Notifications
            </div>
            <div className="card-body text-info">
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-job-seeker"
                  role="tabpanel"
                  aria-labelledby="pills-job-seeker-tab"
                />
                <div className="section">
                  <div className="card z-depth-0">
                    <div className="card-content">
                      <ul className="online-users">
                        {notifications &&
                          notifications.map(item => {
                            return (
                              <li key={item.id}>
                                <span>{item.content}</span>
                                <div className="note-date grey-text">
                                  {moment(item.time.toDate()).fromNow()}
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const auth = state.firebase.auth;
  const userNotifications = state.firestore.ordered.notifications;

  return {
    auth: auth,
    notifications: userNotifications
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [
    {
      collection: "notifications",
      where: [["userId", "==", props.auth.uid]]
    }
  ])
)(Notifications);
