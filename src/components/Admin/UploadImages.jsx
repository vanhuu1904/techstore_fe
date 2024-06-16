import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import MetaData from "../layout/MetaData";
import {
  useDeleteProductImageMutation,
  useGetProductDetailsQuery,
  useUploadProductImagesMutation,
} from "../../redux/api/productsApi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const UploadedImages = () => {
  const fileInputRef = useRef(null);
  const params = useParams();
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const [uploadProductImages, { isLoading, isSuccess, error }] =
    useUploadProductImagesMutation();
  const { data } = useGetProductDetailsQuery(params?.id);
  const [
    deleteProductImage,
    { isLoading: isDeleteLoading, error: deleteError },
  ] = useDeleteProductImageMutation();

  useEffect(() => {
    if (data?.product) {
      setUploadedImages(data?.product?.images);
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      setImagesPreview([]);
      toast.success("Images Uploaded");
      navigate("/admin/products");
    }
    if (deleteError) {
      toast.error(error?.data?.message);
      console.log("adsad");
    }
  }, [data, error, deleteError, isSuccess]);
  const onChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(">>check files: ", files);
    files?.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader?.result]);
          setImages((oldArray) => [...oldArray, reader?.result]);
        }
      };
      reader.readAsDataURL(file);
    });
    console.log(">>check images: ", imagesPreview);
  };
  const handleResetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleImagePreviewDelete = (image) => {
    const filteredImagesPreview = imagesPreview.filter((img) => img != image);
    setImages(filteredImagesPreview);
    setImagesPreview(filteredImagesPreview);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    uploadProductImages({ id: params?.id, body: { images } });
  };
  const deleteImage = async (imgId) => {
    await deleteProductImage({ id: params?.id, body: { imgId } });
  };
  return (
    <AdminLayout>
      <MetaData title={"Upload Images"} />
      <div class="row wrapper">
        <div class="col-10 col-lg-8 mt-5 mt-lg-0">
          <form class="shadow rounded bg-body" onSubmit={submitHandler}>
            <h2 class="mb-4">Upload Product Images</h2>

            <div class="mb-3">
              <label for="customFile" class="form-label">
                Choose Images
              </label>

              <div class="custom-file">
                <input
                  ref={fileInputRef}
                  type="file"
                  name="product_images"
                  class="form-control"
                  id="customFile"
                  multiple
                  onChange={onChange}
                  onClick={handleResetFileInput}
                />
              </div>
              {imagesPreview?.length > 0 && (
                <div class="new-images my-4">
                  <p class="text-warning">New Images:</p>
                  <div class="row mt-4">
                    {imagesPreview?.map((image) => (
                      <div class="col-md-3 mt-2">
                        <div class="card">
                          <img
                            src={image}
                            alt="Card"
                            class="card-img-top p-2"
                            style={{ width: "100%", height: "80px" }}
                          />
                          <button
                            style={{
                              "background-color": "#dc3545",
                              "border-color": "#dc3545",
                            }}
                            type="button"
                            class="btn btn-block btn-danger cross-button mt-1 py-0"
                            onClick={() => handleImagePreviewDelete(image)}
                          >
                            <i class="fa fa-times"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {uploadedImages?.length > 0 && (
                <div class="uploaded-images my-4">
                  <p class="text-success">Product Uploaded Images:</p>
                  <div class="row mt-1">
                    {uploadedImages?.map((image) => {
                      console.log(">>>check image: ", image);
                      return (
                        <div class="col-md-3 mt-2">
                          <div class="card">
                            <img
                              src={image?.url}
                              alt="Card"
                              class="card-img-top p-2"
                              style={{ width: "100%", height: "80px" }}
                            />
                            <button
                              style={{
                                "background-color": "#dc3545",
                                "border-color": "#dc3545",
                              }}
                              class="btn btn-block btn-danger cross-button mt-1 py-0"
                              disabled={isLoading || isDeleteLoading}
                              onClick={() => deleteImage(image?.public_id)}
                              type="button"
                            >
                              <i class="fa fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <button
              id="register_button"
              type="submit"
              class="btn w-100 py-2"
              disabled={isLoading || isDeleteLoading}
            >
              {isLoading || isDeleteLoading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UploadedImages;
