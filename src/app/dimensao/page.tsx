"use client";

import type React from "react";

import { useState, useRef } from "react";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { Upload, CheckCircle2, Play, AlertCircle } from "lucide-react";

type UploadState = "idle" | "uploading" | "success" | "error";

export default function VideoUploader() {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [thumbnailSrc, setThumbnailSrc] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const videoUrl = URL.createObjectURL(file);
    setVideoSrc(videoUrl);
    generateThumbnail(videoUrl);

    setUploadState("uploading");
    setProgress(0);

    try {
      await uploadVideo(file);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadState("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Upload failed. Please try again."
      );
    }
  };

  const generateThumbnail = (videoUrl: string) => {
    const video = document.createElement("video");
    video.src = videoUrl;
    video.crossOrigin = "anonymous";
    video.currentTime = 1; // Seek to 1 second
    video.addEventListener("loadeddata", () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      setThumbnailSrc(canvas.toDataURL());
    });
  };

  const uploadVideo = async (file: File) => {
    const formData = new FormData();
    formData.append("video", file);

    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setProgress(percentComplete);
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadState("success");
          setProgress(100);
          resolve();
        } else {
          reject(new Error(`HTTP Error: ${xhr.status}`));
        }
      });

      xhr.addEventListener("error", () => {
        reject(new Error("Network error occurred"));
      });

      xhr.addEventListener("abort", () => {
        reject(new Error("Upload aborted"));
      });

      xhr.open("POST", "http://localhost:5000/upload");
      xhr.send(formData);
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleThumbnailClick = () => {
    if (uploadState === "success") {
      setIsPlaying(true);
    }
  };

  const resetUpload = () => {
    setUploadState("idle");
    setProgress(0);
    setVideoSrc(null);
    setThumbnailSrc(null);
    setIsPlaying(false);
    setFileName("");
    setErrorMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const retryUpload = async () => {
    if (!fileInputRef.current?.files?.[0]) return;

    setUploadState("uploading");
    setProgress(0);

    try {
      await uploadVideo(fileInputRef.current.files[0]);
    } catch (error) {
      console.error("Retry failed:", error);
      setUploadState("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Upload failed. Please try again."
      );
    }
  };

  return (
    <div className="w-full rounded-lg border border-border bg-card p-6 shadow-sm">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="video/*"
        className="hidden"
      />

      {uploadState === "idle" && (
        <div className="flex flex-col items-center justify-center space-y-4 py-12 text-[#000]">
          <div className="rounded-full bg-[#ccc] p-4">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-medium">Upload your video</h3>
            <p className="text-sm text-muted-foreground">
              MP4, WebM or AVI (max. 1GB)
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleUploadClick}
            className="mt-2 bg-black border-0 text-[#fff]"
          >
            Selecionar video
          </Button>
        </div>
      )}

      {(uploadState === "uploading" ||
        uploadState === "success" ||
        uploadState === "error") && (
        <div className="space-y-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black/5">
            {thumbnailSrc ? (
              <div className="relative h-full w-full">
                {isPlaying && videoSrc ? (
                  <video
                    src={videoSrc}
                    className="h-full w-full object-cover"
                    controls
                    autoPlay
                    onEnded={() => setIsPlaying(false)}
                  />
                ) : (
                  <>
                    <img
                      src={thumbnailSrc || "/placeholder.svg"}
                      alt="Video thumbnail"
                      className="h-full w-full object-cover"
                    />
                    {uploadState === "success" && (
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                        onClick={handleThumbnailClick}
                      >
                        <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                          <Play className="h-8 w-8 fill-white text-white" />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            )}
          </div>

          {fileName && (
            <div className="text-sm font-medium truncate">{fileName}</div>
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {uploadState === "uploading" && "Enviando..."}
                {uploadState === "success" && "Enviado!"}
                {uploadState === "error" && "Falha no envio :("}
              </span>
              {uploadState === "success" && (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              )}
              {uploadState === "error" && (
                <AlertCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
            <Progress
              value={progress}
              className={`h-2 w-full ${
                uploadState === "error" ? "bg-red-100" : ""
              }`}
            />
            {uploadState === "error" && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
          </div>

          <div className="flex justify-between">
            {uploadState === "success" ? (
              <>
                <Button variant="outline" onClick={resetUpload}>
                  Enviar outro
                </Button>
                <Button>Continue</Button>
              </>
            ) : uploadState === "error" ? (
              <>
                <Button variant="outline" onClick={resetUpload}>
                  Cancelar
                </Button>
                <Button onClick={retryUpload}>Tentar novamente</Button>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">
                {Math.round(progress)}% complete
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
