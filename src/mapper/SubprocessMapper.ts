import SubprocessResponseDTO from "../dto/response/SubprocessResponseDTO";
import SubprocessEntity from "../entity/SubprocessEntity";

export default abstract class SubprocessMapper{

    static toResponseDto(entity: SubprocessEntity): SubprocessResponseDTO{

        const dto: SubprocessResponseDTO = {
            externalId: entity.externalId,
            name: entity.name
        }

        return dto;
        
    }

    static toResponseDtoList(entities: SubprocessEntity[]): SubprocessResponseDTO[] {
        return entities.map(entity => this.toResponseDto(entity));
    }

}