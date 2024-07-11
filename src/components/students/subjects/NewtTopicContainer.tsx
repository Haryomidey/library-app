import NewTopic from "../../admin/subjects/NewTopic"
import { useParams } from "react-router-dom"


const NewtTopicContainer = () => {
    const {id} = useParams();

    return <NewTopic subjectId={Number(id)} />
}

export default NewtTopicContainer
