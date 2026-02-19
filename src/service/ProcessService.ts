import ProcessRequestDTO from "../dto/request/ProcessRequestDTO";
import ProcessResponseDTO from "../dto/response/ProcessResponseDTO";
import AreaEntity from "../entity/AreaEntity";
import ProcessEntity from "../entity/ProcessEntity";
import UserEntity from "../entity/UserEntity";
import AppError from "../error/AppError";
import ProcessMapper from "../mapper/ProcessMapper";
import AreaRepository from "../repository/AreaRepository";
import ProcessRepository from "../repository/ProcessRepository";
import UserRepository from "../repository/UserRepository";

export default class ProcessService{

    private areaRepository: AreaRepository = new AreaRepository();
    private processRepository: ProcessRepository = new ProcessRepository();
    private userRepository: UserRepository = new UserRepository();

    async saveNewProcess(dto: ProcessRequestDTO, areaExternalId: string): Promise<void>{
        const area: AreaEntity = await this.areaRepository.findAreaByExternalId(areaExternalId);
        
        if(!area){
            throw new AppError("Área não encontrada", 404);
        }
        
        await this.processRepository.save(dto, area);
    }

    async updateProcess(body: ProcessRequestDTO, externalId: string): Promise<ProcessResponseDTO> {
        const currentProcess: ProcessEntity = await this.processRepository.findProcessByExternalId(externalId);
        
        if(!currentProcess){
            throw new AppError("Processo não encontrado", 404);
        }
        
        const updatedProcess: ProcessEntity = await this.processRepository.update(currentProcess, body);

        const response: ProcessResponseDTO = ProcessMapper.toResponseDto(updatedProcess);
        
        return response;
    }

    async deleteProcess(externalId: string): Promise<void>{
        const currentProcess: ProcessEntity = await this.processRepository.findProcessByExternalId(externalId);
        
        if(!currentProcess){
            throw new AppError("Processo não encontrado", 404);
        }

        await this.processRepository.delete(currentProcess);
    }

    async getAll(userExternalId: string): Promise<ProcessResponseDTO[]> {
        const user: UserEntity = await this.userRepository.findUserByExternalId(userExternalId);
                        
        if(!user){
            throw new AppError("Usuário não encontrado", 404);
        }
                
        const processes: ProcessEntity[] = await this.processRepository.findAll(userExternalId);
        
        return ProcessMapper.toResponseDtoList(processes);
    }
}