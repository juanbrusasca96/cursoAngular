export * from './alumno.model';

export interface Usuario {
    id: number;
    nombre: string;
    apellido: string;
    role: string;
    email: string;
    token: string;
    password: string
}