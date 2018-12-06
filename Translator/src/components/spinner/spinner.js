import React, { Component } from "react";
import "./spinner.css";

class Spinner extends Component {
  render() {
    return (
      <div
        className="lds-spinner"
        style={{ display: this.props.displaySpinner }}
      >
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    );
  }
}
export default Spinner;
