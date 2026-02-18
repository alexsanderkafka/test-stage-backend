import { Body, Delete, JsonController, Param, Post, Res } from "routing-controllers";
import SubprocessService from "../service/SubprocessService";
import SubprocessRequestDTO from "../dto/request/SubprocessRequestDTO";


@JsonController("/subprocess")
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

}