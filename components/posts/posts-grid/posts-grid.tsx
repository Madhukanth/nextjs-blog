import { FC } from 'react'

import PostItem from './post-item/post-item'
import { Post } from './post-item/post-item.interface'
import classes from './posts-grid.module.css'

const PostsGrid: FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  )
}

export default PostsGrid
