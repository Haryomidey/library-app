import NewTopic from "../../admin/subjects/NewTopic";
import { useParams } from "react-router-dom";

const NewtTopicContainer = () => {
  const { id } = useParams();

  return (
    <NewTopic
      gradesForTopic={[{ grade_id: 1, grade_name: "JSS1" }]}
      subjectId={Number(id)}
    />
  );
};

export default NewtTopicContainer;
