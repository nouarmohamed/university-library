"use client"

import config from '@/lib/config'
import { buildSrc, Video } from '@imagekit/next'

const BookVideo = ({videoUrl, coverUrl}: {videoUrl: string, coverUrl: string}) => {
  return (
    <div>
        <Video
            urlEndpoint={config.env.imageKit.endpointUrl}
            src={videoUrl}
            controls
            preload="none"
            poster={buildSrc({
                urlEndpoint: config.env.imageKit.endpointUrl,
                src: coverUrl,
            })}
            width={550}
            height={400}
            style={{ borderRadius: '12px', overflow: 'hidden',width: '600px', height: '400px', objectFit: 'cover'}}
        />
    </div>
  )
}

export default BookVideo