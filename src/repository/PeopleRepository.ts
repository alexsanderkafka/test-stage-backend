import { MySQLDataSource } from "../dataBase";
import PeopleRequestDTO from "../dto/request/PeopleRequestDTO";
import PeopleEntity from "../entity/PeopleEntity";
import ProcessEntity from "../entity/ProcessEntity";

export default class PeopleRepository{

    private ormRepository: any = MySQLDataSource.getRepository(PeopleEntity);
    
    async save(dto: PeopleRequestDTO, process: ProcessEntity){
        const newPeople = this.ormRepository.create({
            name: dto.name,
            process: process
        });
        
        return await this.ormRepository.save(newPeople);
    }

    async findPeopleByExternalId(externalId: string): Promise<PeopleEntity> {
        const people = await this.ormRepository.findOne({
            where: { externalId }
        });
        
        return people;
    }

    async delete(people: PeopleEntity): Promise<void>{
        await this.ormRepository.remove(people);
    }

}