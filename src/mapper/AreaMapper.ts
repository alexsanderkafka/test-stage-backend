import AreaResponseDTO from "../dto/response/AreaResponseDTO";
import AreaEntity from "../entity/AreaEntity";
import ProcessEntity from "../entity/ProcessEntity";
import ProcessMapper from "./ProcessMapper";

export default abstract class AreaMapper{

    static toResponseDto(entity: AreaEntity): AreaResponseDTO{

        const dto: AreaResponseDTO = {
            externalId: entity.externalId,
            name: entity.name,
            description: entity.description,
        }

        if(entity.processes){
            dto.processes = entity.processes.map((process: ProcessEntity) => {
                return ProcessMapper.toResponseDto(process);
            })
        }

        return dto;
    }

    static toResponseDtoList(entities: AreaEntity[]): AreaResponseDTO[] {
        return entities.map(entity => this.toResponseDto(entity));
    }

}