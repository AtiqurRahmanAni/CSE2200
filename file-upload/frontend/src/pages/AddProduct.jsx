import React from "react";
import { Formik, Form } from "formik";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { productCreateSchema } from "../utils/validationSchemas";
import ProductCoverPhotoSelection from "../components/ProductCoverPhotoSelection/ProductCoverPhotoSelection";
import ProductImagesSelection from "../components/ProductImagesSelection/ProductImagesSelection";
import { useMutation } from "react-query";
import { axiosInstance } from "../utils/axiosInstance";
import toast from "react-hot-toast";

const AddProduct = () => {
  const mutation = useMutation({
    mutationFn: (fromData) =>
      axiosInstance.post("/api/products", fromData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onError: (error) => {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
    },
  });

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("price", values.price);
    formData.set("description", values.description);
    formData.set("productCardImage", values.productCardImage);

    for (let i = 0; i < values.productImages.length; i++) {
      formData.append("productImages", values.productImages[i]);
    }

    mutation.mutate(formData);
  };

  return (
    <div className="form_wrapper">
      <Formik
        initialValues={{
          name: "",
          price: 10,
          description: "",
          productCardImage: null,
          productImages: [],
        }}
        validationSchema={productCreateSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form className="product_create_form">
            <Input label="Product Name" name="name" type="text" />
            <Input label="Price" name="price" type="number" />
            <Input
              label="Description"
              name="description"
              type="text"
              isTextArea={true}
            />
            <ProductCoverPhotoSelection
              image={props.values.productCardImage}
              setImage={(image) =>
                props.setFieldValue("productCardImage", image)
              }
              error={
                props.touched.productCardImage && props.errors.productCardImage
              }
            />
            <ProductImagesSelection
              images={props.values.productImages}
              setImages={(images) =>
                props.setFieldValue("productImages", images)
              }
              error={props.touched.productImages && props.errors.productImages}
            />
            <Button
              btnText="Add"
              type="submit"
              loading={mutation.isLoading}
              loadingText="Adding.."
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
