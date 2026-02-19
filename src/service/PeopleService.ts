import PeopleRequestDTO from "../dto/request/PeopleRequestDTO";
import PeopleResponseDTO from "../dto/response/PeopleResponseDTO";
import PeopleEntity from "../entity/PeopleEntity";
import ProcessEntity from "../entity/ProcessEntity";
import UserEntity from "../entity/UserEntity";
import AppError from "../error/AppError";
import PeopleMapper from "../mapper/PeopleMapper";
import PeopleRepository from "../repository/PeopleRepository";
import ProcessRepository from "../repository/ProcessRepository";
import UserRepository from "../repository/UserRepository";

export default class PeopleService{
    
    private peopleRepository: PeopleRepository = new PeopleRepository();
    private processRepository: ProcessRepository = new ProcessRepository();
    private userRepository: UserRepository = new UserRepository();


    async saveNewPeople(dto: PeopleRequestDTO, processExternalId: string): Promise<void>{
        const process: ProcessEntity = await this.processRepository.findProcessByExternalId(processExternalId);
        
        if(!process){
            throw new AppError("Processo não encontrado", 404);
        }

        await this.peopleRepository.save(dto, process);
    }

    async getAll(userExternalId: string): Promise<PeopleResponseDTO[]> {

        const user: UserEntity = await this.userRepository.findUserByExternalId(userExternalId);
        
        if(!user){
            throw new AppError("Usuário não encontrado", 404);
        }
        
        const peoples: PeopleEntity[] = await this.peopleRepository.findAll(userExternalId);

        return PeopleMapper.toResponseDtoList(peoples);
    }

    async deletePeople(externalId: string): Promise<void>{
        const people: PeopleEntity = await this.peopleRepository.findPeopleByExternalId(externalId);

        if(!people){
            throw new AppError("Pessoa não encontrada", 404);
        }

        await this.peopleRepository.delete(people);
    }


}