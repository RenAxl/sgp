import { Equipment } from "./equipment";

export type Card = {
    id: number;
    model: string;
    imgUrl: string;
    feature: string;
    functionality: string;
    connection: string;
    resetProcedure: string;
    exchangeProcedure: string;
    equipments: Equipment[];
}