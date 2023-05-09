import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "react-bootstrap/Button";
import schema from "./utils/Form.schema";
import formTexts from "./utils/Form.texts";
import formLinks from "./utils/Form.links";

type Object = {
  [key: string]: any;
};

export const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [message, setMessage] = useState("");
  const [dishType, setSelectedDishType] = useState("");
  const dishTypes = [
    { id: 0, name: "not selected" },
    { id: 1, name: "pizza" },
    { id: 2, name: "soup" },
    { id: 3, name: "sandwich" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDishType(e.target.value);
  };

  const onSubmit = (data: Object) => {
    const filteredData = Object.keys(data).reduce((filtered: Object, key) => {
      if (data[key] !== "") {
        filtered[key] = data[key];
      }
      return filtered;
    }, {});

    fetch(formLinks.postUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filteredData),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(() => {
        setMessage(formTexts.messageSuccessful);
      })
      .catch((err) => {
        setMessage(err.toString());
      });
    console.log(message);
    console.log(filteredData);
    reset();
  };

  return (
    <>
      <div className="d-flex bg-gradient-light">
        <form
          className="col-sm-7 mt-5 my-auto mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <label htmlFor="dish-name" className="form-label">
              {formTexts.dishName}
            </label>
            <input
              {...register("dishName")}
              type="name"
              className="form-control"
              id="dish-name"
              placeholder="Dish name"
              name="dishName"
            />
            {errors.dishName && (
              <p className="text-danger">{errors.dishName.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="user-birth-date" className="form-label">
              {formTexts.preparationTime}
            </label>
            <input
              {...register("preparationTime")}
              type="text"
              pattern="\d{2}:\d{2}:\d{2}"
              placeholder="00:00:00"
              className="form-control"
              id="preparation-time"
              name="preparationTime"
            />
            {errors.preparationTime && (
              <p className="text-danger">{errors.preparationTime.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="dishType" className="form-label">
              {formTexts.dishType}
            </label>
            <select
              {...register("dishType")}
              id="dish-type"
              placeholder="Select type of dish"
              name="dishType"
              onChange={(e) => handleChange(e)}
            >
              <option disabled hidden>
                {formTexts.chooseDishType}
              </option>
              {dishTypes &&
                dishTypes.map(({ id, name }) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
            </select>
          </div>
          {dishType === "pizza" && (
            <>
              <div className="mb-3">
                <label htmlFor="no-of-slices" className="form-label">
                  {formTexts.noOfSlices}
                </label>
                <input
                  {...register("noOfSlices")}
                  type="number"
                  className="form-control"
                  id="no-of-slices"
                  placeholder="Number of slices"
                  name="noOfSlices"
                />
                {errors.noOfSlices && (
                  <p className="text-danger">{errors.noOfSlices.message}</p>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="diameter" className="form-label">
                  {formTexts.diameter}
                </label>
                <input
                  {...register("diameter")}
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="diameter"
                  placeholder="Diameter"
                  name="diameter"
                />
                {errors.diameter && (
                  <p className="text-danger">{errors.diameter.message}</p>
                )}
              </div>
            </>
          )}
          {dishType === "soup" && (
            <div className="mb-3">
              <label htmlFor="spiciness-scale" className="form-label">
                {formTexts.spicinessScale}
              </label>
              <input
                {...register("spicinessScale")}
                type="number"
                className="form-control"
                id="spiciness-scale"
                placeholder="Spiciness Scale (1-10)"
                name="spicinessScale"
              />
              {errors.spicinessScale && (
                <p className="text-danger">{errors.spicinessScale.message}</p>
              )}
            </div>
          )}
          {dishType === "sandwich" && (
            <div className="mb-3">
              <label htmlFor="slices-of-bread" className="form-label">
                {formTexts.slicesOfBread}
              </label>
              <input
                {...register("slicesOfBread")}
                type="number"
                className="form-control"
                id="slices-of-bread"
                placeholder="Number of Slices of Bread"
                name="slicesOfBread"
              />
              {errors.slicesOfBread && (
                <p className="text-danger">{errors.slicesOfBread.message}</p>
              )}
            </div>
          )}
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Button type="submit" className="btn btn-dark">
              {formTexts.send}
            </Button>
          </div>
          {message && <p className="text-success">{message}</p>}
        </form>
      </div>
    </>
  );
};
