import React from "react";

const Error = () => {
    return(
        
        <div className="container">
            
            <div className="top-title">
                <img className="img-fluid big-win" src="./Content/img/spin-win.png" alt="" />
            </div>
            <div>
                <div id="wrapper" style={{marginTop: "1rem", marginBottom: "118px"}}>

                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexFlow: "column", padding: "10rem 0"}}>
                        <a style={{padding: "0", border: "0", backgroundColor: "transparent"}} href="/">
                            <img style={{width: "200px", cursor: "pointer"}} src="./Content/img/no-interent.png" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;