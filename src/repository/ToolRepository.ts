import { MySQLDataSource } from "../dataBase";
import ToolRequestDTO from "../dto/request/ToolRequestDTO";
import ProcessEntity from "../entity/ProcessEntity";
import ToolsEntity from "../entity/ToolsEntity";

export default class ToolRepository{

    private ormRepository: any = MySQLDataSource.getRepository(ToolsEntity);

    async save(dto: ToolRequestDTO, process: ProcessEntity){
        const newTool = this.ormRepository.create({
            name: dto.name,
            process: process
        });
        
        return await this.ormRepository.save(newTool);
    }

    async findAll(userExternalId: string): Promise<ToolsEntity[]> {
        return await this.ormRepository.find({
            where: {
                process: {
                    area: {
                        user: {
                            externalId: userExternalId
                        }
                    }
                }
            }
        });
    }
    
    async findToolByExternalId(externalId: string): Promise<ToolsEntity>{
        const tool = await this.ormRepository.findOne({
            where: { externalId }
        });
        
        return tool;
    }
    
    async delete(tool: ToolsEntity): Promise<void>{
        await this.ormRepository.remove(tool);
    }
}