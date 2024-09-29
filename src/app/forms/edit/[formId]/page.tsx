"use client";
import { useSessionContext } from "@/context/SessionContext";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Question {
  questionText: string;
  questionType: string;
}

interface FormInfo {
  _id: string;
  name: string;
  description: string;
  published: boolean;
  questions: Question[];
  userId: string;
  user_prompt: string;
}

const EditForm = () => {
  const { formId } = useParams();
  const { session } = useSessionContext();
  const userId = session?.user?.id;
  const [formInfo, setFormInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!formId) return;

    const fetchFormInfo = async () => {
      try {
        const response = await axios.get(`/api/forms/${formId}`);
        console.log("response.data --fetchFormInfo is ", response.data);
        setFormInfo(response.data);
      } catch (error: any) {
        console.log("error is ", error.response.data.message);
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFormInfo();
  }, [formId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (userId !== formInfo?.userId) {
    return <div>You are not authorized to edit this form!</div>;
  }

  console.log("session --editForm is ", session);
  console.log("formInfo --editForm is ", formInfo);
  return (
    <main className="relative flex-1 flex items-center justify-center">
      EditForm - {formId}
    </main>
  );
};

export default EditForm;
