import { Body, Delete, Get, JsonController, Param, Post, Res } from "routing-controllers";
import ToolRequestDTO from "../dto/request/ToolRequestDTO";
import ToolService from "../service/ToolService";
import ToolsResponseDTO from "../dto/response/ToolsResponseDTO";

@JsonController("/tool")
export default class ToolController{

    private toolService: ToolService = new ToolService();
    
    @Post("/:processExternalId")
    async saveNewTool(@Body() body: ToolRequestDTO, @Param("processExternalId") processExternalId: string, @Res() res: any): Promise<any>{
        
        await this.toolService.saveNewTool(body, processExternalId);

        return res.status(201).send();

    }

    @Delete("/:externalId")
    async deleteTool(@Param("externalId") externalId: string, @Res() res: any): Promise<any>{
        
        await this.toolService.deleteTool(externalId)

        return res.status(204).send();
    }

    @Get("/:userExternalId")
    async getAll(@Param("userExternalId") userExternalId: string, @Res() res: any){
        const result: ToolsResponseDTO[] = await this.toolService.getAll(userExternalId);
                    
        return res.status(200).json(result);
    }

}