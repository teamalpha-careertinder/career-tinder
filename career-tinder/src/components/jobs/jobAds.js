import React, { Component } from "react";
import * as ROUTES from '../../constants/routes';
import $ from 'jquery/src/jquery';
import { Button } from 'reactstrap';
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import EmailVerification from "../authentication/emailVerification";
import './jobs.css';


class JobAds extends Component {
    slideAdUp = (e) => {
        var id = $(e.target)[0].closest('.job-ad-wrapper').id;
        $('#'+id).animate({right: '2000px'}, "slow").slideUp(500);
    };
    
    slideAdDown = (e) => {
        var id = $(e.target)[0].closest('.job-ad-wrapper').id;
        $('#'+id).animate({left: '2000px'}, "slow").slideUp(500);
    };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to={ROUTES.LOG_IN} />;

    return (
      <div className="container">
          <div className="row job-ads-wrapper mb-3">
              <div id="1" className="col-md-6 col-12 job-ad-wrapper">
                    <div className="card job-ad text-body shadow rounded">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-9">
                                    <i className="fas fa-heading"></i> Software Developer
                                </div>
                                <div className="col-3">
                                    <i className="fas fa-heart wishlist-selector float-right"></i>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">
                                    <b><i className="fas fa-certificate"></i> Job type:</b> Full-time
                                </div>
                                <div className="col-12">
                                    <b><i className="fas fa-euro-sign"></i> Salary range:</b> 40000-50000
                                </div>
                                <div className="col-12">
                                    <b><i className="fas fa-building"></i> Company name:</b> SAP
                                </div>
                                <div className="col-12">
                                    <b><i className="fas fa-calendar-alt"></i> Expected start date:</b> 01.10.2019
                                </div>
                                <div className="col-12">
                                    <b><i className="fas fa-graduation-cap"></i> Education:</b> B. Sc. Computer Science and Engineering
                                </div>
                                <div className="col-12">
                                    <b className="mr-2"><i className="fas fa-check-double"></i> Needed skills:</b>
                                    <span className="badge badge-danger mr-2">Java</span>
                                    <span className="badge badge-danger mr-2">SQL</span>
                                </div>
                                <hr/>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-6">
                                            <Button outline color="success" className="w-100" onClick={this.slideAdUp}><i className="fas fa-thumbs-up"></i></Button>{' '}
                                        </div>
                                        <div className="col-6">
                                            <Button outline color="danger" className="w-100" onClick={this.slideAdDown}><i className="fas fa-thumbs-down"></i></Button>{' '}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                    </div>
              </div>
              <div id="2" className="col-md-6 col-12 job-ad-wrapper">
                    <div className="card job-ad text-body shadow rounded">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-9">
                                    <i className="fas fa-heading"></i> Software Developer
                                </div>
                                <div className="col-3">
                                    <i className="fas fa-heart wishlist-selector float-right"></i>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">
                                    <b><i className="fas fa-certificate"></i> Job type:</b> Full-time
                                </div>
                                <div className="col-12">
                                    <b><i className="fas fa-euro-sign"></i> Salary range:</b> 40000-50000
                                </div>
                                <div className="col-12">
                                    <b><i className="fas fa-building"></i> Company name:</b> SAP
                                </div>
                                <div className="col-12">
                                    <b><i className="fas fa-calendar-alt"></i> Expected start date:</b> 01.10.2019
                                </div>
                                <div className="col-12">
                                    <b><i className="fas fa-graduation-cap"></i> Education:</b> B. Sc. Computer Science and Engineering
                                </div>
                                <div className="col-12">
                                    <b className="mr-2"><i className="fas fa-check-double"></i> Needed skills:</b>
                                    <span className="badge badge-danger mr-2">Java</span>
                                    <span className="badge badge-danger mr-2">SQL</span>
                                </div>
                                <hr/>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-6">
                                            <Button outline color="success" className="w-100" onClick={this.slideAdUp}><i className="fas fa-thumbs-up"></i></Button>{' '}
                                        </div>
                                        <div className="col-6">
                                            <Button outline color="danger" className="w-100" onClick={this.slideAdDown}><i className="fas fa-thumbs-down"></i></Button>{' '}
                                        </div>
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
  return {
    auth: auth
  };
};

export default compose(
  EmailVerification,
  connect(mapStateToProps)
)(JobAds);
