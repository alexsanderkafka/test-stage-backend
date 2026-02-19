import { Body, Delete, Get, JsonController, Param, Post, Put, Res } from "routing-controllers";
import AreaService from "../service/AreaService";
import AreaRequestDTO from "../dto/request/AreaRequestDTO";
import AreaResponseDTO from "../dto/response/AreaResponseDTO";

@JsonController("/area")
export default class AreaController {

    private areaService: AreaService = new AreaService();

    @Post("/:userExternalId")
    async saveNewArea(@Body() body: AreaRequestDTO, @Param("userExternalId") userExternalId: string, @Res() res: any): Promise<any>{

        await this.areaService.saveNewArea(body, userExternalId);

        return res.status(201).send();

    }

    @Put("/:externalId")
    async updateArea(@Body() body: AreaRequestDTO, @Param("externalId") externalId: string, @Res() res: any): Promise<any>{

        const result: AreaResponseDTO = await this.areaService.updateArea(body, externalId);

        return res.status(200).json(result);

    }

    @Delete("/:externalId")
    async deleteArea(@Param("externalId") externalId: string, @Res() res: any): Promise<any>{

        await this.areaService.deleteArea(externalId);

        return res.status(204).send();
    }

    @Get("/:userExternalId")
    async getAll(@Param("userExternalId") userExternalId: string, @Res() res: any): Promise<any>{
        
        const result: AreaResponseDTO[] = await this.areaService.getAll(userExternalId);

        return res.status(200).json(result);
        
    }
    
    
}