import { randomUUID } from "crypto";
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from "typeorm";
import AreaEntity from "./AreaEntity";

@Entity("User")
export default class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "uuid",
        unique: true,
        nullable: false,
    })
    externalId!: string;

    @Column({
        type: "varchar",
        length: 100,
        unique: true,
        nullable: false,
    })
    email: string;

    @Column({
        type: "text",
        nullable: false,
    })
    password: string;

    @OneToMany(() => AreaEntity, area => area.user)
    areas!: AreaEntity[];

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    @BeforeInsert()
    private generateExternalId() {
        this.externalId = randomUUID();
    }
}