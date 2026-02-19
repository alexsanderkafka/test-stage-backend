import { Body, Delete, Get, JsonController, Param, Post, Res, UseBefore } from "routing-controllers";
import SubprocessService from "../service/SubprocessService";
import SubprocessRequestDTO from "../dto/request/SubprocessRequestDTO";
import SubprocessResponseDTO from "../dto/response/SubprocessResponseDTO";
import SecurityFilter from "../middleware/SecurityFilterMiddleware";


@JsonController("/subprocess")
@UseBefore(SecurityFilter)
export default class SubprocessController{

    private subprocessService: SubprocessService = new SubprocessService();
    
    @Post("/:processExternalId")
    async saveNewSubprocess(@Body() body: SubprocessRequestDTO, @Param("processExternalId") processExternalId: string, @Res() res: any): Promise<any>{
        
        await this.subprocessService.saveNewSubprocess(body, processExternalId);

        return res.status(201).send();

    }

    @Delete("/:externalId")
    async deleteSubprocess(@Param("externalId") externalId: string, @Res() res: any): Promise<any>{
        
        await this.subprocessService.deleteSubprocess(externalId)

        return res.status(204).send();
    }


    @Get("/:userExternalId")
    async getAll(@Param("userExternalId") userExternalId: string, @Res() res: any){
        const result: SubprocessResponseDTO[] = await this.subprocessService.getAll(userExternalId);
                
        return res.status(200).json(result);
    }

}