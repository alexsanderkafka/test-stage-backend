import { Get, JsonController } from "routing-controllers";

@JsonController("/test")
export default class TestController {

    @Get()
    public async test() {
        return { message: "Hello, World!" };
    }
}