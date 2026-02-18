import { MySQLDataSource } from "../dataBase";
import LoginRequestDTO from "../dto/request/LoginRequestDTO";
import RegisterRequestDTO from "../dto/request/RegisterRequestDTO";
import UserEntity from "../entity/UserEntity";


export default class UserRepository {

    private ormRepository: any = MySQLDataSource.getRepository(UserEntity);

    async saveNewUser(dto: RegisterRequestDTO): Promise<UserEntity> {

        const newUser = this.ormRepository.create({
            email: dto.email,
            password: dto.password
        });

        return await this.ormRepository.save(newUser);

    }

    async findUserByEmail(email: string): Promise<UserEntity> {

        return await this.ormRepository.findOne({
            where: {email: email}
        });

    }

}