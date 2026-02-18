import { randomUUID } from "crypto";
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";

@Entity("User")
export default class User {

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
        unique: true,
        nullable: false,
    })
    email: string;

    @Column({
        type: "text",
        nullable: false,
    })
    password: string;

    constructor(id: number, externalId: string, email: string, password: string) {
        this.id = id;
        this.externalId = externalId;
        this.email = email;
        this.password = password;
    }

    @BeforeInsert()
    private generateExternalId() {
        this.externalId = randomUUID();
    }
}