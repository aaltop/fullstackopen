


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


module.exports = {
    dummy, totalLikes
}