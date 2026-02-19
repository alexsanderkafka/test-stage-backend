import PeopleResponseDTO from "../dto/response/PeopleResponseDTO";
import PeopleEntity from "../entity/PeopleEntity";

export default abstract class PeopleMapper{

    static toResponseDto(entity: PeopleEntity): PeopleResponseDTO{

        const dto: PeopleResponseDTO = {
            externalId: entity.externalId,
            name: entity.name
        }

        return dto;
        
    }

    static toResponseDtoList(entities: PeopleEntity[]): PeopleResponseDTO[] {
        return entities.map(entity => this.toResponseDto(entity));
    }

}