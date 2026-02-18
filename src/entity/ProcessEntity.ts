import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert } from "typeorm";

import Area from "./AreaEntity";
import { randomUUID } from "crypto";

@Entity("Process")
export default class ProcessEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "uuid",
        unique: true,
        nullable: false,
    })
    externalId: string;

    @ManyToOne(() => Area, ( area ) => area.id , { onDelete: "CASCADE" })
    @JoinColumn({ name: "areaId" })
    area: Area;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false,
    })
    name: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false,
    })
    type: string;

    @Column({
        type: "text",
        nullable: false,
    })
    description: string;

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        nullable: true,
    })
    positionX: number;

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        nullable: true,
    })
    positionY: number;

    constructor(id: number, externalId: string, area: Area, name: string, type: string, description: string, positionX: number, positionY: number) {
        this.id = id;
        this.externalId = externalId;
        this.area = area;
        this.name = name;
        this.type = type;
        this.description = description;
        this.positionX = positionX;
        this.positionY = positionY;
    }

    @BeforeInsert()
    private generateExternalId() {
        this.externalId = randomUUID();
    }
}
