import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import PostContent from '../../components/posts/post-detail/post-content/post-content'
import { Post } from '../../components/posts/posts-grid/post-item/post-item.interface'
import { getAllPostSlugs, getPostData } from '../../lib/posts-util'

const PostDetailPage: NextPage<{ post: Post }> = ({ post }) => {
  return <PostContent post={post} />
}

export default PostDetailPage

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context
  if (!params) return { notFound: true }

  const { slug } = params
  if (typeof slug !== 'string') return { notFound: true }

  const post = await getPostData(slug)
  return { props: { post }, revalidate: 600 }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllPostSlugs()
  const paths = slugs.map((slug) => ({ params: { slug } }))
  return { paths, fallback: 'blocking' }
}
