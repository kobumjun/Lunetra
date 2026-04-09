"use client";

import { useActionState } from "react";
import { adminLogin } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(adminLogin, { ok: true, message: "" });
  return (
    <div className="mx-auto mt-24 max-w-md rounded-3xl border bg-white p-8 shadow-sm">
      <h1 className="mb-4 text-2xl font-semibold">관리자 로그인</h1>
      <form action={action} className="space-y-3">
        <Input name="email" placeholder="이메일" type="email" required />
        <Input name="password" placeholder="비밀번호" type="password" required />
        <Button className="w-full rounded-full bg-violet-600 hover:bg-violet-700" disabled={pending}>
          {pending ? "로그인 중..." : "로그인"}
        </Button>
      </form>
      {!state.ok && <p className="mt-3 text-sm text-red-600">{state.message}</p>}
    </div>
  );
}
