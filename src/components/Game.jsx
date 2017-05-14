import React from "react";

class Game extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="mainboard">
                <div className="outc1 cells">
                    <div id="c1" className=""></div>
                </div>
                <div className="outc2 cells">
                    <div id="c2" className=""></div>
                </div>
                <div className="outc3 cells">
                    <div id="c3" className=""></div>
                </div>
                <div className="outc4 cells">
                    <div id="c4" className=""></div>
                </div>
                <div id="setup">
                    <div>
                        <div id="title">Simon<span className="sign">&#174;</span></div>
                        <div className="half marl">
                            <div id="counter">--</div>
                            <div className="martb">count</div>
                            <div id="startgame" className="but"></div>
                            <div className="martb">start</div>
                        </div>
                        <div className="half">
                            <div id="period">--</div>
                            <div className="martb">time</div>
                            <div id="strictmode" className="but"></div>
                            <div className="martb">strict</div>
                        </div>
                    </div>
                    <div className="onoff">
                        <div className="but">
                            <div className="inbut"></div>
                        </div>
                        <div>on / off</div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = Game;

/*<div className="onoff">
    <span className="onoff">on</span>
    <div className="but">
        <div className="inbut">!</div>
    </div> off
</div>*/
//<div id="setup"></div>
