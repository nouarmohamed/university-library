import config from "@/lib/config";
import { getUploadAuthParams } from "@imagekit/next/server"

const {env: {imageKit: {privateKey, publicKey}}} = config;
export async function GET() {
    const { token, expire, signature } = getUploadAuthParams({
        privateKey,
        publicKey
    })

    return Response.json({ token, expire, signature, publicKey })
}