import { expect, test } from 'vitest'
import { render } from "@testing-library/vue";
import { RechercheLivre } from "../components/rechercheLivre.vue"

describe('Teste pour verifiaction du composant', () => {
    test('test du composant rechercheLivre', () => {
        const { getByText } = render(RechercheLivre, {
            props: {
                /* ... */
            }
        })
        // assert output
        getByText('...')
    });

});
