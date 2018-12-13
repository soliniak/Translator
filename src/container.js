import React, { Component } from "react";
import Translate, { TranslateRegex } from "./components/translate/translate";
import Header from "./components/header/header"

class Container extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      regexValue: "",
      regexValueFinal: "",
      regexText: "",
      regexCheckbox: false,
      regexCheckboxInit: true // true = disabled
    };
    this.input = React.createRef();
    this.regexOutput = React.createRef();
    this.regexValue = React.createRef();

  }

  handleInput = () => {
    if (this.state.text !== this.input.current.innerText || this.state.regexValue !== this.regexValue.current.value) {
      this.setState({
        text: this.input.current.innerText,
        regexValueFinal: this.regexValue.current.value
      });
    }
  };

  handleRegexValueChange = () => {
    this.setState({
      regexValue: TranslateRegex(this.regexValue.current.value, this.input.current.innerText),
    })
    if(!this.regexValue.current.value) {
      this.setState({
        regexCheckboxInit: true
      })
    } else {
      this.setState({
        regexCheckboxInit: false
      })    
    }
  }
  handleRegexCheckbox = () => {
    this.setState(prevState => ({
      regexCheckbox: !prevState.regexCheckbox
    }))
  }


  
  render() {
    const { regexValue, regexValueFinal, text, regexCheckbox, regexCheckboxInit } = this.state;

    return (
      <div>
        <Header />
        <div className="container">
          <label for="regexCheckbox"> 
            Mix words with original text 
            <input 
              id="regexCheckbox" 
              type="checkbox" 
              className='regexCheckbox' 
              disabled={regexCheckboxInit}  
              ref={this.regexCheckbox} 
              onChange={this.handleRegexCheckbox} 
            />
          </label>

          <input 
            className="regexValue" 
            ref={this.regexValue} 
            onChange={this.handleRegexValueChange} 
          />
          <div className="input-output__container">
            <div 
            ref={this.input} 
            className="input" 
            contentEditable>

              KIEDY wyjdziesz w noc pogodną,
              policz ile gwiazd na niebie,
              Niech te GWIAZDY Ci przypomną,
              Jak ja MOCNO kocham Ciebie KIEDY.
              {/* Pick all uppercase words \b[A-Z]{2,}\b  */}

            </div>
            <div> => </div>
            <Translate 
              toTranslate={text} 
              regexValue={regexValueFinal}
              mixWithText={regexCheckbox} 
            />
          </div>
          <button className="btn border-btn" onClick={this.handleInput}>
            Translate
          </button>
          <div className="regexOutput" ref="regexOutput">
            {regexValue}
          </div>
        </div>
      </div>
    );
  }
}

export default Container;
