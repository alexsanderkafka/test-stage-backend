import { Body, Delete, Get, JsonController, Param, Post, Res } from "routing-controllers";
import PeopleService from "../service/PeopleService";
import PeopleRequestDTO from "../dto/request/PeopleRequestDTO";
import PeopleResponseDTO from "../dto/response/PeopleResponseDTO";

@JsonController("/people")
export default class PeopleController{

    private peopleService: PeopleService = new PeopleService();

    @Post("/:processExternalId")
    async saveNewPeople(@Body() body: PeopleRequestDTO, @Param("processExternalId") processExternalId: string, @Res() res: any): Promise<any>{
            
        await this.peopleService.saveNewPeople(body, processExternalId);
    
        return res.status(201).send();
    
    }

    @Delete("/:externalId")
    async deleteSubprocess(@Param("externalId") externalId: string, @Res() res: any): Promise<any>{
            
        await this.peopleService.deletePeople(externalId)
    
        return res.status(204).send();
    }

    @Get("/:userExternalId")
    async getAll(@Param("userExternalId") userExternalId: string, @Res() res: any){
        const result: PeopleResponseDTO[] = await this.peopleService.getAll(userExternalId);
        
        return res.status(200).json(result);
    }


}