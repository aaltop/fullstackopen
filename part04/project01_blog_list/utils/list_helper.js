function dummy(blogs)
{
    return 1
}

function totalLikes(blogs)
{
    return (blogs.length === 0)
        ?  0
        : blogs.reduce((prev, cur) => cur.likes + prev, 0)
}

function favoriteBlog(blogs)
{
    return (blogs.length === 0)
        ? null
        // only replace with current if more likes than previous
        : blogs.reduce((prev, cur) => prev.likes < cur.likes ? cur : prev)
}

function mostBlogs(blogs)
{


    if (blogs.length === 0) {
        return null
    }

    // you know what? I AM just going to do it vanilla
    const authorsCounter = new Map(blogs.map(blog => [blog.author, 0]))
    blogs.forEach(blog => authorsCounter.set(blog.author, authorsCounter.get(blog.author)+1))
    // because apparently iterators are still "Experimental"
    const mostProlificAuthor = [...authorsCounter].reduce((prev, cur) => prev[1] < cur[1] ? cur : prev)
    return {
        author: mostProlificAuthor[0],
        blogs: mostProlificAuthor[1]
    }


}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}