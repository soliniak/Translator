import React, { Component } from "react";
import "./header.css";

class Header extends Component {
	render() {
		return (
			<header className="header">
				<p className="yandex-span">
					<span>
						Powered by Yandex.Translate <a href="https://translate.yandex.com/">https://translate.yandex.com</a>
					</span>
				</p>
				<h1 className="title-bar"> Translator </h1>

			</header>
		);
	}
}

export default Header;
