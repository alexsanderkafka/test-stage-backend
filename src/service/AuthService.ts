import { NotFoundError } from "routing-controllers";
import LoginRequestDTO from "../dto/request/LoginRequestDTO";
import RegisterRequestDTO from "../dto/request/RegisterRequestDTO";
import TokenResponseDTO from "../dto/response/TokenResponseDTO";
import UserEntity from "../entity/UserEntity";
import UserRepository from "../repository/UserRepository";
import Password from "../security/Password";
import TokenJWT from "../security/TokenJWT";
import AppError from "../error/AppError";

export default class AuthService{

    private userRepository: UserRepository = new UserRepository();

    async register(dto: RegisterRequestDTO): Promise<TokenResponseDTO>{
        const user: UserEntity = await this.userRepository.findUserByEmail(dto.email);

        if(user){
            throw new AppError("E-mail já cadastrado", 409);
        }

        if(dto.email !== dto.confirmEmail){
            throw new AppError("E-mail não confere", 409);
        }

        if(dto.password !== dto.confirmPassword){
            throw new AppError("As senhas não conferem", 401);
        }

        dto.password = await Password.encode(dto.password);

        const savedUser: UserEntity = await this.userRepository.saveNewUser(dto);

        const jwt: string = TokenJWT.generateToken(savedUser.email);
        const refreshToken: string = TokenJWT.generateRefreshToken(savedUser.email);

        const response: TokenResponseDTO  = {
            userExternalId: savedUser.externalId,
            email: savedUser.email,
            authenticated: true,
            accessToken: jwt,
            refreshToken: refreshToken
        }

        return response;
    }

    async login(body: LoginRequestDTO): Promise<TokenResponseDTO> {
        
        const user: UserEntity = await this.userRepository.findUserByEmail(body.email);

        if(!user){
            throw new AppError("E-mail não encontrado", 404);
        }

        const passwordMatch: boolean = await Password.comparePassword(body.password, user.password);

        if(!passwordMatch){
            throw new AppError("Senha inválida", 401);
        }

        const jwt: string = TokenJWT.generateToken(user.email);
        const refreshToken: string = TokenJWT.generateRefreshToken(user.email);

        const response: TokenResponseDTO  = {
            userExternalId: user.externalId,
            email: user.email,
            authenticated: true,
            accessToken: jwt,
            refreshToken: refreshToken
        }

        return response;
    }

}