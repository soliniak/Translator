import React, { Component } from "react";
import Translate from "./components/translate/translate";
import Header from "./components/header/header"
import styled from 'styled-components'
import FontAwesome from 'react-fontawesome';


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
      textSize: ""
    };
    this.input = React.createRef();

  }
  
  handleInput = () => {
    if (this.state.text !== this.input.current.value) {
      this.setState({
        text: this.input.current.value
      });

    }
    if(this.input.current.value.length > 28){
      this.setState({
        textSize: "1.5rem"
      })
    } else {
      this.setState({
        textSize: "2rem"
      }) 
    }
  };

  render() {
    const { text, textSize } = this.state;

    return (
      <MainContainer>
        <Header />
        <div className="container">



          <div className="input-output__container">
            <textarea 
            ref={this.input} 
            className="input" 
            style={{"font-size": this.state.textSize}}
            onChange={this.handleInput}
            >

              Przykładowy tekst.


            </textarea>
            <div> <FontAwesome name="angle-double-right" size="2x"></FontAwesome> </div>
            <Translate 
              toTranslate={text} 
              fontSize={textSize}
            />
          </div>
          <span className="yandex-span">
          Powered by Yandex.Translate - <a href="https://translate.yandex.com/">https://translate.yandex.com</a>
          </span>
          <button className="btn border-btn" onClick={this.handleInput}>
            Translate
          </button>

        </div>
      </MainContainer>
    );
  }
}

export default Container;
