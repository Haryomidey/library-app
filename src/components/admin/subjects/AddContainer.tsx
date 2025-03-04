import React from "react";
import NewTopic from "./NewTopic";
import NewSubject from "./NewSubject";

function AddContainer({ content }: { content: string }) {
  return (
    <>
      {content === "subject" && <NewSubject />}
      {content === "topic" && <NewTopic />}
    </>
  );
}

export default AddContainer;
