import React from "react";
import { images } from "src/config/images";
// import "./CoursesSection.scss";
import "../../pages/IndexPage/style.css"
import "../../pages/IndexPage/responsive.css"

const CoursesSection = (props) => {
	return (
		<div className="three-blocks">
			<div className="container">
				<h2 style={{ textAlign: 'center' }}>How do we Upskill your Team?</h2>
				<div className="block-group">
					<div className="block">
						<figure><img className="img-full" src={images.practice} alt="" /></figure>
						<div className="title">Practice Tests</div>
						<p>Practice tests are designed by experts to simulate the real exam scenario. Whizlabs practice tests are based on the real exam objectives to check your preparation level, and get you ready for the certification exam.</p>
					</div>
					<div className="block">
						<figure><img className="img-full" src={images.console} alt="" /></figure>
						<div className="title">Video Courses</div>
						<p>Video courses are created by industry experts to help candidates enhance their skills and prepare them for the certification exams. Whizlabs video course covers all the exam objectives, thus helps you pass the exam.</p>
					</div>
					<div className="block">
						<figure><img className="img-full" src={images.hand} alt="" /></figure>
						<div className="title">Hands-on Labs</div>
						<p>Hands-on labs provide learners with an opportunity to get hands-on with different cloud technologies and platforms. Whizlabs Hands-on labs offer a platform to have practical knowledge and gain real-time experience</p>
					</div>
				</div>
				<ul>
					<li>Builds the competency, and not just skills</li>
					<li>Facilitates teamwork, an ability to walk towards common goal</li>
					<li>Manages the learning, not the learner</li>
					<li>Transforms knowledge into Wisdom</li>
				</ul>
			</div>
		</div>
	);
};

export default CoursesSection;
