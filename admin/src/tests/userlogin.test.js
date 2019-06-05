import { Selector } from 'testcafe';

fixture`Prisijungimas`
    .page`http://localhost:8080/`;

test('Prisijungimas prie naudotojo sėkmingas', async t => {
    await t
        .click(Selector('a').withText('Prisijungti').find('.md-list-item-content.md-ripple'))
        .typeText(Selector('.login').find('[name="email"]'), 'test@gmail.com')
        .typeText(Selector('.form-control').nth(1), 'testas')
        .click(Selector('button').withText('PRISIJUNGTI'))
        .click(Selector('h3').withText('Naudotojo administracinis puslapis'))
        .expect(Selector('h3').withText('Naudotojo administracinis puslapis').innerText).contains("Naudotojo administracinis puslapis");
});