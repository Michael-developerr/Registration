
import { validateResponse } from "./User";
import { NodeSchemaArray, NodeResponse } from '../components/Node/nodeForApi'


export function getNotes(userId: string): Promise<NodeResponse> {
    return fetch(`/api/notes?userId=${userId}`)
        .then(validateResponse)
        .then((response) => response.json())
        .then(data => NodeSchemaArray.parse(data))
}
