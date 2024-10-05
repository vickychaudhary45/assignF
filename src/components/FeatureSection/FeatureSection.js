import React from "react";
import { images } from "src/config/images";
import { Link } from "react-router-dom";
// import "./FeatureSection.scss";
import "../../pages/IndexPage/style.css"
import "../../pages/IndexPage/responsive.css"

const FeatureSection = () => {
	return (
		<section className="globel-employee">
			<div className="container">
				<h2><strong>10 Million+ Satisfied Learners</strong> across the globe</h2>
				<div className="block">
					<figure className="globel-map"><img className="img-full" src={process.env.REACT_APP_B2B_MEDIA_URL + "homepage/globel-map.webp"} alt="" /></figure>
					<div className="globel-right">
						<figure><a href="https://youtu.be/epHXT9wFopE"><img className="img-full" src={process.env.REACT_APP_B2B_MEDIA_URL + "homepage/globel-right-img.webp"} alt="" /></a>
						</figure>
						<figure className="play-icon">
							<a href="https://youtu.be/epHXT9wFopE"><img className="img-full" src={images.playborder} alt="" /></a>
						</figure>
					</div>
				</div>
				<div className="newHires-block">
					<div className="caption">Upskill your <strong>New Hires at ease</strong></div>
					<Link to="/request-demo-page?utm_source=trial" className="btn btn-touch">Get a 14 day free trial</Link>
				</div>
			</div>
		</section>
	);
};

export default FeatureSection;
