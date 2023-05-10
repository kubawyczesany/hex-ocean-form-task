import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Dish name is required"),
  preparation_time: yup
    .string()
    .required("Preparation time is required")
    .typeError("Please use HH:MM:SS format"),
  type: yup.string().required().oneOf(["pizza", "soup", "sandwich"]),
  no_of_slices: yup.number().typeError("Please enter a number of slices"),
  diameter: yup.number().typeError("Please enter a diameter"),
  slices_of_bread: yup.number().typeError("Please enter a number of slices"),
  spiciness_scale: yup
    .number()
    .min(0, "Min is 0")
    .max(10, "Max is 10")
    .typeError("Please enter a 1-10 number"),
});

export default schema;
