export class Alumno {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public age: number,
        public isTop10: boolean,
        public birthdate: Date,
    ) { }
}