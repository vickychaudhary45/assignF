import React from "react";
import Layout from "../../Layout";
import { LearningPageProps } from "../../components/Props/LearningPageProps";
import CreateLearningForm from "../../components/CreateLearningForm/CreateLearningForm";
import "./CreateLearning.scss";

const CreateLearning = () => {
  return (
    <Layout>
      <div className="main-content create-learning-page">
        <div className="container-small">
          <CreateLearningForm {...LearningPageProps.create_learning_page} />
        </div>
      </div>
    </Layout>
  );
};

export default CreateLearning;
