import ProcessRequestDTO from "../dto/request/ProcessRequestDTO";
import ProcessResponseDTO from "../dto/response/ProcessResponseDTO";
import AreaEntity from "../entity/AreaEntity";
import ProcessEntity from "../entity/ProcessEntity";
import AppError from "../error/AppError";
import AreaRepository from "../repository/AreaRepository";
import ProcessRepository from "../repository/ProcessRepository";

export default class ProcessService{

    private areaRepository: AreaRepository = new AreaRepository();
    private processRepository: ProcessRepository = new ProcessRepository();

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
        
        await this.processRepository.update(currentProcess, body);
        
        const response: ProcessResponseDTO = {
            externalId: currentProcess.externalId,
            name: currentProcess.name,
            type: currentProcess.type,
            description: currentProcess.description
        }
        
        return response;
    }

    async deleteProcess(externalId: string): Promise<void>{
        const currentProcess: ProcessEntity = await this.processRepository.findProcessByExternalId(externalId);
        
        if(!currentProcess){
            throw new AppError("Processo não encontrado", 404);
        }

        await this.processRepository.delete(currentProcess);
    }
}