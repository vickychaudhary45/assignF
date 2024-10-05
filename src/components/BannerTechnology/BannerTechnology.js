import React from "react";
import { images } from "src/config/images";
import { Link } from "react-router-dom";
// import "./BannerTechnology.scss";
import "../../pages/IndexPage/style.css"
import "../../pages/IndexPage/responsive.css"

const Banner = (props) => {
	return (
		<section className="deliver-sec">
			<div className="container">
				<div className="caption-block">
					<h2>Upskill the right skills that <strong>Deliver results!</strong></h2>
					<p>Learn how leaders transform their team!</p>
				</div>
				<div className="upskill-box-group">
					<div className="upskill-box">
						<div className="img-box">
							<figure className="img-main">
								<img className="img-full" src={process.env.REACT_APP_B2B_MEDIA_URL + "homepage/upskill-1.webp"} alt="" />
							</figure>
							<figure className="img-icon">
								<img className="img-full" src={images.bannerwhite} alt="" />
							</figure>
						</div>
						<div className="caption">
							<h3>Train New Joiners</h3>
							<p>We fasten your on-boarding process as per your business needs</p>
						</div>
					</div>
					<div className="upskill-box">
						<div className="img-box">
							<figure className="img-main">
								<img className="img-full" src={process.env.REACT_APP_B2B_MEDIA_URL + "homepage/upskill-2.webp"} alt="" />
							</figure>
							<figure className="img-icon">
								<img className="img-full" src={images.whiteSetting} alt="" />
							</figure>
						</div>
						<div className="caption">
							<h3>Updated skill sets</h3>
							<p>Our learning portal is designed & updated by Industry reputed Technology Experts</p>
						</div>
					</div>
					<div className="upskill-box">
						<div className="img-box">
							<figure className="img-main">
								<img className="img-full" src={process.env.REACT_APP_B2B_MEDIA_URL + "homepage/upskill-3.webp"} alt="" />
							</figure>
							<figure className="img-icon">
								<img className="img-full" src={images.whitePlay} alt="" />
							</figure>
						</div>
						<div className="caption">
							<h3>Interactive Learning Modules</h3>
							<p>Ensure real-time learning with our <br />Hands-on-labs & Sandboxes</p>
						</div>
					</div>
				</div>
				{/* <!-- discussMore --> */}
				<div className="discussMore">
					<div className="para">Would you like to <strong>discuss more on this ?</strong></div>
					<Link className="btn btn-demo" id="request-demos" to="/request-demo-page?utm_source=discuss">Request a Demo</Link>
				</div>
			</div>
		</section>
	);
};

export default Banner;
