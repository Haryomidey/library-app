import React, { useState } from "react";
import NewTopic from "./NewTopic";
import NewSubject from "./NewSubject";

function AddContainer() {
  const [content, setContent] = useState("subject");
  const [subjectId, setSubjectId] = useState(0);
  const handleContentChange = (form: string) => {
    setContent(form);
  };
  const handleSubjectIdChange = (id: number) => {
    setSubjectId(id);
  };
  
  return (
    <>
      {content === "subject" ? (
        <NewSubject
          contentUpdate={handleContentChange}
          idUpdate={handleSubjectIdChange}
        />
      ) : (
        <NewTopic subjectId={subjectId} />
      )}
    </>
  );
}

export default AddContainer;
