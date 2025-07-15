"use client";

import {
  Image,
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitProvider,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import config from "@/lib/config";

interface FileUploadProps {
  onFileChange: (filePath: string) => void;
}

const FileUpload = ({ onFileChange }: FileUploadProps) => {
  const [progress, setProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const abortController = new AbortController();

  const [uploadedUrl, setUploadedUrl] = useState("");

  const authenticator = async () => {
    try {
        const response = await fetch("/api/auth/imagekit");
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token, publicKey } = data;
        return { signature, expire, token, publicKey };
    } catch (error) {
        console.error("Authentication error:", error);
        throw new Error("Authentication request failed");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        let authParams;
        try {
            authParams = await authenticator();
        } catch (authError) {
            console.error("Failed to authenticate for upload:", authError);
            return;
        }
        const { signature, expire, token, publicKey } = authParams;

        try {
            const uploadResponse = await upload({
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name,
                onProgress: (event) => {
                    setProgress((event.loaded / event.total) * 100);
                },
                abortSignal: abortController.signal,
            });
            console.log("Upload response:", uploadResponse);
            if (uploadResponse.url) {
              setUploadedUrl(uploadResponse.url);
              onFileChange(uploadResponse.url);
            }
        } catch (error) {
            if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
            } else {
                console.error("Upload error:", error);
            }
        }
    };

  return (
    <ImageKitProvider urlEndpoint={config.env.imageKit.endpointUrl}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <Button className="upload-btn" type="button" onClick={() => fileInputRef.current?.click()}>
        <img src="/icons/upload.svg" alt="Upload File" />
        <p className="text-light-100">Upload your ID</p>
      </Button>

      <div className="w-full h-40 sm:h-76 border border-light-100">
        {uploadedUrl && (
          <Image
            src={uploadedUrl}
            width={500}
            height={300}
            alt="Uploaded image"
            className="w-full h-full object-cover size-fit"
          />
        )}
      </div>

      <br />
      <progress value={progress} max={100} className="w-full"/>
    </ImageKitProvider>
  );
}

export default FileUpload