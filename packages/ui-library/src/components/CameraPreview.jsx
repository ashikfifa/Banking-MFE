import { useEffect, useRef, useState } from "react";
import { Button } from "./Button.jsx";

export function CameraPreview({
  title = "Face Verification",
  capturedImage,
  onCapture
}) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [error, setError] = useState("");
  const [isStarting, setIsStarting] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const stopStream = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setIsActive(false);
  };

  useEffect(() => stopStream, []);

  const startCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Camera access is not supported in this browser.");
      return;
    }

    setIsStarting(true);
    setError("");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsActive(true);
    } catch (cameraError) {
      setError("Camera permission was denied or unavailable.");
    } finally {
      setIsStarting(false);
    }
  };

  const captureFrame = () => {
    if (!videoRef.current) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;

    const context = canvas.getContext("2d");
    context?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const snapshot = canvas.toDataURL("image/png");
    onCapture?.(snapshot);
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-800">{title}</p>
          <p className="text-sm text-slate-500">Use the device camera to capture a selfie.</p>
        </div>
        <div className="flex gap-4">
          <Button
            variant="secondary"
            onClick={startCamera}
            disabled={isActive || isStarting}
          >
            {isStarting ? "Starting..." : "Open Camera"}
          </Button>
          <Button onClick={captureFrame} disabled={!isActive}>
            Capture Image
          </Button>
          <Button variant="ghost" onClick={stopStream} disabled={!isActive}>
            Stop
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl bg-gray-100 p-4">
          <video ref={videoRef} className="aspect-video w-full rounded-xl object-cover" muted playsInline />
          {!isActive ? (
            <div className="mt-4 rounded-xl bg-white p-4 text-sm text-slate-500 shadow">
              Open the camera to preview your face, then click Capture Image.
            </div>
          ) : null}
        </div>

        <div className="flex min-h-56 flex-col justify-between rounded-xl bg-gray-100 p-4">
          <div>
            <p className="text-sm font-semibold text-slate-700">Captured image</p>
            <p className="mt-1 text-sm text-slate-500">
              Capture a still image before triggering verification.
            </p>
          </div>

          {capturedImage ? (
            <img
              src={capturedImage}
              alt="Captured face"
              className="mt-4 aspect-video w-full rounded-xl object-cover"
            />
          ) : (
            <div className="mt-4 flex aspect-video w-full items-center justify-center rounded-xl bg-white text-sm text-slate-400">
              No capture yet
            </div>
          )}
        </div>
      </div>

      {error ? <p className="mt-4 text-sm text-red-500">{error}</p> : null}
    </div>
  );
}
