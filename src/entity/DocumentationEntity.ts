import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Process from "./ProcessEntity";
import { randomUUID } from "crypto";

@Entity("Documentation")
export default class DocumentationEntity {

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
        type: "text",
        nullable: false,
    })
    url: string;
        
    constructor(id: number, externalId: string, process: Process, url: string) {
        this.id = id;
        this.externalId = externalId;
        this.process = process;
        this.url = url;
    }

    @BeforeInsert()
    private generateExternalId() {
        this.externalId = randomUUID();
    }

}