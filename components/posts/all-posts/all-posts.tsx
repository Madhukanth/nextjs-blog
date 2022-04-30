import { FC } from 'react'

import { Post } from '../posts-grid/post-item/post-item.interface'
import PostsGrid from '../posts-grid/posts-grid'
import classes from './all-posts.module.css'

const AllPosts: FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={posts} />
    </section>
  )
}

export default AllPosts
