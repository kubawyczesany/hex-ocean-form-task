import * as yup from "yup";

const schema = yup.object().shape({
  dishName: yup.string().required("Dish name is required"),
  preparationTime: yup
    .string()
    .required("Preparation time is required")
    .typeError("Please use HH:MM:SS format"),
  dishType: yup.string().required().oneOf(["pizza", "soup", "sandwich"]),
  noOfSlices: yup.number().typeError("Please enter a number of slices"),
  diameter: yup.number().typeError("Please enter a diameter"),
  slicesOfBread: yup.number().typeError("Please enter a number of slices"),
  spicinessScale: yup
    .number()
    .min(0, "Min is 0")
    .max(10, "Max is 10")
    .typeError("Please enter a 1-10 number"),
});

export default schema;
