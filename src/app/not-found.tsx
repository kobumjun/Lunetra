import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto mt-24 max-w-xl rounded-3xl border bg-white p-10 text-center shadow-sm">
      <h1 className="text-2xl font-semibold">페이지를 찾을 수 없습니다.</h1>
      <p className="mt-3 text-zinc-600">요청하신 콘텐츠가 삭제되었거나 주소가 변경되었습니다.</p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-violet-600 px-4 py-2 text-sm text-white">홈으로 이동</Link>
    </div>
  );
}
