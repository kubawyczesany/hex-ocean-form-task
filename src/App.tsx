import * as React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Form } from "./components/Form";
import "./styles.css";

export default function App() {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-md-6">
          <Form />
        </div>
      </div>
    </div>
  );
}
