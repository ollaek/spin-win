import React from "react";
import { connect } from "react-redux";
import { getConfigurations } from "../Actions";
import history from "../history";

class Number extends React.Component{
    state = { msisdn :"" , valid : null, groupName : "test", ErrorMsg : ""}
    componentDidMount(){
        this.props.getConfigurations(this.state.groupName);
    };

    componentDidUpdate(){
        if(this.state.valid === true){
            history.push(`/Wheel/${this.state.msisdn}/${this.state.groupName}`);
        }
    }
    
    onDigitClick = (digit) => {
        if(this.state.msisdn.length === 11){
            return;
        }

        const msisdn = `${this.state.msisdn}${digit}`;
        this.setState({ msisdn : msisdn });
    };

    onDigitRemove = () => {
        const msisdn = this.state.msisdn;
        this.setState({msisdn : msisdn.substring(0,msisdn.length -1)});
    }

    validateMobileNumber = () => {
        const phoneno = new RegExp(/^(?=\d{11}$)(01)\d+$/);
        if ((phoneno.test(this.state.msisdn))) {
            this.setState({valid : true, ErrorMsg : ""});
        }else{
            this.setState({ valid : false, ErrorMsg : "Wrong mobile number, please enter the right number"});
        }
    };

    render(){
        if(!this.props.getConfigurations){
            return <div>loading ...</div>;
        }

        return(
            <div className="container" >
                <div className="top-title">
                    <img className="img-fluid big-win" src="../Content/img/spin-win.png" alt="" />
                </div>
                <div>
                    <div id="wrapper">
                        <div className="dial-pad">
                        
                         
                                <div>
                                    <div className="shadow" id="output">{this.state.msisdn}</div>
                                   
                                    <p className="wrong-msg" id="errormsg" >{this.state.ErrorMsg}</p>

                              

                                    <div className="digits">
                                        <div className="row">
                                            <div className="digit" onClick={() => this.onDigitClick(1)}>1</div>
                                            <div className="digit" onClick={() => this.onDigitClick(2)}>2</div>
                                            <div className="digit" onClick={() => this.onDigitClick(3)}>3</div>
                                        </div>
                                        <div className="row">
                                            <div className="digit" onClick={() => this.onDigitClick(4)}>4</div>
                                            <div className="digit" onClick={() => this.onDigitClick(5)}>5</div>
                                            <div className="digit" onClick={() => this.onDigitClick(6)}>6</div>
                                        </div>
                                        <div className="row">
                                            <div className="digit" onClick={() => this.onDigitClick(7)}>7</div>
                                            <div className="digit" onClick={() => this.onDigitClick(8)}>8</div>
                                            <div className="digit" onClick={() => this.onDigitClick(9)}>9</div>
                                        </div>
                                        <div className="row">
                                            <div className="botrow" onClick={() => this.onDigitRemove()}> 
                                                <i className="fa fa-angle-left dig" aria-hidden="true"><span style={{fontSize: "22px",fontFamily: "monospace"}}>x</span></i>
                                            </div>
                                            <div className="digit" onClick={() => this.onDigitClick(0)}>0</div>
                                            <button  className="botrow submit" onClick={this.validateMobileNumber} >
                                                <i className="fa fa-angle-right dig" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { configuration : state.SpinAndWin };
}

export default connect(mapStateToProps, { getConfigurations }) (Number);