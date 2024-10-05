import Layout from "../../Layout";
import RequestedCoursesTable from "../../components/RequestedCoursesTable/RequestedCoursesTable";
import "./RequestedCourses.scss";

const RequestedCourses = () => {
  return (
    <Layout>
      <div className="main-content requested-course-page">
        <div className="container">
          <div className="details-block">
            <RequestedCoursesTable />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RequestedCourses;
