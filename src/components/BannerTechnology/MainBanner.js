import React from "react";
import { images } from "src/config/images";
import { Link } from "react-router-dom";
// import "./MainBanner.scss";
import "../../pages/IndexPage/style.css"
import "../../pages/IndexPage/responsive.css"

const Banner = (props) => {
	return (
		<>
			<div className="banner-block">
				<div className="banner">
					<div className="container">
						<div className="caption">
							<h1>Upskill your Team <br /> @5X SPEED</h1>
							<p className="sub-title">with our Technology Playground</p>
							<div className="btn-group">
								<Link className="btn overview" to="/request-demo-page?utm_source=banner" style={{ borderRadius: '30px' }}>Request Demo <span>{'>'}</span></Link>
							</div>
						</div>
						<figure className="img-block"><img className="img-full" src={process.env.REACT_APP_B2B_MEDIA_URL + "homepage/whiz-business-banner%402x.webp"} alt="" /></figure>
					</div>
				</div>
			</div>

			<div id="content-area">
				{/* <!-- upskilled-sec --> */}
				<div className="upskilled-sec">
					<div className="container">
						<h5 className="title-sec">500+ Companies Upskilled by Whizlabs</h5>
						<div className="companies-group">
							<figure className="company">
								<img className="img-full" src={images.jplogo} alt="" />
							</figure>
							<figure className="company">
								<img className="img-full" src={images.deloitte} alt="" />
							</figure>
							<figure className="company">
								<img className="img-full" src={images.accenture} alt="" />
							</figure>
							<figure className="company">
								<img className="img-full" src={images.campgemni} alt="" />
							</figure>
							<figure className="company">
								<img className="img-full" src={images.telefonica} alt="" />
							</figure>
							<figure className="company">
								<img className="img-full" src={images.tuv} alt="" />
							</figure>
							<figure className="company">
								<img className="img-full" src={images.gkl} alt="" />
							</figure>
							<figure className="company">
								<img className="img-full" src={images.wl} alt="" />
							</figure>
							<figure className="company">
								<img className="img-full" src={images.vcl} alt="" />
							</figure>
							<figure className="company">
								<img className="img-full" src={images.tlg} alt="" />
							</figure>
							<figure className="company">
								<img className="img-full" src={images.miami} alt="" />
							</figure>
							<figure className="company">
								<img className="img-full" src={images.versor} alt="" />
							</figure>
							<figure className="company">
								<img className="img-full" src={images.mityo} alt="" />
							</figure>
							<figure className="company">
								<img className="img-full" src={images.stack} alt="" />
							</figure>
							<figure className="company">
								<img className="img-full" src={images.digi} alt="" />
							</figure>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Banner;
