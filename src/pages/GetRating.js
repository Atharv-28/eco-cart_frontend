import React from "react";

function GetRating(){
    return(
        <div className="get-rating">
            <h1>Give product a link</h1>
            <input type="text" placeholder="Enter product link" className="product-link-input"/>
            <button className="get-rating-button">Get Rating</button>
            {/* <div className="rating-result">
                <h2>Product Rating</h2>
                <p>Rating: 4.5/5</p>
                <p>Review: This product is eco-friendly and highly recommended!</p>
            </div>  */}
        </div>
    )
}

export default GetRating;