import { MySQLDataSource } from "../dataBase";
import SubprocessEntity from "../entity/SubprocessEntity";
import SubprocessRequestDTO from "../dto/request/SubprocessRequestDTO"
import ProcessEntity from "../entity/ProcessEntity"

export default class SubprocessRepository{

    private ormRepository: any = MySQLDataSource.getRepository(SubprocessEntity);

    async save(dto: SubprocessRequestDTO, process: ProcessEntity){
        const newSubprocess = this.ormRepository.create({
            name: dto.name,
            process: process
        });
    
        return await this.ormRepository.save(newSubprocess);
    }

    async findAll(userExternalId: string): Promise<SubprocessEntity[]> {
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

    async findSubprocessByExternalId(externalId: string): Promise<SubprocessEntity>{
        const subprocess = await this.ormRepository.findOne({
            where: { externalId }
        });
    
        return subprocess;
    }

    async delete(subprocess: SubprocessEntity): Promise<void>{
        await this.ormRepository.remove(subprocess);
    }

    
}