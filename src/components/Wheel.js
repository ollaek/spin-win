import React from "react";
import { connect } from "react-redux";
import { getConfigurations, getSelectedOffer, subscribeToOffer } from "../Actions";
import history from "../history";


class Wheel extends React.Component{

    constructor(props) {
        super(props);
        this.state = { clicksCounter : 0 , c : 0, done : 0, offerId : null, didSubscribe : false};
        this.mainwheelRef = React.createRef();
        this.wheelRef = React.createRef();
        this.spinRef = React.createRef();
      };


    componentDidMount(){
        const { msisdn , groupName } = this.props.match.params;
        this.props.getConfigurations(groupName);
        this.props.getSelectedOffer(msisdn, groupName);

       

        console.log(this.state);
        console.log(this.props);
        console.log(this.wheelRef);
    };

    spinTheWheel = () => {
        const degree = 3600;
        if (this.state.clicksCounter === 1) return;

        this.setState({clicksCounter : 1});
        const offerNumber = this.props.Configurations.selectedOffer.OfferNumber;
        const OfferId = this.props.Configurations.selectedOffer.OfferId;
        const rand = ( 360 / this.props.Configurations.selectedOffer.TotalOffersNumber) * ( this.props.Configurations.selectedOffer.OfferOrder - 1 );
        const giftcss = this.props.Configurations.configurations.BachgroundImagePath;
        
        const totalDegree = degree + rand;
        
        this.setState({ done : 0 });
        const wheelParent = this.wheelRef;
        const sec = wheelParent.current.children ? wheelParent.current.children : [] ;
       
        [...sec].map((element) => {
            const t = element;
            this.setState({ c : 0 });
            const n = 700;
            const spin = this.spinRef;
            const interval = setInterval(() => {
                if(this.state.done === 0){
                    const newC = this.state.c;
                    this.setState({ c : newC + 1 });
                }
                
                if (this.state.c === n) {
                    clearInterval(interval);

                    const mainwheel = this.mainwheelRef;
                    mainwheel.current.backgroundImage =  giftcss;

                    setTimeout(() => {
                        if (this.state.done === 0) {
                            this.setState({ done : 1 });
                            this.subscripeToOffer(offerNumber,OfferId);
                           
                        }
                    }, 1000);


                }
                const aoY = t.offsetTop;
                if (aoY < 23.89) {
                    spin.current.className = "spin";
                    setTimeout(() => {
                        spin.current.className = "spin";
                    }, 100);
                }
            }, 10);
            
            spin.current.style.transform = `rotate(${totalDegree}deg)`;
            const noY = t.offsetTop;

        });

        
    };

    subscripeToOffer = (offerNumber,OfferId) => {
        const { msisdn } = this.props.match.params;
        this.props.subscribeToOffer(msisdn, offerNumber, OfferId);
        this.setState({ didSubscribe : true });
        
    };

    render(){
        console.log(this.state);
        console.log(this.props);
        if(this.state.didSubscribe){
            debugger;
            if(this.props.configurations.subscripeStatus.ErrorCode === 0){
                history.push(`/Gift/${this.state.offerId}`);
            }else{
                history.push("/ErrorPage");
            }
        }
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