import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../components/routes/InstructorRoute";
import { Avatar } from "antd";
import Link from "next/link";
import { FileDoneOutlined, DropboxOutlined } from "@ant-design/icons";

const InstructorIndex = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/instructor-courses");
    setCourses(data);
  };

  const myStyle = { marginTop: "-15px", fontSize: "10px" };

  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square"></h1>
      {/* <pre>{JSON.stringify(courses, null, 4)}</pre> */}

      {courses &&
        courses.map((course) => (
          <>
            <div className="media pt-2">
              <Avatar
                size={80}
                src={course.image ? course.image.Location : "/course.png"}
              />

              <div className="media-body pl-2">
                <div className="row">
                  <div className="col">
                    <Link
                      href={`/instructor/course/view/${course.slug}`}
                      className="pointer"
                    >
                      <a className="mt-2 text-info">
                        <h5 className="pt-2">{course.name}</h5>
                      </a>
                    </Link>
                    <p style={{ marginTop: "-10px" }}>
                      {course.lessons.length} Lessons
                    </p>

                    {course.lessons.length < 7 ? (
                      <p style={myStyle} className="text-warning">
                        7 lessons are required to publish a content
                      </p>
                    ) : course.published ? (
                      <p style={myStyle} className="text-success">
                        Your contentis live in the marketplace
                      </p>
                    ) : (
                      <p style={myStyle} className="text-success">
                        Your content is ready to be published
                      </p>
                    )}
                  </div>

                  <div className="col-md-3 mt-3 text-center">
                    {course.published ? (
                      <div>
                        <FileDoneOutlined className="h5 pointer text-success" />
                        <br />
                        <small className="text-muted text-info">Published</small>
                      </div>
                    ) : (
                      <div>
                        <DropboxOutlined className="h5 pointer text-warning" />
                        <br />
                        <small className="text-muted">Unpublished</small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
    </InstructorRoute>
  );
};

export default InstructorIndex;
