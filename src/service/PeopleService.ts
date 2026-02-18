import PeopleRequestDTO from "../dto/request/PeopleRequestDTO";
import PeopleEntity from "../entity/PeopleEntity";
import ProcessEntity from "../entity/ProcessEntity";
import AppError from "../error/AppError";
import PeopleRepository from "../repository/PeopleRepository";
import ProcessRepository from "../repository/ProcessRepository";

export default class PeopleService{
    
    private peopleRepository: PeopleRepository = new PeopleRepository();
    private processRepository: ProcessRepository = new ProcessRepository();


    async saveNewPeople(dto: PeopleRequestDTO, processExternalId: string): Promise<void>{
        const process: ProcessEntity = await this.processRepository.findProcessByExternalId(processExternalId);
        
        if(!process){
            throw new AppError("Processo não encontrado", 404);
        }

        await this.peopleRepository.save(dto, process);
    }

    async deletePeople(externalId: string): Promise<void>{
        const people: PeopleEntity = await this.peopleRepository.findPeopleByExternalId(externalId);

        if(!people){
            throw new AppError("Pessoa não encontrada", 404);
        }

        await this.peopleRepository.delete(people);
    }


}