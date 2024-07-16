import { useParams } from "react-router-dom"
import NewTopicTeacher from "./NewTopicTeacher";


const NewTopicContainerTeacher = () => {
    const {id} = useParams();

    return <NewTopicTeacher subjectId={Number(id)} />
}

export default NewTopicContainerTeacher
