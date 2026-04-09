"use client";

import { useActionState, useState } from "react";
import { upsertBanner } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/forms/image-uploader";

export function BannerForm() {
  const [state, action, pending] = useActionState(upsertBanner, { ok: true, message: "" });
  const [imageUrl, setImageUrl] = useState("");
  return (
    <form action={action} className="space-y-3 rounded-2xl border bg-white p-4">
      <h2 className="font-semibold">배너 등록/수정</h2>
      <Input name="id" placeholder="수정 시 배너 ID 입력 (선택)" />
      <Input name="title" placeholder="제목" required />
      <Input name="subtitle" placeholder="서브텍스트" required />
      <ImageUploader bucket="banners" onUploaded={setImageUrl} />
      <Input name="image_url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="이미지 URL" required />
      <Input name="link_url" placeholder="링크 URL" />
      <Input name="sort_order" type="number" defaultValue={1} required />
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_active" defaultChecked /> 공개</label>
      <Button disabled={pending}>{pending ? "저장중..." : "저장"}</Button>
      <p className="text-sm text-zinc-600">{state.message}</p>
    </form>
  );
}
