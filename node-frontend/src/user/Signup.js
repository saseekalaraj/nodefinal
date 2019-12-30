import React, { Component } from "react";
import { signup } from "../auth/index";

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
      passwordStatus: true,
      sccess: ""
    };
  }
  handleChange = e => {
    this.setState({ error: "", passwordStatus: true });
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleConfrimPassword = () => {
    if (
      this.state.password === this.state.confirmPassword &&
      this.state.confirmPassword !== ""
    ) {
      this.setState({
        passwordStatus: true
      });
      return true;
    } else {
      this.setState({
        passwordStatus: false
      });
      return false;
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password
    };
    if (this.handleConfrimPassword()) {
      signup(user).then(data => {
        if (data.error) {
          this.setState({
            error: data.error
          });
        } else {
          this.setState({
            error: "",
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            sccess: data.message
          });
        }
      });
    }
  };
  render() {
    const message = (
      <div
        style={{ display: `${!this.state.passwordStatus ? "block" : "none"}` }}
        className="alert alert-danger"
        role="alert"
      >
        Password does not match !! Please check ....
      </div>
    );
    return (
      <div className="container">
        <h1 className="mt-5 mb-5">Signup</h1>
        <div
          className="alert alert-danger"
          style={{ display: `${this.state.error ? "block" : "none"}` }}
        >
          {this.state.error}
        </div>
        <div
          className="alert alert-info"
          style={{ display: `${this.state.sccess ? "block" : "none"}` }}
        >
          {this.state.sccess}
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
              required
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
              required
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              required
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Confrim Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              onChange={this.handleChange}
              value={this.state.confirmPassword}
            />
          </div>
          {message}
          <button type="submit" className="btn btn-raised btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
