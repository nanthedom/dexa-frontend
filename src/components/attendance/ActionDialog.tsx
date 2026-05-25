"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCheckInMutation } from "@/hooks/use-attendance";
import { useCheckOutMutation } from "@/hooks/use-attendance";

export const ActionDialog = ({ openDialog, setOpenDialog, attendanceType }: { openDialog: boolean; setOpenDialog: (open: boolean) => void; attendanceType: "check-in" | "check-out" }) => {

    const [photo, setPhoto] = useState<File | null>(null);
    const [notes, setNotes] = useState("");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const checkInMutation = useCheckInMutation();
    const checkOutMutation = useCheckOutMutation();

    const startCamera = async () => {
        setErrorMsg(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" },
                audio: false,
            });
            streamRef.current = stream;
            setCameraOpen(true);

            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            }, 100);
        } catch (error) {
            console.error(error);
            setErrorMsg("Unable to access camera. Please check your browser permissions.");
        }
    };

    const stopCamera = () => {
        streamRef.current?.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        setCameraOpen(false);
    };

    const capturePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
            if (!blob) return;
            const file = new File([blob], `attendance-${Date.now()}.jpg`, { type: "image/jpeg" });
            setPhoto(file);
            setPreviewUrl(URL.createObjectURL(file));
            setErrorMsg(null);
            stopCamera();
        }, "image/jpeg");
    };

    useEffect(() => {
        return () => stopCamera();
    }, []);

    const closeDialog = () => {
        setOpenDialog(false);
        setPhoto(null);
        setPreviewUrl(null);
        setNotes("");
        setErrorMsg(null);
        stopCamera();
    };

    const handleSubmitAttendance = (e: React.FormEvent) => {
        e.preventDefault();

        if (!photo) {
            setErrorMsg("Photo is required to submit attendance.");
            return;
        }

        setErrorMsg(null);

        if (attendanceType === "check-in") {
            checkInMutation.mutate(
                { photo: photo, notes },
                {
                    onSuccess: () => {
                        closeDialog();
                    }
                }
            );
        } else if (attendanceType === "check-out") {
            checkOutMutation.mutate(
                { photo: photo, notes },
                {
                    onSuccess: () => {
                        closeDialog();
                    }
                }
            );
        }
    };

    if (!openDialog) return null;

    const isSubmitting = attendanceType === "check-in" ? checkInMutation.isPending : checkOutMutation.isPending;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
            <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-[8px] bg-white shadow-2xl">

                <div className="flex shrink-0 items-start justify-between border-b px-6 py-5">
                    <div>
                        <h2 className="text-2xl font-bold text-zinc-900">
                            {attendanceType === "check-in" ? "Check In Attendance" : "Check Out Attendance"}
                        </h2>
                        <p className="mt-1 text-sm text-zinc-500">
                            Upload your attendance photo and notes.
                        </p>
                    </div>

                    <button
                        onClick={closeDialog}
                        disabled={isSubmitting}
                        className="rounded-xl p-2 transition hover:bg-zinc-100 cursor-pointer disabled:opacity-50"
                    >
                        <X className="h-5 w-5 text-zinc-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmitAttendance} className="flex min-h-0 flex-1 flex-col">
                    <div className="flex-1 overflow-y-auto px-6 py-5">
                        
                        {errorMsg && (
                            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-600">
                                {errorMsg}
                            </div>
                        )}

                        <div className="space-y-5">
                            <label className="text-m font-bold text-zinc-700">
                                Attendance Photo
                            </label>

                            <div className="space-y-3">
                                {previewUrl && (
                                    <div className="overflow-hidden rounded-2xl border">
                                        <img src={previewUrl} alt="Preview" className="h-64 w-full object-cover" />
                                    </div>
                                )}

                                {cameraOpen && (
                                    <div className="space-y-3 rounded-2xl border bg-black p-3">
                                        <video
                                            ref={videoRef}
                                            autoPlay
                                            playsInline
                                            muted
                                            className="h-72 w-full rounded-xl object-cover"
                                        />

                                        <div className="flex gap-3">
                                            <Button type="button" onClick={capturePhoto} className="flex-1 rounded-xl cursor-pointer">
                                                Capture Photo
                                            </Button>

                                            <Button type="button" variant="outline" onClick={stopCamera} className="rounded-xl bg-white cursor-pointer">
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                <canvas ref={canvasRef} className="hidden" />

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="h-12 rounded-2xl cursor-pointer"
                                        onClick={startCamera}
                                        disabled={isSubmitting || cameraOpen}
                                    >
                                        <Camera className="mr-2 h-4 w-4" />
                                        Open Camera
                                    </Button>

                                    <label className={`flex h-12 cursor-pointer items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 ${isSubmitting ? "opacity-50 pointer-events-none" : ""}`}>
                                        <Upload className="mr-2 h-4 w-4" />
                                        Upload Photo
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            capture="user"
                                            disabled={isSubmitting}
                                            className="hidden"
                                            onChange={(e) => {
                                                if (e.target.files?.[0]) {
                                                    const file = e.target.files[0];
                                                    setPhoto(file);
                                                    setPreviewUrl(URL.createObjectURL(file));
                                                    setErrorMsg(null);
                                                }
                                            }}
                                        />
                                    </label>
                                </div>

                                {photo && (
                                    <div className="rounded-xl bg-zinc-100 px-3 py-2 text-xs font-medium text-zinc-700">
                                        Selected: {photo.name}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-m font-bold text-zinc-700">
                                    Notes
                                </label>
                                <Textarea
                                    placeholder="Add attendance notes..."
                                    value={notes}
                                    disabled={isSubmitting}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="min-h-[120px] rounded-2xl border-zinc-200 bg-zinc-50 focus-visible:ring-0"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex shrink-0 flex-col-reverse gap-3 border-t bg-white px-6 py-5 sm:flex-row sm:justify-end">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={closeDialog}
                            disabled={isSubmitting}
                            className="h-11 rounded-2xl cursor-pointer"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="h-11 rounded-2xl px-6 cursor-pointer"
                        >
                            {isSubmitting
                                ? "Submitting..."
                                : attendanceType === "check-in"
                                    ? "Submit Check In"
                                    : "Submit Check Out"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
