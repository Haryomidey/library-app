import React, { useState } from "react";
import NewTopic from "./NewTopic";
import NewSubject from "./NewSubject";
import { gradeInterface } from "./EditSubject";

function AddContainer() {
  const [content, setContent] = useState("subject");
  const [grades, setGrades] = useState<gradeInterface[]>([]);
  const [subjectId, setSubjectId] = useState(0);
  const handleContentChange = (form: string) => {
    setContent(form);
  };
  const handleSubjectIdChange = (id: number) => {
    setSubjectId(id);
  };
  const handleGradesChange = (selectedGrades: gradeInterface[]) => {
    setGrades(selectedGrades);
  };

  return (
    <>
      {content === "subject" ? (
        <NewSubject
          contentUpdate={handleContentChange}
          idUpdate={handleSubjectIdChange}
          gradesUpdate={handleGradesChange}
        />
      ) : (
        <NewTopic subjectId={subjectId} gradesForTopic={grades} />
      )}
    </>
  );
}

export default AddContainer;
