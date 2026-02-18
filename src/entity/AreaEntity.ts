import { randomUUID } from "crypto";
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";

@Entity("Area")
export default class AreaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "uuid",
        unique: true,
        nullable: false,
    })
    externalId: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false,
    })
    name: string;

    @Column({
        type: "text",
        nullable: false,
    })
    description: string;

    constructor(id: number, externalId: string, name: string, description: string) {
        this.id = id;
        this.externalId = externalId;
        this.name = name;
        this.description = description;
    }

    @BeforeInsert()
    private generateExternalId() {
        this.externalId = randomUUID();
    }
}
