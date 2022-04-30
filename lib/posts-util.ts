import path from 'path'
import fse from 'fs-extra'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface Post {
  title: string
  image: string
  excerpt?: string
  date: string
  slug: string
  content?: string
  isFeatured?: boolean
}

export async function getPostData(postIdentifier: string): Promise<Post> {
  const postSlug = postIdentifier.replace(/\.md$/, '') // removes .md extension
  const filePath = path.join(postsDirectory, `${postSlug}.md`)
  const fileContent = await fse.readFile(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  const postData = {
    title: data.title,
    image: data.image,
    date: data.date,
    excerpt: data.excerpt,
    isFeatured: data.isFeatured,
    content,
    slug: postSlug,
  }

  return postData
}

export async function getAllPosts() {
  const files = await fse.readdir(postsDirectory)
  const allPosts = []
  for (const fileName of files) {
    if (!fileName.endsWith('.md')) continue

    const post = await getPostData(fileName)
    allPosts.push(post)
  }

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  )

  return sortedPosts
}

export async function getFeaturedPosts() {
  const allPosts = await getAllPosts()
  const featuredPosts = allPosts.filter((post) => post.isFeatured)
  return featuredPosts
}

export async function getAllPostSlugs() {
  const fileNames = await fse.readdir(postsDirectory)
  const slugs = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''))
  return slugs
}
