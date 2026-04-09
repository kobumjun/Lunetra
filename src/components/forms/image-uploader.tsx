"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ImageUploader({ bucket, onUploaded }: { bucket: string; onUploaded: (url: string) => void }) {
  const [loading, setLoading] = useState(false);

  const upload = async (file: File) => {
    setLoading(true);
    const fd = new FormData();
    fd.append("bucket", bucket);
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data?.url) onUploaded(data.url);
    setLoading(false);
  };

  return (
    <div className="space-y-2">
      <Input type="file" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
      <Button type="button" variant="outline" disabled={loading}>
        {loading ? "업로드 중..." : "파일 선택 후 자동 업로드"}
      </Button>
    </div>
  );
}
