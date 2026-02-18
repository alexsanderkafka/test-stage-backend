import { Body, Delete, JsonController, Param, Post, Res } from "routing-controllers";
import PeopleService from "../service/PeopleService";
import PeopleRequestDTO from "../dto/request/PeopleRequestDTO";

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


}