const config = {
    env : {
        apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
        prodApiEndpoint: process.env.PROD_API_ENDPOINT!,
        imageKit : {
            endpointUrl : process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT_URL!,
            publicKey : process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
            privateKey : process.env.IMAGEKIT_PRIVATE_KEY!
        },
        databaseURL: process.env.DATABASE_URL!,
        upstash: {
            redisUrl: process.env.UPSTASH_REDIS_REST_URL!,
            redisToken: process.env.UPSTASH_REDIS_REST_TOKEN!,
            qstashUrl: process.env.QSTASH_URL!,
            qstashToken: process.env.QSTASH_TOKEN!,
        },
        resendToken: process.env.RESEND_TOKEN!
    }
}

export default config;