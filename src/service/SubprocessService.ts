import SubprocessRequestDTO from "../dto/request/SubprocessRequestDTO";
import ProcessRepository from "../repository/ProcessRepository";
import SubprocessRepository from "../repository/SubprocessRepository";
import AppError from "../error/AppError";
import SubprocessEntity from "../entity/SubprocessEntity";
import ProcessEntity from "../entity/ProcessEntity";
import UserEntity from "../entity/UserEntity";
import SubprocessResponseDTO from "../dto/response/SubprocessResponseDTO";
import UserRepository from "../repository/UserRepository";
import SubprocessMapper from "../mapper/SubprocessMapper";

export default class SubprocessService{
    
    private subprocessRepository: SubprocessRepository = new SubprocessRepository();
    private processRepository: ProcessRepository = new ProcessRepository();
    private userRepository: UserRepository = new UserRepository();


    async saveNewSubprocess(dto: SubprocessRequestDTO, processExternalId: string): Promise<void>{

        const process: ProcessEntity = await this.processRepository.findProcessByExternalId(processExternalId);

        if(!process){
            throw new AppError("Processo não encontrado", 404);
        }

        await this.subprocessRepository.save(dto, process);

    }

    async getAll(userExternalId: string): Promise<SubprocessResponseDTO[]>{
        const user: UserEntity = await this.userRepository.findUserByExternalId(userExternalId);
                
        if(!user){
            throw new AppError("Usuário não encontrado", 404);
        }
        
        const subprocesses: SubprocessEntity[] = await this.subprocessRepository.findAll(userExternalId);

        return SubprocessMapper.toResponseDtoList(subprocesses);
    }

    async deleteSubprocess(externalId: string): Promise<void>{
        
        const subprocess: SubprocessEntity = await this.subprocessRepository.findSubprocessByExternalId(externalId);

        if(!subprocess){
            throw new AppError("Subprocesso não encontrado", 404);
        }

        this.subprocessRepository.delete(subprocess);

    }

}