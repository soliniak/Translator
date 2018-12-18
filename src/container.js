import React, { Component } from "react";
import Translate from "./components/translate/translate";
import Header from "./components/header/header"
import ChooseLanguage from "./components/languages/chooseLanguages"
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'

const timeoutWait = 340; // 0.34s
let delaySetState;

const MainContainer = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`;



class Container extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      textSize: "",
      translateFrom: "polish",
      translateTo: "english"
    };
    this.input = React.createRef();

  }
  
  handleInput = () => {

    clearTimeout(delaySetState);
    
    delaySetState = setTimeout(()=>{
      if (this.state.text !== this.input.current.value) {
        this.setState({
          text: this.input.current.value
        });
      }
    }, timeoutWait)

  };


  handleFrom = (language) => {
    console.log("From: " + language)
    return language
  }

  handleTo = (language) => {
    console.log("To: " + language)
    return language
  }

  render() {
    const { text, textSize } = this.state;

    return (
      <MainContainer>
        <Header />
        <div className="container">

          <div className="input-output__container">
          <div className="input__container">
          <ChooseLanguage language={this.handleFrom} defaultLang="polish" />

            <textarea 
            ref={this.input} 
            className="input" 
            style={{"fontSize": this.state.textSize}}
            onChange={this.handleInput}
            >

              Przykładowy tekst.


            </textarea>
            </div>
            {/* <div> <FontAwesome name="angle-double-right" size="2x"></FontAwesome> </div> */}
            <div className="output__container">
            <ChooseLanguage language={this.handleTo} defaultLang="english" />
            <Translate 
              toTranslate={text} 
              fontSize={textSize}
              translateFrom={this.state.translateFrom}
              translateTo={this.state.translateTo}
            />
            </div>
          </div>
          <p className="yandex-span">
          <span>
          Powered by Yandex.Translate <a href="https://translate.yandex.com/">https://translate.yandex.com</a>
          </span>
          </p>
          <button className="btn border-btn" onClick={this.handleInput}>
          <FontAwesomeIcon icon={faExchangeAlt} size="2x" />
          </button>

        </div>
      </MainContainer>
    );
  }
}

export default Container;
