import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import UserLayout from "../layout/UserLayout";
import MetaData from "../layout/MetaData";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [updateProfile, { data, isLoading, error, isSuccess }] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setEmail(user?.email);
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("User Updated");
      navigate("/me/profile");
    }
  }, [user, error, isSuccess]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = { name, email };
    await updateProfile(userData);
  };
  return (
    <UserLayout>
      <MetaData title={"Update Profile"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form className="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 className="mb-4">Update Profile</h2>

            <div className="mb-3">
              <label for="name_field" className="form-label">
                {" "}
                Name{" "}
              </label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email_field" className="form-label">
                {" "}
                Email{" "}
              </label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn w-100"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default UpdateProfile;
