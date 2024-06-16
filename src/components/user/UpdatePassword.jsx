import React, { useEffect, useState } from "react";
import { useUpdatePasswordMutation } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import UserLayout from "../layout/UserLayout";
import MetaData from "../layout/MetaData";

const UpdatePassword = () => {
  const { user } = useSelector((state) => state.auth);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [updatePassword, { isLoading, isSuccess, error }] =
    useUpdatePasswordMutation();
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Password Updated");
      navigate("/me/profile");
    }
  }, [error, isSuccess]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = { password, oldPassword };
    await updatePassword(userData);
  };
  return (
    <UserLayout>
      <MetaData title={"Update Password"} />
      <div class="row wrapper">
        <div class="col-10 col-lg-8">
          <form class="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 class="mb-4">Update Password</h2>
            <div class="mb-3">
              <label for="old_password_field" class="form-label">
                Old Password
              </label>
              <input
                type="password"
                id="old_password_field"
                class="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div class="mb-3">
              <label for="new_password_field" class="form-label">
                New Password
              </label>
              <input
                type="password"
                id="new_password_field"
                class="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              class="btn update-btn w-100"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default UpdatePassword;
