import { MySQLDataSource } from "../dataBase";
import ProcessRequestDTO from "../dto/request/ProcessRequestDTO";
import AreaEntity from "../entity/AreaEntity";
import ProcessEntity from "../entity/ProcessEntity";

export default class ProcessRepository{

    private ormRepository: any = MySQLDataSource.getRepository(ProcessEntity);

    async save(dto: ProcessRequestDTO, area: AreaEntity): Promise<ProcessEntity>{
        const newProcess = this.ormRepository.create({
            name: dto.name,
            type: dto.type,
            description: dto.description,
            area: area
        });
    
        return await this.ormRepository.save(newProcess);
    }
    
    async findProcessByExternalId(externalId: string): Promise<ProcessEntity>{
        const process = await this.ormRepository.findOne({
            where: { externalId }
        });
    
        return process;
    }
    
    async update(process: ProcessEntity, dto: ProcessRequestDTO): Promise<ProcessEntity>{
    
        this.ormRepository.merge(process, {
            name: dto.name,
            type: dto.type,
            description: dto.description
        });
    
        return this.ormRepository.save(process);
    }
    
    async delete(process: ProcessEntity): Promise<void>{
        await this.ormRepository.remove(process);
    }
    
}