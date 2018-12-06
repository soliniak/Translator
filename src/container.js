import React, { Component } from "react";
import Translate, { TranslateRegex } from "./components/translate/translate";
import Header from "./components/header/header"

class Container extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      regexShow: "",
      regexText: ""
    };
    this.input = React.createRef();
    this.regexOutput = React.createRef();
    this.regexInput = React.createRef();

  }

  handleInput = () => {
    if (this.state.text !== this.input.current.innerText) {
      this.setState({
        text: this.input.current.innerText,
        regexText: TranslateRegex(this.regexInput.current.value, this.input.current.innerText)
      });
    }
  };

  handleRegexChange = e => {
    this.setState({
      regexShow: e.target.value,
    })
  }

  render() {
    const { regexShow, regexText, text } = this.state;

    return (
      <div>
        <Header />
        <div className="container">
          <input className="regexInput" ref={this.regexInput} onChange={this.handleRegexChange} />
          <div className="input-output__container">
            <div ref={this.input} className="input" contentEditable>
              Kiedy wyjdziesz w noc pogodną,
              policz ile gwiazd na niebie,
              Niech te gwiazdy Ci przypomną,
              Jak ja mocno kocham Ciebie.
            </div>
            <div> => </div>
            <Translate toTranslate={text} toRegex={regexText} />
          </div>
          <button className="btn border-btn" onClick={this.handleInput}>
            Translate
          </button>
          <div className="regexOutput" ref="regexOutput">
            {regexShow}
          </div>
        </div>
      </div>
    );
  }
}



export default Container;
