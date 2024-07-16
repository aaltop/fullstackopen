


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

module.exports = {
    dummy, totalLikes, favoriteBlog
}