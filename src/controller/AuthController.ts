import { Body, JsonController, Post, Res } from "routing-controllers";
import LoginRequestDTO from "../dto/request/LoginRequestDTO";
import AuthService from "../service/AuthService";
import TokenResponseDTO from "../dto/response/TokenResponseDTO";
import RegisterRequestDTO from "../dto/request/RegisterRequestDTO";

@JsonController("/auth")
export default class AuthController {

    private authService: AuthService = new AuthService();

    @Post("/register")
    async register(@Body({ validate: false })body: RegisterRequestDTO, @Res() res: any): Promise<any>{ 

        const result: TokenResponseDTO = await this.authService.register(body);

        return res.status(201).json(result);
    }

    @Post("/login")
    async login(@Body({ validate: false })body: LoginRequestDTO, @Res() res: any){

        const result: TokenResponseDTO = await this.authService.login(body);

        return res.status(200).json(result);
        
    }

}