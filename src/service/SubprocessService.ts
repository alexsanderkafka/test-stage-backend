import SubprocessRequestDTO from "../dto/request/SubprocessRequestDTO";
import ProcessRepository from "../repository/ProcessRepository";
import SubprocessRepository from "../repository/SubprocessRepository";
import AppError from "../error/AppError";
import SubprocessEntity from "../entity/SubprocessEntity";

export default class SubprocessService{
    
    private subprocessRepository: SubprocessRepository = new SubprocessRepository();
    private processRepository: ProcessRepository = new ProcessRepository();


    async saveNewSubprocess(dto: SubprocessRequestDTO, processExternalId: string): Promise<void>{

        const process = await this.processRepository.findProcessByExternalId(processExternalId);

        if(!process){
            throw new AppError("Processo não encontrado", 404);
        }

        await this.subprocessRepository.save(dto, process);

    }

    async deleteSubprocess(externalId: string): Promise<void>{
        
        const subprocess: SubprocessEntity = await this.subprocessRepository.findSubprocessByExternalId(externalId);

        if(!subprocess){
            throw new AppError("Subprocesso não encontrado", 404);
        }

        this.subprocessRepository.delete(subprocess);

    }

}