import React from "react";
import { images } from "src/config/images";
// import "./BrandsBlock.scss";
import "../../pages/IndexPage/style.css"
import "../../pages/IndexPage/responsive.css"

const BrandsBlock = (props) => {
	return (
		<div className="explore-category">
			<div className="container">
				<div className="block-group">
					<div className="block" href="#">
						<figure><img className="img-full" src={images.anytime} alt="" /></figure>
						<span>Learn Anywhere, Anytime</span>
						<ul className="category-list">
							<li>- Easy to Use LMS</li>
							<li>- Integrated Labs & Sandboxes</li>
							<li>- Practice Tests & Lab Challenges</li>
						</ul>
					</div>
					<div className="block" href="#">
						<figure><img className="img-full" src={images.support} alt="" /></figure>
						<span>Expert Support</span>
						<ul className="category-list">
							<li>- 24x7 Tech Support</li>
							<li>- Access to our Forums</li>
							<li>- Dedicated team for Account management</li>
						</ul>
					</div>
					<div className="block" href="#">
						<figure><img className="img-full" src={images.analytics} alt="" /></figure>
						<span>Analytics</span>
						<ul className="category-list">
							<li>- Learner Level Analytics</li>
							<li>- Track the progress of your Team</li>
							<li>- License Usage Metrics</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BrandsBlock;
