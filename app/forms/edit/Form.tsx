import { FormData } from "@/types/FormTypes";
import React from "react";

interface FormProps {
  form: FormData;
  editMode?: boolean;
}

const Form = ({ form, editMode }: FormProps) => {
  return <div>Form</div>;
};

export default Form;
