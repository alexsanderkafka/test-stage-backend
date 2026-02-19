import ProcessResponseDTO from "../dto/response/ProcessResponseDTO";
import PeopleEntity from "../entity/PeopleEntity";
import ProcessEntity from "../entity/ProcessEntity";
import SubprocessEntity from "../entity/SubprocessEntity";
import ToolsEntity from "../entity/ToolsEntity";
import PeopleMapper from "./PeopleMapper";
import SubprocessMapper from "./SubprocessMapper";
import ToolMapper from "./ToolMapper";

export default abstract class ProcessMapper {

    static toResponseDto(entity: ProcessEntity): ProcessResponseDTO{

        const dto: ProcessResponseDTO = {
            externalId: entity.externalId,
            name: entity.name,
            type: entity.type,
            description: entity.description
        }

        if(entity.subprocess){
            dto.subprocess = entity.subprocess.map((sub: SubprocessEntity) => {
                return SubprocessMapper.toResponseDto(sub);
            });
        }

        if(entity.tools){
            dto.tools = entity.tools.map((tool: ToolsEntity) => {
                return ToolMapper.toResponseDto(tool);
            });
        }

        if(entity.peoples){
            dto.peoples = entity.peoples.map((people: PeopleEntity) => {
                return PeopleMapper.toResponseDto(people);
            });
        }

        return dto;
    }

    static toResponseDtoList(entities: ProcessEntity[]): ProcessResponseDTO[] {
        return entities.map(entity => this.toResponseDto(entity));
    }
}