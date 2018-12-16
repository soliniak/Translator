import React, { Component } from "react";

class ShowTranslatedText extends Component {
  render() {
    return (
      <div
        className="translated-text"
        style={{ display: this.props.displayText }}
        contentEditable
      >
        {this.props.translatedText}
      </div>
    );
  }
}
export default ShowTranslatedText;
