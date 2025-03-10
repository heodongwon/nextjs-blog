import type { GetServerSideProps } from 'next'

import { host } from '@/lib/config'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (req.method !== 'GET') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({ error: 'method not allowed' }))
    res.end()

    return {
      props: {}
    }
  }

  // cache for up to one day
  res.setHeader('Cache-Control', 'public, max-age=86400, immutable')
  res.setHeader('Content-Type', 'text/plain')

  // 배포 버전으로 항상 Allow: / 설정
  res.write(`User-agent: *
Allow: /
Disallow: /api/get-tweet-ast/*
Disallow: /api/search-notion

Sitemap: ${host}/sitemap.xml
`)

  res.end()

  return {
    props: {}
  }
}

export default function noop() {
  return null
}
