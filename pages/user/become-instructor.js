import { useContext, useState } from "react";
import { Context } from "../../context";
import { Button } from "antd";
import axios from "axios";
import {
  SettingOutlined,
  UserSwitchOutlined,
  LoadingOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import UserRoute from "../../components/routes/UserRoute";

const BecomeInstructor = () => {
  // state
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(Context);

  const becomeInstructor = () => {
    // console.log("become instructor");
    setLoading(true);
    axios
      .post("/api/make-instructor")
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      })
      .catch((err) => {
        console.log(err.response.status);
        toast.error("Stripe onboarding failed. Try again.");
        setLoading(false);
      });
  };

  return (
    <>
      <h1 className="jumbotron text-center square bg-info"></h1>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center text-info">
            <div className="pt-4">
              <DollarOutlined className="display-1 pb-3 text-info" />
              <br />
              <h2 className='text-info'>You must set up a Stripe Account to publish course in our Platform</h2>
            

              <Button
                className="mb-3 bg-info text-white"
                type="info"
                block
                shape="round"
                icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
                size="large"
                onClick={becomeInstructor}
                target="_blank"
                disabled={
                  (user && user.role && user.role.includes("Instructor")) ||
                  loading
                }
              >
                {loading ? "Processing..." : "Stripe Account Portal"}
              </Button>

              <p className="lead">
              You will be redirected to Stripe to complete the onboarding process. If you have any issues or questions, just use the BugChat to comminute with our support team.              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeInstructor;
