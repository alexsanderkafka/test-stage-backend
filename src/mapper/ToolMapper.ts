import ToolsResponseDTO from "../dto/response/ToolsResponseDTO";
import ToolsEntity from "../entity/ToolsEntity";

export default abstract class ToolMapper{

    static toResponseDto(entity: ToolsEntity): ToolsResponseDTO{

        const dto: ToolsResponseDTO = {
            externalId: entity.externalId,
            name: entity.name
        }

        return dto;

    }

    static toResponseDtoList(entities: ToolsEntity[]): ToolsResponseDTO[] {
        return entities.map(entity => this.toResponseDto(entity));
    }

}