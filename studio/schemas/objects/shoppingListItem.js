import { ShoppingListItem } from "../../components"

export default {
    title: 'Item',
    name: 'shoppingListItem',
    type: 'object',
    fields: [
        {
            title: 'Ingredient',
            // title: 'Item search',
            name: 'itemSearch',
            type: 'string',
            // inputComponent: ShoppingListItem
        },
        {
            title: 'Amount',
            name: 'amount',
            type: 'string'
        }
    ],
    preview: {
        select: {
            name: 'itemSearch',
            amount: 'amount'
        },
        prepare(select) {
            const { name, amount } = select

            return {
                title: `${name}, ${amount}`,
            }
        }
    }
}