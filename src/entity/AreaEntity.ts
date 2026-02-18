import { randomUUID } from "crypto";
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import User from "./UserEntity";
import SubprocessEntity from "./SubprocessEntity";
import ProcessEntity from "./ProcessEntity";

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

    @ManyToOne(() => User, ( user ) => user.id , { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" })
    user: User;

    @OneToMany(() => ProcessEntity, process => process.area)
    process!: ProcessEntity[];

    constructor(id: number, externalId: string, name: string, description: string, user: User) {
        this.id = id;
        this.externalId = externalId;
        this.name = name;
        this.description = description;
        this.user = user;
    }

    @BeforeInsert()
    private generateExternalId() {
        this.externalId = randomUUID();
    }
}
