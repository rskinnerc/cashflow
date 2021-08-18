// Props receives the Pocket object if update, and the submit function (either update or create)

import { Formik, Field, Form, ErrorMessage } from "formik";
import { FunctionComponent } from "react";
import { Pocket } from "../models/Pocket";
import * as Yup from "yup";
export interface PocketFormProps {
  pocket: Pocket;
  submitFn: Function;
}

const PocketForm: FunctionComponent<PocketFormProps> = ({
  pocket,
  submitFn,
}) => {
  function submit(values: Partial<Pocket>) {
    pocket.balance = values.balance!;
    pocket.currency = values.currency!;
    pocket.status = values.status!;
    pocket.name = values.name!;
    submitFn(pocket);
  }

  return (
    <div>
      <h2>Pocket Form</h2>
      <Formik
        initialValues={{
          balance: pocket.balance,
          currency: pocket.currency,
          status: pocket.status,
          name: pocket.name,
        }}
        validationSchema={Yup.object({
          balance: Yup.number().moreThan(0).required(),
          currency: Yup.string().oneOf(["COP", "USD"]).required(),
          status: Yup.bool().required(),
          name: Yup.string().max(32).required(),
        })}
        onSubmit={(values) => submit(values)}
      >
        <Form>
          <label htmlFor="balance">Balance</label>
          <Field name="balance" type="number" />
          <ErrorMessage name="balance" className="text-red-600" />

          <label htmlFor="currency">Currency</label>
          <Field name="currency" type="text" />
          <ErrorMessage name="currency" className="text-red-600" />

          <label htmlFor="name">Name</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" component="span" className="text-red-600" />

          <label htmlFor="status">Name</label>
          <Field name="status" type="checkbox" />
          <ErrorMessage name="status" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default PocketForm;
