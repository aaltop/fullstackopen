const { test, expect, beforeEach, describe } = require("@playwright/test")

describe("Blog app", () => {
    beforeEach(async ({ page }) => {
        await page.goto("/")
    })

    test("Login form is shown", async ({ page }) => {

        const labels = ["Username ", "Password "]
        const expects = labels.map(async label => {
            const loc = page.getByLabel(label)
            return expect(loc).toBeVisible()
        }).concat(
            expect(page.getByRole("button", { name: "Login" })).toBeVisible()
        )
        await Promise.all(expects)
    })

    describe("Login", () => {

        const testUser = {
            username: "username",
            password: "password",
            name: "John Doe"
        }

        beforeEach(async ({ page, request }) => {
            await request.post("/api/testing/reset")
            await request.post("/api/users", {
                data: testUser
            })
        })

        async function login(page, username, password)
        {
            await page.getByLabel("Username").fill(username)
            await page.getByLabel("Password").fill(password)
            await page.getByRole("Button", { name: "Login" }).click()
        }


        test("succeeds with correct credentials", async ({ page }) => {
            const { username, password, name } = testUser
            await login(page, username, password)
            await expect(
                page.getByText(name)
            ).toBeVisible()
        })

        test("fails with wrong credentials", async ({ page }) => {
            await login(page, "notusername", "notpassword")
            await expect(
                page.getByText("Invalid username or password")
            ).toBeVisible()
        })

        describe("When logged in", () => {
            beforeEach(async ({ page }) => {
                const { username, password } = testUser
                login(page, username, password)
            })

            async function createBlog(page, title, author, url)
            {
                await page.getByRole("button", { name: "New Blog" }).click()
                await page.getByLabel("Title").fill(title)
                await page.getByLabel("Author").fill(author)
                await page.getByLabel("Url").fill(url)
                await page.getByText("Add Blog").click()
            }

            test("a new blog can be created", async ({ page }) => {
                const title = "title"
                const author = "author"
                const url = "www.example.org"
                await createBlog(page, title, author, url)

                await expect(
                    page.getByText("Added new blog")
                ).toBeVisible()

                await expect(
                    page.getByText(`${title} ${author}`, { exact: true })
                ).toBeVisible()

                await expect(
                    page.getByRole("button", { name: "Show" })
                ).toBeVisible()
            })
        })

    })

})