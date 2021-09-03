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
      <Form className="flex flex-col gap-2 items-start">
        <label htmlFor="concept">Concept</label>
        <Field name="concept" type="text" />
        <div className="hint -mt-2">
          <ErrorMessage name="concept" className="text-red-600" />
        </div>
        <br />
        <label htmlFor="currency">Currency</label>
        <Field as="select" name="currency" type="text">
          <option value="COP">COP</option>
          <option value="USD">USD</option>
        </Field>
        <div className="hint -mt-2">
          <ErrorMessage name="currency" className="text-red-600" />
        </div>
        <br />

        <label htmlFor="fDate">Date</label>
        <Field name="fDate" type="date" />
        <div className="hint -mt-2">
          <ErrorMessage name="fDate" className="text-red-600" />
        </div>
        <br />

        <label htmlFor="description">Description</label>
        <Field as="textarea" rows="3" name="description" type="text" />
        <div className="hint -mt-2">
          <ErrorMessage name="description" className="text-red-600" />
        </div>
        <br />

        <label htmlFor="responsible">Responsible</label>
        <Field name="responsible" type="text" />
        <div className="hint -mt-2">
          <ErrorMessage name="responsible" className="text-red-600" />
        </div>
        <br />

        <label htmlFor="status" className="flex flex-row gap-5">
          Status <Field name="status" type="checkbox" />
        </label>
        <div className="hint -mt-2">
          <ErrorMessage name="status" />
        </div>
        <br />

        <label htmlFor="type">Type</label>
        <Field as="select" name="type" type="text">
          <option value="DEBT">Debt</option>
          <option value="INCOME">Income</option>
        </Field>
        <div className="hint -mt-2">
          <ErrorMessage name="type" className="text-red-600" />
        </div>
        <br />

        <label htmlFor="value">Value</label>
        <Field name="value" type="number" />
        <div className="hint -mt-2">
          <ErrorMessage name="value" className="text-red-600" />
        </div>

        <button type="submit" className="btn-success">
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default BalanceForm;
