const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { default: mongoose } = require('mongoose')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 12, // have as many as the other most liked
        __v: 0
    }  
]


describe("total likes", () => {


    test("of empty list is zero", () => {
        assert.strictEqual(listHelper.totalLikes([]), 0)
    })

    test("of list with one blog is the number of likes of that blog", () => {
        const likes = listHelper.totalLikes([blogs[0]])
        assert.strictEqual(likes, 7)
    })

    // Mmmm, verbosity
    test("of list with multiple blogs is the sum of likes of those blogs", () => {
        const likes = listHelper.totalLikes(blogs)
        assert.strictEqual(likes, 46)
    })
})



describe("favourite blog", () => {

    test("in zero length list is null", () => {
        const favorite = listHelper.favoriteBlog([])
        assert.strictEqual(favorite, null)
    })

    test("in list of one is the only item", () => {
        const favorite = listHelper.favoriteBlog([blogs[0]])
        // favoriteBlog isn't
        // going to care what the blog object looks like as long as it
        // has a "likes" attribute, and favoriteBlog obviously should
        // not format the blog object, that is not its job. As such,
        // it makes little difference what the blog object should
        // otherwise look like.
        const expected = {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        }
        assert.deepStrictEqual(favorite, expected)
    })

    test("in list of many is the first blog with most likes", () => {
        const favorite = listHelper.favoriteBlog(blogs)
        const expected = {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        }

        assert.deepStrictEqual(favorite, expected)
    })

})


describe("most blogs", () => {
    

    test("of zero length list is null", () => {
        const most = listHelper.mostBlogs([])
        assert.strictEqual(most, null)
    })

    test("of list of one is the author of the item with one blog", () => {
        const most = listHelper.mostBlogs([blogs[0]])
        const expected = {
            author: "Michael Chan",
            blogs: 1
        }
        assert.deepStrictEqual(most, expected)
    })

    test("of list of multiple is the author with most blogs and the number of blogs", () => {
        const most = listHelper.mostBlogs(blogs)
        const expected = {
            author: "Robert C. Martin",
            blogs: 3
        }
        assert.deepStrictEqual(most, expected)
    })

})

describe("most likes", () => {

    test("of zero length list is null", () => {
        const most = listHelper.mostLikes([])
        assert.strictEqual(most, null)
    })

    test("of list of one is the author/likes of the one blog", () => {
        const most = listHelper.mostLikes([blogs[0]])

        const expected = {
            author: "Michael Chan",
            likes: 7,
        }

        assert.deepStrictEqual(most, expected)

    })

    test("of list of many is the author with most likes and the sum of their likes", () => {
        const most = listHelper.mostLikes(blogs)

        const expected = {
            author: "Robert C. Martin",
            likes: 22
        }

        assert.deepStrictEqual(most, expected)
    })

})