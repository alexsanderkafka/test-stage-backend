import AreaResponseDTO from "./AreaResponseDTO";
import DocumentationResponseDTO from "./DocumentationResponseDTO";
import PeopleResponseDTO from "./PeopleResponseDTO";
import SubprocessResponseDTO from "./SubprocessResponseDTO";
import ToolsResponseDTO from "./ToolsResponseDTO";

export default interface ProcessResponseDTO{
    externalId: string;
    name: string;
    type: string;
    description: string;
    area: AreaResponseDTO;
    subprocess?: SubprocessResponseDTO[];
    peoples?: PeopleResponseDTO[];
    tools?: ToolsResponseDTO[];
    documentations?: DocumentationResponseDTO[];
}