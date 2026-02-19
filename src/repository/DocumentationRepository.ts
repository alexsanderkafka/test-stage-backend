import { MySQLDataSource } from "../dataBase";
import DocumentationRequestDTO from "../dto/request/DocumentationRequestDTO";
import DocumentationEntity from "../entity/DocumentationEntity";
import ProcessEntity from "../entity/ProcessEntity";

export default class PeopleRepository{

    private ormRepository: any = MySQLDataSource.getRepository(DocumentationEntity);

    async save(dto: DocumentationRequestDTO, process: ProcessEntity){
        const newTool = this.ormRepository.create({
            name: dto.name,
            process: process
        });
            
        return await this.ormRepository.save(newTool);
    }

    async findAll(userExternalId: string): Promise<DocumentationEntity[]> {
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

    async findDocumentationByExternalId(externalId: string): Promise<DocumentationEntity> {
        const documentation = await this.ormRepository.findOne({
            where: { externalId }
        });
           
        return documentation;
    }

    async delete(documentation: DocumentationEntity): Promise<void>{
        await this.ormRepository.remove(documentation);
    }
}