import React, { useState } from "react";
import NewTopicTeacher from "./NewTopicTeacher";
import NewSubjectTeacher from "./NewSubjectTeacher";
import { gradeInterface } from "./EditSubjectTeacher";

function AddContainerTeacher() {
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
        <NewSubjectTeacher
          contentUpdate={handleContentChange}
          idUpdate={handleSubjectIdChange}
          gradesUpdate={handleGradesChange}
        />
      ) : (
        <NewTopicTeacher subjectId={subjectId} gradesForTopic={grades} />
      )}
    </>
  );
}

export default AddContainerTeacher;
