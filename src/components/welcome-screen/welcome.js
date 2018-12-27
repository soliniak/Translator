import React, { Component } from 'react';
import "./welcome.sass"
import dudeImg from "./img/gfx-loader-man.png"
import ladyImg from "./img/gfx-loader-woman.png"


class Welcome extends Component {
      render() {
            return (
                  <div className="welcome__screen">
                        <div className="dude">
                              <img src={dudeImg} alt="Dude img" />
                        </div>
                        <div className="lady">
                              <img src={ladyImg} alt="Lady img" />
                        </div>
                  </div>
            );
      }
}

export default Welcome;