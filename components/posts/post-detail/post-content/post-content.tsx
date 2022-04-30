import Image from 'next/image'
import { FC } from 'react'
import ReactMarkdown, { Components } from 'react-markdown'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark'

import { Post } from '../../posts-grid/post-item/post-item.interface'
import PostHeader from '../post-header/post-header'
import classes from './post-content.module.css'

const PostContent: FC<{ post: Post }> = ({ post }) => {
  const getImagePath = (imageName: string) => {
    return `/images/posts/${post.slug}/${imageName}`
  }

  const customComponents: Components = {
    // img(image) {
    //   if (!image.src) return null

    //   return (
    //     <Image
    //       src={getImagePath(image.src)}
    //       alt={image.alt}
    //       height={300}
    //       width={600}
    //     />
    //   )
    // },

    p(paragraph) {
      const image = paragraph.node.children[0]
      if (
        !image ||
        image.type !== 'element' ||
        image.tagName !== 'img' ||
        !image.properties
      ) {
        return <p {...paragraph}>{paragraph.children}</p>
      }

      const imgSrc =
        typeof image.properties.src === 'string' ? image.properties.src : ''
      const imgAlt =
        typeof image.properties.alt === 'string' ? image.properties.alt : ''

      return (
        <div className={classes.image}>
          <Image
            src={getImagePath(imgSrc)}
            alt={imgAlt}
            height={300}
            width={600}
          />
        </div>
      )
    },

    code(code) {
      const { children, className } = code
      const match = /language-(\w+)/.exec(className || '')
      const language = (match && match[1]) || 'js'
      return (
        <SyntaxHighlighter style={atomDark} language={language}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      )
    },
  }

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={getImagePath(post.image)} />
      <ReactMarkdown components={customComponents}>
        {post.content || ''}
      </ReactMarkdown>
    </article>
  )
}

export default PostContent
