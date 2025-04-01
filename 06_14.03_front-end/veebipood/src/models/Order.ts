export type Order = {
    id: number,
    created: Date,
    person: Person,
    products: Product[],
    totalSum: number
}