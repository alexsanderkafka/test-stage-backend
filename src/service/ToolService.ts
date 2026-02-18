import ToolRequestDTO from "../dto/request/ToolRequestDTO";
import ProcessEntity from "../entity/ProcessEntity";
import ToolsEntity from "../entity/ToolsEntity";
import AppError from "../error/AppError";
import ProcessRepository from "../repository/ProcessRepository";
import ToolRepository from "../repository/ToolRepository";

export default class ToolService{

    private toolRepository: ToolRepository = new ToolRepository();
    private processRepository: ProcessRepository = new ProcessRepository();

    async saveNewTool(dto: ToolRequestDTO, processExternalId: string): Promise<void>{
    
        const process: ProcessEntity = await this.processRepository.findProcessByExternalId(processExternalId);
    
        if(!process){
            throw new AppError("Processo não encontrado", 404);
        }
    
        await this.toolRepository.save(dto, process);
    
    }
    
    async deleteTool(externalId: string): Promise<void>{
            
        const tool: ToolsEntity = await this.toolRepository.findToolByExternalId(externalId);
    
        if(!tool){
            throw new AppError("Ferramenta não encontrada", 404);
        }
    
        this.toolRepository.delete(tool);
    
    }

}