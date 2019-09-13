import React from "react";
import { connect } from "react-redux";
import { getConfigurations, getSelectedOffer, subscribeToOffer } from "../Actions";
import history from "../history";


class Wheel extends React.Component{

    constructor(props) {
        super(props);
        this.state = { clicksCounter : 0 , c : 0, done : 0, offerId : null, didSubscribe : false, configs : {} , offer : {} , subscribe : {}};
        this.mainwheelRef = React.createRef();
        this.wheelRef = React.createRef();
        this.spinRef = React.createRef();
      };

    componentDidMount(){
        const { msisdn , groupName } = this.props.match.params;
        this.props.getConfigurations(groupName);
        this.props.getSelectedOffer(msisdn, groupName);
        this.setState({ configs : this.props.Configurations.Configurations, offer : this.props.Configurations.selectedOffer });
    };

    spinTheWheel = () => {
        debugger;
        const degree = 3600;
        if (!this.props.Configurations) return;
        if (this.state.clicksCounter === 1) return;

        this.setState({clicksCounter : 1});
        const offerNumber = this.props.Configurations.selectedOffer.OfferNumber;
        const rand = ( 360 / this.props.Configurations.selectedOffer.TotalOffersNumber) * ( this.props.Configurations.selectedOffer.OfferOrder - 1 );
        const giftcss = this.props.Configurations.configurations.BachgroundImagePath;
        const offerId = this.props.Configurations.selectedOffer.offerId;
        const totalDegree = degree + rand;
        
        this.setState({ done : 0 });
        const wheelParent = this.wheelRef;
        const sec = wheelParent.current.children ? wheelParent.current.children : [] ;
       
        [...sec].map((element) => {
            const t = element;
            this.setState({ c : 0 });
            const n = 700;
            const spin = this.spinRef ;
            console.log("spin :" + spin.current);
            const interval = setInterval(() => {
              
                if(this.state.done === 0){
                    this.setState({ c : this.state.c + 1 });
                    console.log(this.state.c);
                }
                
                if (this.state.c === n) {
                    clearInterval(interval);

                    const mainwheel = this.mainwheelRef;
                    const timeout = () => {setTimeout(
                        () => mainwheel.current.backgroundImage  = giftcss,
                        500
                      );
                    };
                    
                        if (this.state.done === 0) {
                            this.setState({ done : 1 });
                            this.subscripeToOffer(offerNumber,offerId);
                            debugger;
                        }
                    };
               
            }, 10);
            
            spin.current.style.transform = `rotate(${totalDegree}deg)`;
            const noY = t.offsetTop;

        });

        
    };

    subscripeToOffer = (offerNumber,offerId) => {
        debugger;
        const { msisdn } = this.props.match.params;
        this.props.subscribeToOffer(msisdn, offerNumber,offerId);
        this.setState({ didSubscribe : true });
        console.log(this.state);
    };

    render(){
        console.log(this.state);
        console.log(this.props);
        
     
        return(
            <div className="container">
                
                <div className="top-title">
                    <img className="img-fluid big-win" src="../../Content/img/spin-win.png" alt=""/>
                </div>
                <div>
                    <div id="wrapper" style={{marginBottom: "118px"}}>

                        <div id="wheel" ref={this.mainwheelRef}>
                            <div id="inner-wheel" ref={this.wheelRef}>
                                <div className="sec">
                                </div>
                                <div className="sec">
                                </div>
                                <div className="sec">
                                </div>
                                <div className="sec">
                                </div>
                                <div className="sec">
                                </div>
                                <div className="sec">
                                </div>
                            </div>
                            <div className="spin-click" id="spin" onClick={this.spinTheWheel} ref={this.spinRef}>
                                <div id="inner-spin">
                                    <img className="img-fluid" src="../../Content/img/spinner.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="spinner-btn spin-click" onClick={this.spinTheWheel} >
                            <img className="img-fluid" src="../../Content/img/spinner-btn.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return { Configurations : state.SpinAndWin }
}

export default connect(mapStateToProps, {getConfigurations, getSelectedOffer, subscribeToOffer})(Wheel);