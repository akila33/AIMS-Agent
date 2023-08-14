import React, { Component, lazy, Suspense } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';
import GetRestObject from '../../api/ConnectServerGet';
import PostRestObject from '../../api/ConnectServerPost';
import { Link } from "react-router-dom";

class Starter extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
      };
    }
  
    HelloGetRequestedDetails = () => {
      GetRestObject.GetRestRequest(`/v1/hello`, getResultObj => {
        console.log(getResultObj);
      });
    }

    ByeGetRequestedDetails = () => {
      GetRestObject.GetRestRequest(`/v1/bye`, getResultObj => {
        console.log(getResultObj);
      });
    }

    PostRequestedDetails = () => {
      var postData = {
        RequestType: 'api',
        RequestJson: {'param':'YouTube'}
      }    
      PostRestObject.PostRestRequest(`/v1/bye`, postData, postResultObj => {
        console.log(postResultObj);
      });
    }

    componentDidMount(){
      this.HelloGetRequestedDetails()
      this.ByeGetRequestedDetails()
      this.PostRequestedDetails()
    }

    handleLinkClick = () => {
      alert('Service registered Successfully!');
    };

    renderServiceForm = () => {
      return (
        <div className="rightPanel">
    
        <form name="services" action="/services" method="post">
    
    <div className="title">
          <h5>AI Service Registration</h5>
            
          </div>
          <div className='content'>
          <div className="row">
              <label className="col-sm-2 col-form-label">Namespace</label>
              <div className="col-sm-6 mb-2">
                <input type="text" name="taskName" className="form-control" placeholder="http://aimicroservice.derby.ac.uk" />
              </div>
    
              <div className="col-sm-4">
              </div>
            </div>
            <div className="row">
              <label className="col-sm-2 col-form-label">Service name</label>
              <div className="col-sm-6 mb-2">
                <input type="text" name="taskName" className="form-control" placeholder="csvjsonmodel" />
              </div>
    
              <div className="col-sm-4">
              </div>
            </div>
            <div className="row">
              <label className="col-sm-2 col-form-label">Description</label>
              <div className="col-sm-6 mb-2">
                <input type="text" name="taskName" className="form-control" placeholder="Service to parse CSV data as json objects to the React frontend" />
              </div>
    
              <div className="col-sm-4">
              </div>
            </div>
    
            <div className="row">
              <label htmlFor="telephone" className="col-sm-2 col-form-label">Requirements</label>
              <div className="col-sm-6 mb-2">
                <input type="text" name="output" className="form-control" id="output" placeholder="flask_restful" />
              </div>
              <div className="col-sm-4">
              </div>
            </div>
            <div className="row">
              <label htmlFor="staticEmail1" className="col-sm-2 col-form-label">Input Spec</label>
              <div className="col-sm-6 mb-2">
                <input type="text" name="output" className="form-control" id="output" placeholder="datafile.pandas" />
              </div>
              <div className="col-sm-4">
              </div>
            </div>
            <div className="row">
              <label htmlFor="staticEmail1" className="col-sm-2 col-form-label">Output Spec</label>
              <div className="col-sm-6 mb-2">
                <input type="text" name="output" className="form-control" id="output" placeholder="model.csv_json_datahandler" />
              </div>
              <div className="col-sm-4">
              </div>
            </div>
            <div className="row">
            <label htmlFor="staticEmail1" className="col-sm-2 col-form-label">Service Category</label>
              <div className="col-sm-6 mb-2">
                <input type="text" name="output" className="form-control" id="output" placeholder="data_engineering" />
              </div>
              <div className="col-sm-4">
              </div>
            </div>
    
            <div className="row">
              <div className="col-sm-5 mb-2">
              </div>
              <div className="col-sm-4">
                {/* <button type="button" className="registerbtn" 
            onClick={() => {
              // setGoToContact(true);
            }}
                >
                  {" "}
                  Register
                </button> */}
                <br/>
      
                <span style={{ margin: '0 10px' }}></span>
                <a href="/output" className="btn btn-primary" onClick={this.handleLinkClick}>
                  Register Service
                </a>
              </div>
              <div className="col-sm-3"></div>
            </div>
          </div> 
        </form>
         
    
        </div>    
    
      );      
    }

    loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  
    render() {
  
      return (
        <div className="animated fadeIn">
          <Row>
            <Col md={12}>
              <h3>Starter</h3>
              <hr/>
              {this.renderServiceForm()}
            </Col>
          </Row>
        </div>
    );
  }
}

export default Starter;
