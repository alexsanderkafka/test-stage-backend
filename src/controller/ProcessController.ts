import { Body, Delete, JsonController, Param, Post, Put, Res, UseBefore } from "routing-controllers";
import ProcessRequestDTO from "../dto/request/ProcessRequestDTO";
import ProcessService from "../service/ProcessService";
import ProcessResponseDTO from "../dto/response/ProcessResponseDTO";
import SecurityFilter from "../middleware/SecurityFilterMiddleware";

@JsonController("/process")
@UseBefore(SecurityFilter)
export default class ProcessController {

    private processService: ProcessService = new ProcessService();

    @Post("/:areaExternalId")
    async saveNewProcess(@Body() body: ProcessRequestDTO, @Param("areaExternalId") areaExternalId: string, @Res() res: any): Promise<any>{

        await this.processService.saveNewProcess(body, areaExternalId);

        return res.status(201).send();

    }

    @Put("/:externalId")
    async updateProcess(@Body() body: ProcessRequestDTO, @Param("externalId") externalId: string, @Res() res: any): Promise<any>{

        const result: ProcessResponseDTO = await this.processService.updateProcess(body, externalId);

        return res.status(200).json(result);

    }

    @Delete("/:externalId")
    async deleteProcess(@Param("externalId") externalId: string, @Res() res: any): Promise<any>{

        await this.processService.deleteProcess(externalId);

        return res.status(204).send();
    }
}