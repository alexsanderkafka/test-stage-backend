import { MySQLDataSource } from "../dataBase";
import AreaRequestDTO from "../dto/request/AreaRequestDTO";
import AreaEntity from "../entity/AreaEntity";
import UserEntity from "../entity/UserEntity";

export default class AreaRepository{

    private ormRepository: any = MySQLDataSource.getRepository(AreaEntity);

    async save(dto: AreaRequestDTO, user: UserEntity): Promise<AreaEntity>{
        const newArea = this.ormRepository.create({
            name: dto.name,
            description: dto.description,
            user: user
        });

        return await this.ormRepository.save(newArea);
    }

    async findAreaByExternalId(externalId: string): Promise<AreaEntity>{
        const area = await this.ormRepository.findOne({
            where: { externalId }
        });

        return area;
    }

    async update(area: AreaEntity, dto: AreaRequestDTO): Promise<AreaEntity>{

        this.ormRepository.merge(area, {
            name: dto.name,
            description: dto.description
        });

        return this.ormRepository.save(area);
    }

    async delete(area: AreaEntity): Promise<void>{
        await this.ormRepository.remove(area);
    }

}