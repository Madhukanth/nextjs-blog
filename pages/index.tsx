import { Fragment } from 'react'
import type { GetStaticProps, NextPage } from 'next'

import FeaturedPosts from '../components/home-page/featured-posts/featured-posts'
import Hero from '../components/home-page/hero/hero'
import { Post } from '../components/posts/posts-grid/post-item/post-item.interface'
import { getFeaturedPosts } from '../lib/posts-util'
import Head from 'next/head'

const HomePage: NextPage<{ posts: Post[] }> = ({ posts }) => {
  return (
    <Fragment>
      <Head>
        <title>Madhu Blog</title>
        <meta
          name='description'
          content='I post about programming and web development'
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </Fragment>
  )
}

export default HomePage

export const getStaticProps: GetStaticProps = async () => {
  const featuredPosts = await getFeaturedPosts()
  return { props: { posts: featuredPosts } }
}
