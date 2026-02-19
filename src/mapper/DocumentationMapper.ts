import DocumentationResponseDTO from "../dto/response/DocumentationResponseDTO";
import ToolsResponseDTO from "../dto/response/ToolsResponseDTO";
import DocumentationEntity from "../entity/DocumentationEntity";
import ToolsEntity from "../entity/ToolsEntity";

export default abstract class DocumentationMapper{

    static toResponseDto(entity: DocumentationEntity): DocumentationResponseDTO{

        const dto: DocumentationResponseDTO = {
            externalId: entity.externalId,
            name: entity.name
        }

        return dto;

    }

    static toResponseDtoList(entities: DocumentationEntity[]): DocumentationResponseDTO[] {
        return entities.map(entity => this.toResponseDto(entity));
    }

}