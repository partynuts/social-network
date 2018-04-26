import React from "react";
import axios from "../axios";
import {Link} from 'react-router-dom';
import {Login} from './login.js';


export class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(e) {
    this[e.target.name] = e.target.value;
  }

  submit() {
    axios.post("/register", {
        first: this.first,
        last: this.last,
        email: this.email,
        pw: this.pw
      })

      .then(resp => {
        if (resp.data.success) {
          location.replace("/");
        } else {
          this.setState({
            error: true
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div className="formContainer">
        {this.state.error && <div className="errmsg">Something went wrong. Please try again</div>}
        <div className="form">
          <div className="inputs">
            <div>
              <input type="text" name="first" onChange={this.handleChange} />
              <label >First Name</label>
            </div>
            <div>
              <input type="text" name="last" onChange={this.handleChange} />
              <label >Last Name</label>
            </div>
            <div>
              <input type="email" name="email"  onChange={this.handleChange} />
              <label >E-Mail</label>
            </div>
            <div>
              <input name="pw"  type="password" onChange={this.handleChange} />
              <label >Password</label>
            </div>
              <button className="submitBtn" onClick={this.submit}>Register</button>
          </div>

        </div>
        <div className="redirect">
          <div>Already a member? Then log in<Link to="/login">  here</Link>!</div>
        </div>
      </div>
    )
  }
}
