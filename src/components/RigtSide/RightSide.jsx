import React from "react";
import CustomerReview from "../CustomerReview/CustomerReview";
import Updates from "../Updates/Updates";
import "./RightSide.css";

const RightSide = () => {
  return (

    <div className="RightSide" style={{marginLeft: "-170px"}}>
      <div>
        <h3>Admins</h3>
        <Updates />
      </div>
      
    </div>
  );
};

export default RightSide;
