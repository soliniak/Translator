import React, { Component } from "react";
import { languages } from "./supportedLanguages.js"
import ShowFlag from "./../flags/showFlag";

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
            language: "polish",
            langKey: "pl"
        };

    }

    componentDidMount(){
        this.setState({
            language: this.props.defaultLang,
            langKey: keyFromLanguage(this.props.defaultLang)      
        })
    }


    // componentDidUpdate(prevState, prevProps) {
    //     console.log("PrevProps: ", prevProps, " \n ActualState: language: ", this.state.language, "langKey: ", this.state.langKey)

    // }

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

        rows.sort((a, b)=>{
            if(a.props.value < b.props.value) {
                return -1;
            }
            if(a.props.value > b.props.value) {
                return 1;
            }
            return 0;
         })
        

        return (
            <div className="first-language">
                <ShowFlag flagID={this.state.langKey}/>
                <select value={this.state.language} className="active-language" onChange={this.handleLangChange}>
                    {rows}
                </select>
            </div>
        )
    }
}




export default ChooseLanguage;