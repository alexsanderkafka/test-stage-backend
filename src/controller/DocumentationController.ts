import { Body, Delete, Get, JsonController, Param, Post, Res, UseBefore } from "routing-controllers";
import SecurityFilter from "../middleware/SecurityFilterMiddleware";
import DocumentationService from "../service/DocumentationService";
import DocumentationRequestDTO from "../dto/request/DocumentationRequestDTO";
import DocumentationResponseDTO from "../dto/response/DocumentationResponseDTO";

@JsonController("/documentation")
@UseBefore(SecurityFilter)
export default class DocumentationController{
    
    private documentationService: DocumentationService = new DocumentationService();

    @Post("/:processExternalId")
    async saveNewDocumentation(@Body() body: DocumentationRequestDTO, @Param("processExternalId") processExternalId: string, @Res() res: any): Promise<any>{
            
        await this.documentationService.saveNewDocumentation(body, processExternalId);
    
        return res.status(201).send();    
    }

    @Delete("/:externalId")
    async deleteDocumentation(@Param("externalId") externalId: string, @Res() res: any): Promise<any>{
                
        await this.documentationService.deleteDocumentation(externalId)
        
        return res.status(204).send();
    }

    @Get("/:userExternalId")
    async getAll(@Param("userExternalId") userExternalId: string, @Res() res: any){
        const result: DocumentationResponseDTO[] = await this.documentationService.getAll(userExternalId);
            
        return res.status(200).json(result);
    }

}