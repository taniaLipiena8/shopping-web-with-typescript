import {
  addNewProduct,
  getCategories,
} from "../../../services/ProductsServices";
import CustomInput from "../../../form-templates/CustomInput";
import CustomSelect from "../../../form-templates/CustomSelect";
import CustomTextarea from "../../../form-templates/CustomTextarea";
import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "./AddProduct.css";
import { addSchema } from "../../../form-templates/ValidationSchema";
import Product from "../../../models/Product";

const AddProduct = () => {
  const [categories, setCategories] = useState<string[]>([]);

  const initialValues: Product = {
    title: "",
    desc: "",
    price: 0,
    stock: 0,
    category: "",
    brand: "",
    image: "",
    rating: 0,
    id: "",
  };

  const fetchCategories = async () => {
    let categories = await getCategories();
    setCategories(categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onSubmit = async (values: Product, actions: { resetForm: () => void }) => {
    console.log(values);
    try {
      const newproduct = { ...values, thumbnail: values.image };
      let resp = await addNewProduct(newproduct);
      console.log(resp);
    } catch (error) {
      alert(error);
    } finally {
      actions.resetForm();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={addSchema}
    >
      {({ isSubmitting, setFieldValue, isValid, dirty }) => (
        <Form className="add">
          <h2>Add Product</h2>

          <CustomInput label="Product Name" name="title" type="text" placeholder="Enter product name"/>

          <CustomTextarea label="Description" name="desc" placeholder="Enter product description"/>

          <CustomInput label="Price" name="price" type="number" />

          <CustomInput label="Stock" name="stock" type="number" />

          <CustomSelect label="Category" name="category"placeholder="Please pick one">
            <option value=""></option>
            {categories.map((category) => (
              <option key={category} value={category.replace(" ", "-")}>
                {category}
              </option>
            ))}
          </CustomSelect>

          <CustomInput label="Brand Name" name="brand" type="text" placeholder="Enter product brand"/>

          <label htmlFor="image">Thumbnail</label>
          <input
            id="image"
            name="image"
            type="file"
            onChange={(event) => {
              if (!event.currentTarget.files || event.currentTarget.files.length === 0) {
                alert("Select a file");
                return;
              } else {
                setFieldValue("image", event.currentTarget.files[0].name);
              }
            }}
          />

          <div className="add-btn ">
            <Button
              size="lg"
              style={{ width: "100%" }}
              variant="outline-primary"
              type="submit"
              disabled={isSubmitting || !isValid || !dirty}
            >
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddProduct;
