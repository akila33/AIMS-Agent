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

    renderServiceForm = () => {
      return (
        <div className="rightPanel">
    
        <form name="members" action="/members" method="post">
    
    <div className="title">
          <h5>ML Model Selecter</h5>
            
          </div>
          <div className='content'>
            <div className="row">
              <label className="col-sm-2 col-form-label">Task Name</label>
              <div className="col-sm-3 mb-2">
                <input type="text" name="taskName" className="form-control" placeholder="Task 1" />
              </div>
    
              <div className="col-sm-4">
              </div>
            </div>
    
            <div className="row">
              <label htmlFor="email" className="col-sm-2 col-form-label">Select a file: </label><br/><br/>
              <div className="col-sm-6 mb-2">
                <input type="file" id="path" name="path" className="form-control"></input>
              </div>
              <div className="col-sm-4">
              </div>
            </div><br/>
            <div className="row">
              <label htmlFor="telephone" className="col-sm-2 col-form-label">Desired Output</label>
              <div className="col-sm-6 mb-2">
                <input type="text" name="output" className="form-control" id="output" placeholder="['pipeline']" />
              </div>
              <div className="col-sm-4">
              </div>
            </div>
            <div className="row">
              <label htmlFor="staticEmail1" className="col-sm-2 col-form-label">Problem Domain</label>
              <div className="col-sm-6 mb-2">
                <input type="text" name="output" className="form-control" id="output" placeholder="medical" />
              </div>
              <div className="col-sm-4">
              </div>
            </div>
            <div className="row">
              <label htmlFor="staticEmail1" className="col-sm-2 col-form-label">AI Task Category</label><br/><br/>
              <div className="col-sm-6 mb-2">
                <select className="custom-select" name="category" id="inlineFormCustomSelect" >
                  <option value="US">MLmodel_classification</option>
                  <option value="IN">Image_classification</option>
                  <option value="US">ML_featuretest</option>
                  <option value="IN">ETL_transform</option>
                </select>
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
                <br/><br/><br/><br/>
                <Link to="/csvdatareder" className="btn btn-primary">Data Reader</Link>
                <span style={{ margin: '0 10px' }}></span>
                <Link to="/output" className="btn btn-primary">Classification Model</Link>
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
