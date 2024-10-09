import React, { useState } from "react";
import EditTopic from "./EditTopic";
import EditSubject, { gradeInterface } from "./EditSubject";

function EditContainer() {
  const [content, setContent] = useState("subject");
  const [grades, setGrades] = useState<gradeInterface[]>([]);

  const handleContentChange = (form: string) => {
    setContent(form);
  };

  const handleGradeChange = (grade: gradeInterface[]) => {
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
        <EditTopic />
      )}
    </>
  );
}

export default EditContainer;
