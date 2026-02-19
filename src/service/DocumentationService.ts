import DocumentationRequestDTO from "../dto/request/DocumentationRequestDTO";
import DocumentationResponseDTO from "../dto/response/DocumentationResponseDTO";
import DocumentationEntity from "../entity/DocumentationEntity";
import ProcessEntity from "../entity/ProcessEntity";
import UserEntity from "../entity/UserEntity";
import AppError from "../error/AppError";
import DocumentationMapper from "../mapper/DocumentationMapper";
import DocumentationRepository from "../repository/DocumentationRepository";
import ProcessRepository from "../repository/ProcessRepository";
import UserRepository from "../repository/UserRepository";

export default class DocumentationService{

    private documentationRepository: DocumentationRepository = new DocumentationRepository();
    private processRepository: ProcessRepository = new ProcessRepository();
    private userRepository: UserRepository = new UserRepository();


    async saveNewDocumentation(dto: DocumentationRequestDTO, processExternalId: string) {
        const process: ProcessEntity = await this.processRepository.findProcessByExternalId(processExternalId);
        
        if(!process){
            throw new AppError("Processo não encontrado", 404);
        }

        await this.documentationRepository.save(dto, process);
    }

    async getAll(userExternalId: string): Promise<DocumentationResponseDTO[]> {
    
        const user: UserEntity = await this.userRepository.findUserByExternalId(userExternalId);
            
        if(!user){
            throw new AppError("Usuário não encontrado", 404);
        }
            
        const documentations: DocumentationEntity[] = await this.documentationRepository.findAll(userExternalId);
    
        return DocumentationMapper.toResponseDtoList(documentations);
    }

    async deleteDocumentation(externalId: string): Promise<void>{
        const documentation: DocumentationEntity = await this.documentationRepository.findDocumentationByExternalId(externalId);
    
        if(!documentation){
            throw new AppError("Pessoa não encontrada", 404);
        }
    
        await this.documentationRepository.delete(documentation);
    }

}