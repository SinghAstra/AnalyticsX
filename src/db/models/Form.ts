import mongoose from "mongoose";

const fieldTypes = ["RadioGroup", "Select", "Input", "Textarea", "Switch"];

const fieldOptionSchema = new mongoose.Schema({
  text: String,
  value: String,
});

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  fieldType: {
    type: String,
    enum: fieldTypes,
    required: true,
  },
  fieldOptions: [fieldOptionSchema],
});

const formSchema = new mongoose.Schema({
  user_prompt: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  questions: [questionSchema],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  published: { type: Boolean, default: false },
});

const Form = mongoose.models.Form || mongoose.model("Form", formSchema);

export default Form;
