import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";
import styles from "./MyCourses.module.css";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function fetchCourses() {
    try {
      const { data } = await axios.get(`${server}/api/mycourse`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setCourses(data.purchasedCourses);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch courses. Please try again.");
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleStartLearning = (courseId) => {
    navigate(`/course-content/${courseId}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.myCourses}>
      <h1 className={styles.title}>My Courses</h1>
      {courses.length > 0 ? (
        <div className={styles.courseList}>
          {courses.map((course) => (
            <div key={course.courseId} className={styles.courseCard}>
              <h2 className={styles.courseName}>{course.name}</h2>
              <button
                onClick={() => handleStartLearning(course.courseId)}
                className={styles.startLearningBtn}
              >
                Start Learning
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noCourses}>You have not purchased any courses yet.</p>
      )}
    </div>
  );
};

export default MyCourses;
