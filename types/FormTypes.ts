export interface FieldOption {
  text: string;
  value: string;
}

export interface Question {
  text: string;
  fieldType: "RadioGroup" | "Select" | "Input" | "Textarea" | "Switch";
  fieldOptions?: FieldOption[];
}

export interface FormData {
  user_prompt: string;
  name: string;
  description: string;
  questions: Question[];
  userId?: string;
}
