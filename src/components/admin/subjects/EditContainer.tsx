import React, { useState } from "react";
import EditTopic from "./EditTopic";
import EditSubject, { gradeInterface } from "./EditSubject";

function EditContainer() {
  const [content, setContent] = useState("topic");
  const [grades, setGrades] = useState<gradeInterface[] | null>(null);

  const handleContentChange = (form: string) => {
    setContent(form);
  };

  const handleGradeChange = (grade: gradeInterface[] | null) => {
    setGrades(grade);
  };
  return (
    <>
      {content === "subject" ? (
        <EditSubject
          contentUpdate={handleContentChange}
          gradeUpdate={handleGradeChange}
        />
      ) : (
        <EditTopic gradesProp={grades} />
      )}
    </>
  );
}

export default EditContainer;
