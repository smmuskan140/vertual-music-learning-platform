<<<<<<< HEAD
"use client";

import { ChangeEvent, useEffect, useState } from "react";
=======
'use client';

import { ChangeEvent, useEffect, useState } from 'react';
>>>>>>> 38018597 (feat: initial commit)

type UploadBoxProps = {
  label: string;
  accept?: string;
<<<<<<< HEAD
  onFile: (file: File | null) => void;
};

export default function UploadBox({ label, accept = "image/*", onFile }: UploadBoxProps) {
  const [preview, setPreview] = useState<string | null>(null);
=======
  onFileChange: (base64: string | null, fileName: string | null) => void;
};

export default function UploadBox({ label, accept = 'image/*', onFileChange }: UploadBoxProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
>>>>>>> 38018597 (feat: initial commit)

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
<<<<<<< HEAD
    if (!file) {
      onFile(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    onFile(file);
  };

  return (
    <label className="w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="mb-3 text-sm font-medium text-slate-700">{label}</p>
      <input className="mb-3 block w-full text-sm text-slate-600" type="file" accept={accept} onChange={handleFileChange} />
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={preview} alt={`${label} preview`} className="h-36 w-full rounded-lg border border-slate-200 object-cover" />
      ) : (
        <div className="flex h-36 items-center justify-center rounded-lg border border-dashed border-slate-300 text-sm text-slate-400">
          No file selected
=======
    setFileName(null);
    if (!file) {
      onFileChange(null, null);
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(',')[1]; // remove data:url part
      setPreview(reader.result as string);
      setFileName(file.name);
      onFileChange(base64, file.name);
    };
    reader.readAsDataURL(file);
  };

  return (
    <label className="group cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-white p-6 shadow-sm transition-all hover:border-indigo-400 hover:shadow-md">
      <p className="mb-4 text-sm font-medium text-slate-700">{label}</p>
      <input
        className="absolute inset-0 h-0 w-0 opacity-0"
        type="file"
        accept={accept}
        onChange={handleFileChange}
      />
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt={`${label} preview`}
            className="h-48 w-full rounded-xl object-cover shadow-md"
          />
          <p className="mt-2 truncate text-xs text-slate-500">{fileName}</p>
        </div>
      ) : (
        <div className="flex h-48 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-sm text-slate-400 transition group-hover:border-slate-400">
          Click to upload or drag image
>>>>>>> 38018597 (feat: initial commit)
        </div>
      )}
    </label>
  );
}
