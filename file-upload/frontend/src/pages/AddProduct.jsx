import React from "react";
import { Formik, Form } from "formik";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { productCreateSchema } from "../utils/validationSchemas";

const AddProduct = () => {
  return (
    <div className="form_wrapper">
      <Formik
        initialValues={{ name: "", price: 10, description: "" }}
        validationSchema={productCreateSchema}
        onSubmit={(values) => console.log(values)}
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

            <Button btnText="Submit" type="submit" />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
