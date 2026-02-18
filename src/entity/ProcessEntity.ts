import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert, OneToMany } from "typeorm";

import Area from "./AreaEntity";
import { randomUUID } from "crypto";
import SubprocessEntity from "./SubprocessEntity";
import PeopleEntity from "./PeopleEntity";
import ToolsEntity from "./ToolsEntity";
import DocumentationEntity from "./DocumentationEntity";

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

    @OneToMany(() => SubprocessEntity, subprocess => subprocess.process)
    subprocess!: SubprocessEntity[];

    @OneToMany(() => PeopleEntity, people => people.process)
    peoples!: PeopleEntity[];

    @OneToMany(() => ToolsEntity, tool => tool.process)
    tools!: ToolsEntity[];

    @OneToMany(() => DocumentationEntity, documentation => documentation.process)
    documentations!: DocumentationEntity[];

    constructor(id: number, externalId: string, area: Area, name: string, type: string, description: string, positionX: number, positionY: number) {
        this.id = id;
        this.externalId = externalId;
        this.area = area;
        this.name = name;
        this.type = type;
        this.description = description;
    }

    @BeforeInsert()
    private generateExternalId() {
        this.externalId = randomUUID();
    }
}
