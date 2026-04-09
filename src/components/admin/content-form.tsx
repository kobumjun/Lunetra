"use client";

import { useActionState, useState } from "react";
import { upsertContent } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/forms/image-uploader";

export function ContentForm({ table, bucket }: { table: "challenges" | "auditions" | "magazines"; bucket: "challenges" | "auditions" | "magazines" }) {
  const [state, action, pending] = useActionState(
    (_: unknown, formData: FormData) => upsertContent(table, formData),
    { ok: true, message: "" },
  );
  const [thumbnail, setThumbnail] = useState("");
  const [cover, setCover] = useState("");

  return (
    <form action={action} className="space-y-3 rounded-2xl border bg-white p-4">
      <h2 className="font-semibold">{table} 등록/수정</h2>
      <Input name="id" placeholder="수정 시 ID 입력 (선택)" />
      <Input name="title" placeholder="제목" required />
      <Input name="slug" placeholder="slug" required />
      <ImageUploader bucket={bucket} onUploaded={setThumbnail} />
      <Input name="thumbnail_url" placeholder="썸네일 URL" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} required />
      <ImageUploader bucket={bucket} onUploaded={setCover} />
      <Input name="cover_image_url" placeholder="대표 이미지 URL" value={cover} onChange={(e) => setCover(e.target.value)} required />
      <Input name="short_description" placeholder="짧은 소개" required />
      <Textarea name="description" placeholder="상세 설명" rows={4} required />
      {table === "challenges" && <>
        <Input name="target_audience" placeholder="참여 대상" required />
        <Input name="benefits" placeholder="보상/혜택" required />
        <Input name="precautions" placeholder="유의사항" required />
        <Input type="date" name="start_date" required />
        <Input type="date" name="end_date" required />
        <Input name="status" placeholder="ongoing/upcoming/ended" required />
      </>}
      {table === "auditions" && <>
        <Input name="category" placeholder="singer/actor/model/dancer/creator" required />
        <Input name="requirements" placeholder="지원 조건" required />
        <Input name="submission_guide" placeholder="제출 안내" required />
        <Input type="date" name="start_date" required />
        <Input type="date" name="end_date" required />
        <Input name="status" placeholder="open/closed" required />
      </>}
      {table === "magazines" && <>
        <Input name="summary" placeholder="요약" required />
        <Textarea name="content" placeholder="본문" rows={6} required />
        <Input name="category" placeholder="news/event/artist/project" required />
        <Input type="datetime-local" name="published_at" required />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_public" defaultChecked /> 공개</label>
      </>}
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="is_featured" /> 대표 노출</label>
      <Button disabled={pending}>{pending ? "저장중..." : "저장"}</Button>
      <p className="text-sm text-zinc-600">{state.message}</p>
    </form>
  );
}
