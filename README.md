# Lunetra Entertainment Network

실서비스 형태의 K-POP/엔터테인먼트 프로젝트 운영 플랫폼입니다.  
Next.js 15 App Router + Supabase(Auth/DB/Storage) 기반으로 공개 페이지, 관리자 운영 콘솔, 오디션 신청 저장 플로우를 포함합니다.

## Tech Stack

- Next.js App Router + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase Database/Auth/Storage + RLS
- React Hook Form + Zod
- Server Actions + Route Handlers

## Folder Structure

`src/app`
- `/` 홈
- `/challenges`, `/challenges/[slug]`
- `/auditions`, `/auditions/[slug]` + 신청 폼
- `/magazines`, `/magazines/[slug]`
- `/about`
- `/admin/login`
- `/admin/*` 운영 대시보드/CRUD

`src/components`
- `common`: 헤더/푸터/섹션/히어로
- `cards`: ChallengeCard, AuditionCard, MagazineCard
- `forms`: ApplicationForm, ImageUploader
- `admin`: AdminSidebar, BannerForm, ContentForm, AdminDataTable

`src/lib`
- `supabase/*`: client/server/admin 클라이언트
- `actions.ts`: 관리자 CRUD/로그인/지원서 저장
- `queries.ts`: 홈 집계 쿼리
- `validations/forms.ts`: Zod 스키마
- `auth.ts`: admin 접근 제어

`supabase`
- `schema.sql`: 테이블/타입/RLS/스토리지 정책
- `seed.sql`: 초기 운영 데이터

## Required Package Install Commands

```bash
npm install @supabase/supabase-js @supabase/ssr react-hook-form @hookform/resolvers zod date-fns clsx tailwind-merge lucide-react next-themes
npx shadcn@latest init -d
npx shadcn@latest add input textarea card badge table tabs select checkbox label separator
```

## Supabase Setup

1. Supabase 프로젝트 생성
2. SQL Editor에서 `supabase/schema.sql` 실행
3. 이어서 `supabase/seed.sql` 실행
4. `.env.example`를 참고하여 `.env.local` 작성
5. Auth에서 관리자 유저를 생성하고 `profiles`에 `role='admin'` 설정

## Run

```bash
npm run dev
```

## Security & RLS

- 공개: 배너(활성), 챌린지, 오디션, 공개 매거진 읽기
- 관리자: 콘텐츠 CRUD, 지원서 조회/상태관리
- 지원자: 오디션 지원서 `insert`만 허용
- 스토리지: 콘텐츠 이미지는 공개 읽기 + 관리자 업로드, 지원서 버킷은 관리자만 읽기

## Production Notes

- `ADMIN_EMAILS` 화이트리스트와 `profiles.role='admin'` 병행 사용
- 이미지/파일 업로드는 `/api/upload` Route Handler를 통해 처리
- 동적 페이지는 slug 기반 라우팅으로 SEO-friendly 구성
- `not-found.tsx`, `loading.tsx` 포함

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
