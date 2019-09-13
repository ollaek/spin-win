import React from "react";
import ReactDOM from "react-dom";

const loader = () => {
    return ReactDOM.createPortal(
        <div className="preloader-wrap">
            <div className="percentage" id="precent"> <span>Loading</span> </div>
            <div className="loader">
                <div className="trackbar">
                    <div className="loadbar"></div>
                </div>
                <div className="glow"></div>
                <p style={{color: "#fff", textAlign: "center",marginTop: "7px", fontSize: "21px",position: "relative", zIndex: "999999999", fontFamily: "sans-serif"}}>
                    Please wait
                </p>
            </div>

        </div>,
        document.querySelector("#loader")
    );
};

export default loader;