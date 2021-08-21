import { Formik, Field, ErrorMessage, Form } from "formik";
import { FunctionComponent } from "react";
import { Balance } from "../models/Balance";
import * as Yup from "yup";

export interface BalanceFormProps {
  balance: Balance;
  submitFn: Function;
}

const BalanceForm: FunctionComponent<BalanceFormProps> = ({
  balance,
  submitFn,
}) => {
  function submit(b: Partial<Balance>) {
    balance.concept = b.concept!;
    balance.currency = b.currency!;
    balance.fDate = b.fDate!;
    balance.description = b.description!;
    balance.responsible = b.responsible!;
    balance.status = b.status!;
    balance.type = b.type!;
    balance.value = b.value!;
    submitFn(balance);
  }

  return (
    <div>
      <h2>Balance Form</h2>
      <Formik
        initialValues={{
          concept: balance.concept,
          currency: balance.currency,
          fDate: balance.fDate,
          description: balance.description,
          responsible: balance.responsible,
          status: balance.status,
          type: balance.type,
          value: balance.value,
        }}
        validationSchema={Yup.object({
          concept: Yup.string().required(),
          currency: Yup.string().oneOf(["COP", "USD"]).required(),
          fDate: Yup.date().required("This field is required"),
          description: Yup.string().required(),
          responsible: Yup.string().required(),
          status: Yup.boolean().required(),
          type: Yup.string().oneOf(["INCOME", "DEBT"]).required(),
          value: Yup.number().required(),
        })}
        onSubmit={(values) => submit(values)}
      >
        <Form>
          <label htmlFor="concept">Concept</label>
          <Field name="concept" type="text" />
          <ErrorMessage name="concept" className="text-red-600" />
          <br />
          <label htmlFor="currency">Currency</label>
          <Field name="currency" type="text" />
          <ErrorMessage name="currency" className="text-red-600" />
          <br />

          <label htmlFor="fDate">Date</label>
          <Field name="fDate" type="date" />
          <ErrorMessage name="fDate" className="text-red-600" />
          <br />

          <label htmlFor="description">Description</label>
          <Field name="description" type="text" />
          <ErrorMessage name="description" className="text-red-600" />
          <br />

          <label htmlFor="responsible">Responsible</label>
          <Field name="responsible" type="text" />
          <ErrorMessage name="responsible" className="text-red-600" />
          <br />

          <label htmlFor="status">Status</label>
          <Field name="status" type="checkbox" />
          <ErrorMessage name="status" />
          <br />

          <label htmlFor="type">Type</label>
          <Field name="type" type="text" />
          <ErrorMessage name="type" className="text-red-600" />
          <br />

          <label htmlFor="value">Value</label>
          <Field name="value" type="number" />
          <ErrorMessage name="value" className="text-red-600" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default BalanceForm;
