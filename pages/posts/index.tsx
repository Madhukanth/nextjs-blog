import type { GetStaticProps, NextPage } from 'next'

import AllPosts from '../../components/posts/all-posts/all-posts'
import { Post } from '../../components/posts/posts-grid/post-item/post-item.interface'
import { getAllPosts } from '../../lib/posts-util'

const AllPostsPage: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return <AllPosts posts={posts} />
}

export default AllPostsPage

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllPosts()
  return { props: { posts: allPosts } }
}
