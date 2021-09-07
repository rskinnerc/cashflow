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
      <Form className="flex flex-col gap-2 items-start mb-7">
        <label htmlFor="balance">Balance</label>
        <Field name="balance" type="number" />
        <div className="hint -mt-2">
          <ErrorMessage name="balance" />
        </div>

        <label htmlFor="currency">Currency</label>
        <Field as="select" name="currency" type="text">
          <option value="COP">COP</option>
          <option value="USD">USD</option>
        </Field>
        <div className="hint -mt-2">
          <ErrorMessage name="currency" />
        </div>

        <label htmlFor="name">Name</label>
        <Field name="name" type="text" />
        <div className="hint -mt-2">
          <ErrorMessage name="name" component="span" />
        </div>

        <label htmlFor="status" className="flex flex-row items-center gap-5">
          Status <Field name="status" type="checkbox" />
        </label>
        <div className="hint -mt-2">
          <ErrorMessage name="status" />
        </div>

        <button type="submit" className="btn-success">
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default PocketForm;
