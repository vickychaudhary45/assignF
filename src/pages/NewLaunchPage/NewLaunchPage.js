import Layout from "../../Layout";
import CoursePageProps from "../../components/Props/CoursepageProps";
import NewLaunch from "../../components/NewLaunchSection/NewLaunch";
import "./NewLaunchPage.scss";

const NewLaunchPage = () => {
  return (
    <Layout>
      <div className="main-content new-launch-page">
        <div className="container">
          <div className="details-block">
            <NewLaunch {...CoursePageProps.course_select_page} />
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default NewLaunchPage;
