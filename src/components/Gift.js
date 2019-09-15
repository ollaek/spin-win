import React from "react";
import {  getOfferImage } from "../Actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Gift extends React.Component {
    state = { img : "" , didmount: false };
    componentDidMount(){
        const { offerId } = this.props.match.params;
        this.props.getOfferImage(offerId);
    }
  
   renderImage(){
     if(!this.props.Configurations.Offer){
        return '';
      }
      return this.props.Configurations.Offer.Deals[0].Image;
   }

    render(){
        return(
            <div className="container">
   
                <div className="top-title">
                    <img className="img-fluid big-win" src="../../Content/img/spin-win.png" alt="" />
                </div>
                <div>
                    <div id="wrapper" style={{marginTop: "1rem",marginBottom: "118px"}}>

                        <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexFlow:"column"}}>
                            <div>
                                <img style={{width: "240px",marginTop:"15px"}} className="img-fluid big-win" src={this.renderImage()} alt="" />
                            </div>
                            <Link style={{padding:"0",border:"0",backgroundColor:"transparent",marginTop: "-55px",marginBottom: "-50px"}} to="/">
                                <img style={{width:"200px",cursor:"pointer"}} src="../../Content/img/retry.png" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return { Configurations : state.SpinAndWin };
}

export default connect(mapStateToProps, { getOfferImage })(Gift);