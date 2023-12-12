import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'

import authorsResource from '../resources/authors'

const TestPage = (props) => {
  return (
    <>
      <div className="test-page-container">
        <Head>
          <title>test-page - Corporate Functionality Administrator</title>
          <meta
            property="og:title"
            content="test-page - Corporate Functionality Administrator"
          />
        </Head>
        <DataProvider
          renderSuccess={(context_t9cl4o) => (
            <>
              <h1 id={context_t9cl4o?.Name}>Heading</h1>
            </>
          )}
          initialData={props.contextT9cl4oProp}
          persistDataDuringLoading={true}
          key={props?.contextT9cl4oProp?.id}
        />
      </div>
      <style jsx>
        {`
          .test-page-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

export default TestPage

export async function getStaticProps(context) {
  try {
    const contextT9cl4oProp = await authorsResource({
      ...context?.params,
    })
    return {
      props: {
        contextT9cl4oProp: contextT9cl4oProp?.data?.[0],
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
