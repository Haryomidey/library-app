import React, { useState } from "react";
import EditTopicTeacher from "./EditTopicTeacher";
import EditSubjectTeacher from "./EditSubjectTeacher";

function EditContainerTeacher() {
  const [content, setContent] = useState("subject");
  const [title, setTitle] = useState<string>("");

  const handleContentChange = (form: string) => {
    setContent(form);
  };

  const handleNameChange = (name: string) => {
    setTitle(name);
  };
  return (
    <>
      {content === "subject" ? (
        <EditSubjectTeacher
          contentUpdate={handleContentChange}
          nameUpdate={handleNameChange}
        />
      ) : (
        <EditTopicTeacher name={title} />
      )}
    </>
  );
}

export default EditContainerTeacher;
