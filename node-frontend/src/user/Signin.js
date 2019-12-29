import React, { Component } from "react";
import { BaseUrl } from "../api/docs";
import { Redirect } from "react-router-dom";

export default class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReferer: false,
      loading: false,
      loadingData: 20
    };
  }
  handleChange = e => {
    this.setState({ error: "" });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    setTimeout(this.setState({ loadingData: this.state.loadingData + 40 }), 0);
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    this.signin(user).then(data => {
      if (data.error) {
        this.setState({
          error: data.error,
          loading: false,
          loadingData: 20
        });
      } else {
        this.authenticate(data, () => {
          this.setState({ redirectToReferer: true });
        });
      }
    });
  };
  signin = user => {
    return fetch(`${BaseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  authenticate = (jwt, next) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(jwt));
      next();
    }
  };
  render() {
    if (this.state.redirectToReferer) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <h1 className="mt-5 mb-5">Signup</h1>
        <div
          className="alert alert-danger"
          style={{ display: `${this.state.error ? "block" : "none"}` }}
        >
          {this.state.error}
        </div>
        {this.state.loading
          ? <div className="jumbotron text-center">
              <div class="progress">
                <div
                  class="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: `${this.state.loadingData}%` }}
                />
              </div>
            </div>
          : ""}

        <form onSubmit={this.handleSubmit}>
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

          <button type="submit" className="btn btn-raised btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
