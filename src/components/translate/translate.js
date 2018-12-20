import React, { Component } from "react";
import Spinner from "../spinner/spinner";

const errorsList = [
	["200", "Operation completed successfully"],
	["400", "Bad request"],
	["401", "Invalid API key"],
	["402", "Blocked API key"],
	["404", "Exceeded the daily limit on the amount of translated text"],
	["413", "Exceeded the maximum text size"],
	["422", "The text cannot be translated"],
	["501", "The specified translation direction is not supported"]
];
const errors = new Map(errorsList);
const api_key = "trnsl.1.1.20181123T092134Z.1958dff3c4d99a2f.7d766cc459780e04775317ff9d84a4d0a5c4d38d";

let request, requestUrl;

class Translate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			translate: "",
			error: "",
			loaderDisplay: false
		};
	}

	handleLoader = status => {
		status === "hide" ? status = false : status = true;
		this.setState({
			loaderDisplay: status
		});
	}

	validateData = (toTranslate, translateLangDirection) => {
		if (api_key && translateLangDirection && toTranslate.trim() !== "") {
			return toTranslate;
		}
		return console.error("Invalid data. Check your API_KEY, translate direction for supported languages or text to translate (cannot be empty).");
	};

	makeRequestURL = (toTranslate, translateFrom, translateTo) => {
		this.handleLoader("show");
		let translateLangDirection = translateFrom +"-"+ translateTo;

		let validateData = this.validateData(toTranslate, translateLangDirection);
		return `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${api_key}&text=${validateData}&lang=${translateLangDirection}`;
	};

	makeRequest = (toTranslate, translateFrom, translateTo) => {
		requestUrl = this.makeRequestURL(toTranslate, translateFrom, translateTo);
		return (request = new Request(requestUrl, {
			Accept: "*/*",
			method: "POST",
			headers: {
			"Content-Type": "application/x-www-form-urlencoded"
			},
			host: "translate.yandex.net"
		}));
	};

	translate = (toTranslate, translateFrom, translateTo) => {
	request = this.makeRequest(toTranslate, translateFrom, translateTo);

	fetch(request)
		.then(response => {
		if (response.status === 200) {
			return response.json();
		} else {
			throw new Error(
				`Something went wrong on API server! Error code: ${
				response.status
				} - ${errors.get(response.status.toString())}`
			);
		}
		})
		.then(response => {
			this.setState({
				translate: response.text,
			});
			this.handleLoader("hide");
		})
		.catch(error => console.error("Error:", error));
	};

	componentDidUpdate(props) {
		const { toTranslate, translateFrom, translateTo } = this.props;
		console.log("UPDATE: ", translateFrom, translateTo)
		if (toTranslate !== props.toTranslate || translateFrom !== props.translateFrom || translateTo !== props.translateTo) {
			this.translate(toTranslate, translateFrom, translateTo);
		}
	}

	render() {
		return (
			<div className="output" style={{"fontSize": this.props.fontSize}} contentEditable>

			{(this.state.loaderDisplay && <Spinner />) || (
				this.state.translate
			)}
			</div>
		);
	}
}

export default Translate;