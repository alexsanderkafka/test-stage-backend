import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert } from "typeorm";

import Process from "./ProcessEntity";
import { randomUUID } from "crypto";

@Entity("Subprocess")
export default class SubprocessEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "uuid",
        unique: true,
        nullable: false,
    })
    externalId: string;

    @ManyToOne(() => Process, ( process ) => process.id , { onDelete: "CASCADE" })
    @JoinColumn({ name: "processId" })
    process: Process;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false,
    })
    name: string;

    @Column({
        type: "text",
    })
    description: string;

    constructor(id: number, externalId: string, process: Process, name: string, description: string) {
        this.id = id;
        this.externalId = externalId;
        this.process = process;
        this.name = name;
        this.description = description;
    }

    @BeforeInsert()
    private generateExternalId() {
        this.externalId = randomUUID();
    }
}
