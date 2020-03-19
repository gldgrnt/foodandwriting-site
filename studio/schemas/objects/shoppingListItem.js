export default {
    title: 'Item',
    name: 'shoppingListItem',
    type: 'object',
    fields: [
        {
            title: 'Ingredient',
            name: 'ingredient',
            type: 'string',
        },
        {
            title: 'Amount',
            name: 'amount',
            type: 'string'
        }
    ],
    preview: {
        select: {
            name: 'ingredient',
            amount: 'amount'
        },
        prepare(select) {
            const { name, amount } = select
            let title = ''

            if (!(name && amount)) title = '(Add an ingredient and amount)'
            else title = `${name}, ${amount.toLowerCase()}`

            return {
                title: title,
            }
        }
    }
}