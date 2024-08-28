const dummy = (blogs) => {
  return 1
}

//Takes in an array of blogs and gets the sum of the likes from all blogs
const totalLikes = (blogs) => {
  //return 0 likes if the array is empty
  if (blogs.length === 0) {
    return 0
  }

  //Sum over the array
  const sumLikes = blogs.reduce((acc, curval) => acc + curval.likes, 0)
  return sumLikes
}



const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  let curMax = 0;
  let indexOfCurMax = 0
  let indexCounter = 0

  for (const blog of blogs) {
    if (blog.likes > curMax) {
      curMax = blog.likes
      indexOfCurMax = indexCounter
    }
    indexCounter++
  }
  return blogs[indexOfCurMax]
}





module.exports = { dummy, totalLikes, favoriteBlog }
