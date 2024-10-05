import React from "react";
// import "./ExploreSection.scss";
import "../../pages/IndexPage/style.css"
import "../../pages/IndexPage/responsive.css"

const ExploreSection = (props) => {
	return (
		<section className="sandboxes-sec">
			<div className="container">
				<div className="caption-block">
					<p>Let your Team learn independently through our</p>
					<h2>Hands-on Labs,Labs Challenges,and Sandboxes</h2>
				</div>
				<figure className="sandboxes-right"><img className="img-full" src={process.env.REACT_APP_B2B_MEDIA_URL + "homepage/sandboxes-right.webp"} alt="" /></figure>
			</div>
		</section>
	);
};

export default ExploreSection;
