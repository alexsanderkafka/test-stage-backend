import AreaRequestDTO from "../dto/request/AreaRequestDTO";
import AreaResponseDTO from "../dto/response/AreaResponseDTO";
import AreaEntity from "../entity/AreaEntity";
import UserEntity from "../entity/UserEntity";
import AppError from "../error/AppError";
import AreaMapper from "../mapper/AreaMapper";
import AreaRepository from "../repository/AreaRepository";
import UserRepository from "../repository/UserRepository";

export default class AreaService{
    
    private areaRepository: AreaRepository = new AreaRepository();
    private userRepository: UserRepository = new UserRepository();

    async saveNewArea(dto: AreaRequestDTO, userExternalId: string): Promise<void>{
        const user: UserEntity = await this.userRepository.findUserByExternalId(userExternalId);

        if(!user){
            throw new AppError("Usuário não encontrado", 404);
        }

        await this.areaRepository.save(dto, user);
    }

    async getAll(userExternalId: string): Promise<AreaResponseDTO[]> {

        const user: UserEntity = await this.userRepository.findUserByExternalId(userExternalId);

        if(!user){
            throw new AppError("Usuário não encontrado", 404);
        }

        const areas: AreaEntity[] = await this.areaRepository.findAll(userExternalId);

        return AreaMapper.toResponseDtoList(areas);

    }

    async updateArea(body: AreaRequestDTO, externalId: string): Promise<AreaResponseDTO> {
        
        const currentArea: AreaEntity = await this.areaRepository.findAreaByExternalId(externalId);

        if(!currentArea){
            throw new AppError("Área não encontrada", 404);
        }

        await this.areaRepository.update(currentArea, body);

        console.log(currentArea.processes)

        const response: AreaResponseDTO = {
            externalId: currentArea.externalId,
            name: currentArea.name,
            description: currentArea.description
        }

        return response;
    }

    async deleteArea(externalId: string): Promise<void>{
        const currentArea: AreaEntity = await this.areaRepository.findAreaByExternalId(externalId);

        if(!currentArea){
            throw new AppError("Área não encontrada", 404);
        }

        await this.areaRepository.delete(currentArea);
    }



}