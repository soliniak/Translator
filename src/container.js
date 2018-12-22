import React, { Component } from "react";
import Translate from "./components/translate/translate";
import Header from "./components/header/header";
import ChooseLanguage, { keyFromLanguage } from "./components/languages/chooseLanguages";
import Welcome from "./components/welcome-screen/welcome"
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';


const wait = 340; // 0.34s
let delaySetState;

const MainContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;



class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
		text: "",
		textSize: "",
		translateFrom: "pl",
		translateTo: "en",
		flagIDFrom: "pl",
		flagIDTo: "en",

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
		}, wait)	
	};
  
	handleTranslateFrom = language => {
		// console.log("From: " + language, keyFromLanguage(language))
		this.setState({
			translateFrom: keyFromLanguage(language),
			flagIDFrom: keyFromLanguage(language)
		}) 
	}

	handleTranslateTo = language => {
		// console.log("To: " + language, keyFromLanguage(language))
		this.setState({
			translateTo: keyFromLanguage(language),
			flagIDTo: keyFromLanguage(language)
		})
	}
 
	handleButtonClick = (e) => {

		this.handleInput();
		const btn = e.target
		btn.classList.add("btn-clicked");
	
		setTimeout(() => {
			btn.classList.remove("btn-clicked");
		}, 400)
	}
	
	render() {
		const { text, textSize } = this.state;

		return (
		<MainContainer>
			<Welcome />
			<Header />
			<div className="container">
				<div className="input-output__container">
					<div className="input__container">
						<ChooseLanguage 
							language={this.handleTranslateFrom} 
							defaultLang="polish" />
						<textarea 
							ref={this.input} 
							className="input" 
							style={{"fontSize": this.state.textSize}}
							onChange={this.handleInput}
						>
							Przykładowy tekst.
						</textarea>
					</div>
					<div>
					<FontAwesomeIcon icon={faAngleDoubleRight} size="2x" className="middle"></FontAwesomeIcon>
					</div>
					<div className="output__container">
						<ChooseLanguage 
							language={this.handleTranslateTo} 
							defaultLang="english" 
						/>
						<Translate 
							toTranslate={text} 
							fontSize={textSize}
							translateFrom={this.state.translateFrom}
							translateTo={this.state.translateTo}
						/>
					</div>
				</div>
			<button className="btn" id="btn" onClick={this.handleButtonClick}>
				<FontAwesomeIcon style={{pointerEvents: "none"}} icon={faExchangeAlt} size="2x" />
			</button>
			</div>
		</MainContainer>
		);
	}
}

export default Container;
