import PeopleResponseDTO from "./PeopleResponseDTO";
import SubprocessResponseDTO from "./SubprocessResponseDTO";
import ToolsResponseDTO from "./ToolsResponseDTO";

export default interface ProcessResponseDTO{
    externalId: string;
    name: string;
    type: string;
    description: string;
    subprocess?: SubprocessResponseDTO[];
    peoples?: PeopleResponseDTO[];
    tools?: ToolsResponseDTO[];
}