import React from "react";
import EditTopic from "./EditTopic";
import EditSubject from "./EditSubject";

function EditContainer({ content }: { content: string }) {

  return (
    <>
      {content === "subject" && <EditSubject />}
      {content === "topic" && <EditTopic />}
    </>
  );
}

export default EditContainer;
