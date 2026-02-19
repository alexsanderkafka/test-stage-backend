import ToolRequestDTO from "../dto/request/ToolRequestDTO";
import ToolsResponseDTO from "../dto/response/ToolsResponseDTO";
import ProcessEntity from "../entity/ProcessEntity";
import ToolsEntity from "../entity/ToolsEntity";
import UserEntity from "../entity/UserEntity";
import AppError from "../error/AppError";
import ToolMapper from "../mapper/ToolMapper";
import ProcessRepository from "../repository/ProcessRepository";
import ToolRepository from "../repository/ToolRepository";
import UserRepository from "../repository/UserRepository";

export default class ToolService{

    private toolRepository: ToolRepository = new ToolRepository();
    private processRepository: ProcessRepository = new ProcessRepository();
    private userRepository: UserRepository = new UserRepository();

    async saveNewTool(dto: ToolRequestDTO, processExternalId: string): Promise<void>{
    
        const process: ProcessEntity = await this.processRepository.findProcessByExternalId(processExternalId);
    
        if(!process){
            throw new AppError("Processo não encontrado", 404);
        }
    
        await this.toolRepository.save(dto, process);
    
    }

    async getAll(userExternalId: string): Promise<ToolsResponseDTO[]> {
        const user: UserEntity = await this.userRepository.findUserByExternalId(userExternalId);

        if(!user){
            throw new AppError("Usuário não encontrado", 404);
        }

        const tools: ToolsEntity[] = await this.toolRepository.findAll(userExternalId);
        
        return ToolMapper.toResponseDtoList(tools);
    }
    
    async deleteTool(externalId: string): Promise<void>{
            
        const tool: ToolsEntity = await this.toolRepository.findToolByExternalId(externalId);
    
        if(!tool){
            throw new AppError("Ferramenta não encontrada", 404);
        }
    
        this.toolRepository.delete(tool);
    
    }

}