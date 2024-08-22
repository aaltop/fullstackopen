const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page }) => {
        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {

        const labels = ["Username ", "Password "]
        const expects = labels.map(async label => {
            const loc = page.getByLabel(label)
            return expect(loc).toBeVisible()
        }).concat(
            expect(page.getByRole("button", { name: "Login" })).toBeVisible()
        )
        await Promise.all(expects)
    })

})