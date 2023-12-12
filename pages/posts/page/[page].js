import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'
import PropTypes from 'prop-types'

import postsPageInitialPathsB6d21Resource from '../../../resources/posts-page-initial-paths-b6d21'
import postsPageInitialPropsEee30Resource from '../../../resources/posts-page-initial-props-eee30'

const Posts1 = (props) => {
  return (
    <>
      <div className="posts1-container">
        <Head>
          <title>Posts - Corporate Functionality Administrator</title>
          <meta
            property="og:title"
            content="Posts - Corporate Functionality Administrator"
          />
        </Head>
        <DataProvider
          renderSuccess={(params) => (
            <>
              <Repeater
                items={params}
                renderItem={(PostsEntities) => (
                  <>
                    <div className="posts1-container1">
                      <h1>{PostsEntities?.Title}</h1>
                      <span>{PostsEntities?.Title}</span>
                      <span>{PostsEntities?.Preview}</span>
                    </div>
                  </>
                )}
              />
            </>
          )}
          initialData={props.postsEntities}
          persistDataDuringLoading={true}
          key={props?.pagination?.page}
        />
      </div>
      <style jsx>
        {`
          .posts1-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .posts1-container1 {
            gap: 12px;
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

Posts1.defaultProps = {
  postsEntities: [],
}

Posts1.propTypes = {
  postsEntities: PropTypes.array,
}

export default Posts1

export async function getStaticPaths() {
  try {
    const response = await postsPageInitialPathsB6d21Resource({})
    const totalCount = response?.meta?.pagination?.total
    const pagesCount = Math.ceil(totalCount / 10)
    return {
      paths: Array.from(
        {
          length: pagesCount,
        },
        (_, i) => ({
          params: {
            page: (i + 1).toString(),
          },
        })
      ),
      fallback: 'blocking',
    }
  } catch (error) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
}

export async function getStaticProps(context) {
  try {
    const response = await postsPageInitialPropsEee30Resource({
      ...context?.params,
      start: (context.params.page - 1) * 10,
    })
    if (!response) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        postsEntities: response,
        ...response?.meta,
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
