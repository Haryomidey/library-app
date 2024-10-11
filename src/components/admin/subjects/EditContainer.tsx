import React, { useState } from "react";
import EditTopic from "./EditTopic";
import EditSubject, { gradeInterface } from "./EditSubject";

function EditContainer() {
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
        <EditSubject
          contentUpdate={handleContentChange}
          nameUpdate={handleNameChange}
        />
      ) : (
        <EditTopic name={title} />
      )}
    </>
  );
}

export default EditContainer;
