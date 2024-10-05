import React, { useState } from "react";
import { VideoPop } from "./VideoPopUp";
import { images } from "../../config/images";
// import "./GlobelSection.scss";
import "../../pages/IndexPage/style.css"
import "../../pages/IndexPage/responsive.css"

const GlobelSection = (props) => {
	const [modal, setModal] = useState(false);
	const [vidUrl, setVidUrl] = useState()

	const openVideoModal = (Vurl) => {
		setModal(!modal);
		setVidUrl(Vurl)
	};

	const reviewData = [
		{
			thumbnail: process.env.REACT_APP_B2B_MEDIA_URL + "homepage/daniel.webp",
			Vurl: "https://www.youtube.com/embed/O4lC2QZ28D8",
		},
		{
			thumbnail: process.env.REACT_APP_B2B_MEDIA_URL + "homepage/karthik.webp",
			Vurl: "https://www.youtube.com/embed/HDKi-4ISvvo"
		},
		{
			thumbnail: process.env.REACT_APP_B2B_MEDIA_URL + "homepage/krishna.webp",
			Vurl: "https://www.youtube.com/embed/75HgZTcef3Y"
		},
		{
			thumbnail: process.env.REACT_APP_B2B_MEDIA_URL + "homepage/Casey.webp",
			Vurl: "https://www.youtube.com/embed/iFbeWbZZ9FU"
		}
	]

	return (
		<section className="why-do-sec" onClick={modal}>
			<VideoPop videoURL={vidUrl} modal={modal} setModal={setModal} />
			<div className="container">
				<h2>Why do our Learners love us?</h2>
				<div className="learners">
					{reviewData && reviewData.map((video, i) => (
						<div className="learner-box" key={i}>
							<figure className="main-img"><img className="img-full" src={video.thumbnail} alt="" /></figure>
							<figure className="play-icon" id="playIcon"><img className="img-full" onClick={() => openVideoModal(video.Vurl)} src={images.playborder} alt="" /></figure>
							<div className="user-block">
							</div>
							<div className="gradient"></div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default GlobelSection;
