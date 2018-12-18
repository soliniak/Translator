import React, { Component } from "react";
import { languages } from "./supportedLanguages.js"


class InitLangs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: this.props.defaultLang
        };
    }



    componentDidUpdate() {
        console.log(this.state.language)
    }

    
    handleLangChange = (e) => {
        this.setState({
            language: e.target.value
        })        
        this.props.language(e.target.value);          
    }

    render() {
        return (
            <select value={this.state.language} className="select-test" onChange={this.handleLangChange}>
                {Object.keys(languages).map((value, key) => (
                    <option key={key} value={value}>
                        {value}
                    </option>
                ))}
            </select>
        )
    }
}

class ChooseLanguage extends Component {
    render() {
        return (
            <div className="first-language">                
                    <InitLangs language={this.props.language} defaultLang={this.props.defaultLang} />
            </div>
        )
    }


}


export default ChooseLanguage;