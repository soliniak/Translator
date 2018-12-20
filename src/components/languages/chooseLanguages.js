import React, { Component } from "react";
import { languages } from "./supportedLanguages.js"

export const keyFromLanguage = language => {
    for (let [value, key] of Object.entries(languages)) {
        if(value === language) {             
            return key;
        }
    }
}

class ChooseLanguage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: "",
            langKey: ""
        };

    }

    componentDidMount(){
        this.setState({
            language: this.props.defaultLang,
            langKey: keyFromLanguage(this.props.defaultLang)      
        })
    }


    componentDidUpdate(prevState, prevProps) {
        console.log("PrevProps: ", prevProps, " \n ActualState: language: ", this.state.language, "langKey: ", this.state.langKey)

    }

    handleLangChange = (e) => {
        this.setState({
            language: e.target.value,
            langKey: keyFromLanguage(e.target.value)
        })
        this.props.language(e.target.value);

    }
    
    render() {
        let rows = [];

        for (let [value, key] of Object.entries(languages)) {
            rows.push(<option key={key} value={value}> { value } </option>)
        }

        return (
            <div className="first-language">                
                <select value={this.state.language} className="select-test" onChange={this.handleLangChange}>
                    {rows}
                </select>
            </div>
        )
    }
}




export default ChooseLanguage;