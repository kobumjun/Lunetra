"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { auditionApplicationSchema } from "@/lib/validations/forms";
import { submitAuditionApplication } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ImageUploader } from "@/components/forms/image-uploader";
import type { z } from "zod";

type FormValue = z.infer<typeof auditionApplicationSchema>;

export function ApplicationForm({ auditionId }: { auditionId: string }) {
  const [message, setMessage] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const form = useForm<FormValue>({
    resolver: zodResolver(auditionApplicationSchema),
    defaultValues: { audition_id: auditionId, consent_privacy: false, gender: "선택안함", category: "일반지원" },
  });

  return (
    <form
      className="space-y-3 rounded-2xl border bg-white p-6"
      onSubmit={form.handleSubmit(async (value) => {
        const res = await submitAuditionApplication({ ...value, attachment_url: attachmentUrl || undefined });
        setMessage(res.message);
        if (res.ok) form.reset({ audition_id: auditionId, consent_privacy: false, gender: "선택안함", category: "일반지원" });
      })}
    >
      <input type="hidden" value={auditionId} {...form.register("audition_id")} />
      <div className="grid gap-3 md:grid-cols-2">
        <Input placeholder="이름" {...form.register("name")} />
        <Input type="date" {...form.register("birth_date")} />
        <Input placeholder="이메일" {...form.register("email")} />
        <Input placeholder="연락처" {...form.register("phone")} />
        <Input placeholder="성별" {...form.register("gender")} />
        <Input placeholder="거주 지역" {...form.register("region")} />
      </div>
      <Input placeholder="SNS 링크" {...form.register("sns_url")} />
      <Input placeholder="포트폴리오 링크" {...form.register("portfolio_url")} />
      <Input placeholder="지원 분야" {...form.register("category")} />
      <Textarea placeholder="자기소개" rows={6} {...form.register("self_intro")} />
      <ImageUploader bucket="applications" onUploaded={setAttachmentUrl} />
      {attachmentUrl && <p className="text-xs text-emerald-600">파일 업로드 완료</p>}
      <div className="flex items-center gap-2">
        <Checkbox
          defaultChecked={false}
          onCheckedChange={(v) => form.setValue("consent_privacy", Boolean(v))}
        />
        <Label>개인정보 수집 및 이용에 동의합니다.</Label>
      </div>
      <Button className="w-full rounded-full bg-violet-600 hover:bg-violet-700">지원서 제출</Button>
      {message && <p className="text-sm text-zinc-700">{message}</p>}
    </form>
  );
}
