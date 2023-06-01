export interface Curso {
    id: number,
    idMateria: number,
    fecha_inicio: Date,
    fecha_fin: Date
}

export interface CrearCursoPayload {
    idMateria: number,
    fecha_inicio: Date,
    fecha_fin: Date
}