import { FC } from 'react'

import { Post } from '../../posts/posts-grid/post-item/post-item.interface'
import PostsGrid from '../../posts/posts-grid/posts-grid'
import classes from './featured-posts.module.css'

const FeaturedPosts: FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  )
}

export default FeaturedPosts
