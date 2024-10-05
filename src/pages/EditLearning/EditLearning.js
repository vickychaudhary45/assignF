import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import { LearningPageProps } from "../../components/Props/LearningPageProps";
import { BreadCrumbsProps } from "../../components/Props/BreadCrumbsProps";
import BreadCrumbs from "../../components/BreadCrumbs/BreadCrumbs";
import EditLearningForm from "../../components/EditLearningForm/EditLearningForm";
import { useParams } from "react-router-dom";
import { getLearningPathById } from "src/services/learning-paths/services";
import { PulseLoader } from "src/components/Loader/Loader";
import "./EditLearning.scss";

const EditLearning = () => {
  const [learningPath, setLearningPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    async function fetchData(id) {
      const response = await getLearningPathById(id);
      if (response.status === 'success') {
        BreadCrumbsProps.edit_learning_page.sub_title = `Edit - ${response?.data?.name}`;
        BreadCrumbsProps.edit_learning_page.create_txt = `Edit - ${response?.data?.name}`;
        setLearningPath(response?.data);
        setLoading(false);
      }
    }
    if (!learningPath && id) {
      fetchData(id);
    }
  }, [id, learningPath])
  return (
    <Layout>
      {!loading ?
        <div className="main-content create-learning-page">
          <div className="container-small">
            <BreadCrumbs {...BreadCrumbsProps.edit_learning_page} />
            <EditLearningForm learningPath={learningPath} setLearningPath={setLearningPath} {...LearningPageProps.create_learning_page} />
          </div>
        </div>
        : <div className="loader">
          <PulseLoader />
        </div>
      }
    </Layout>
  );
};

export default EditLearning;
