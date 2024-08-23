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

            const testBlog = {
                title: "test blog title",
                author: "test blog author",
                url: "www.example.org"
            }

            test("a new blog can be created", async ({ page }) => {
                const { title, author, url } = testBlog
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

            test("created blog can be liked", async ({ page }) => {
                const { title, author, url } = testBlog
                await createBlog(page, title, author, url)

                await page.getByRole("button", { name: "Show" }).click()

                const likeButton = page.getByRole("button", { name: "Like" })
                const likeDiv = likeButton.locator("..")

                await expect(
                    likeDiv
                ).toBeVisible()

                await expect(
                    likeDiv
                ).toHaveText(/likes 0/)

                await likeButton.click()
                await expect(
                    likeDiv
                ).toHaveText(/likes 1/)
            })

            test("created blog can be deleted", async ({ page }) => {
                const { title, author, url } = testBlog
                await createBlog(page, title, author, url)
                await page.getByRole("button", { name: "Show" }).click()

                const deleteButton = page.getByRole("button", { name: "Delete" })
                await expect(deleteButton).toBeVisible()
                deleteButton.click()
                page.on("dialog", dialog => dialog.accept())
                await expect(deleteButton).not.toBeVisible()
            })

            const otherUser = {
                username: "other_username",
                password: "other_password",
                name: "Jane Doe"
            }

            // Well, the "visible to maker" part is really tested above,
            // while this ensures the "only" part
            test("blog delete is only visible to maker", async ({ page, request }) => {

                // create the blog
                const { title, author, url } = testBlog
                await createBlog(page, title, author, url)

                // log out
                await page.getByRole("button", { name: "Log out" }).click()
                await request.post("api/users", { data: otherUser })

                // login with other user
                const { username, password } = otherUser
                await login(page, username, password)

                // test blog existence, test delete non-existence
                // ----------------------------------------------
                await page.getByRole("button", { name: "Show" }).click()
                // assumes testBlog title is unique to the page,
                // so should choose a sufficiently unique one (
                // just "ensuring" that the blog is actually there, a button
                // with a "show" might not be unique to the blogs)
                await expect(
                    page.getByText(testBlog.title).first()
                ).toBeVisible()

                await expect(
                    page.getByRole("button", { name: "Delete" })
                ).not.toBeVisible()
                // ================================================

            })
        })

    })

})