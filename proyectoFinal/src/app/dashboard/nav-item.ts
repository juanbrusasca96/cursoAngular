
interface NavItem{
    path:string,
    title:string,
    icon?:string
}

const links: NavItem[]=[
    {
        path:'alumnos',
        title:'Alumnos',
        icon:'person'
    },
    {
        path:'cards',
        title:'Tarjetas'
    }
]

export default links