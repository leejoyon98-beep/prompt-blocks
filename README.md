# Prompt Blocks

자주 쓰는 AI 작업 방식을 프롬프트 블록으로 조합하고, 나만의 블록팩으로 저장해서 복사해 쓰는 Next.js 앱입니다.

## 실행

```bash
npm install
npm run dev
```

개발 서버는 `http://localhost:3047`에서 열립니다.

## 주요 기능

- 추천 블록팩으로 빠르게 시작
- 블록 라이브러리 검색과 카테고리 필터
- 내 블록팩 생성, 수정, 복제, 삭제
- 등록용 프롬프트 전체 복사
- 블록 이름만 조합해서 복사
- Supabase 설정이 없으면 브라우저 로컬 저장소에 저장
- Supabase 설정이 있으면 이메일 링크 로그인과 클라우드 동기화 사용

## Supabase 설정

Supabase 없이도 앱은 동작합니다. 여러 기기에서 블록팩을 동기화하려면 `.env.local`에 아래 값을 넣습니다.

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

Supabase SQL Editor에서 다음 테이블과 RLS 정책을 생성합니다.

```sql
create table if not exists public.block_packs (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text not null default '',
  block_ids integer[] not null default '{}',
  tag_ids text[] not null default '{}',
  created_at timestamptz not null,
  updated_at timestamptz not null
);

alter table public.block_packs enable row level security;

create policy "Users can read their own block packs"
on public.block_packs
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their own block packs"
on public.block_packs
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update their own block packs"
on public.block_packs
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their own block packs"
on public.block_packs
for delete
to authenticated
using (auth.uid() = user_id);
```

Supabase Authentication에서 Email provider를 켜고, Site URL에 개발 중에는 `http://localhost:3047`을 등록합니다.

이미 `block_packs` 테이블을 만든 뒤 조각 태그 기능을 추가하는 경우에는 아래 SQL만 추가로 실행합니다.

```sql
alter table public.block_packs
add column if not exists tag_ids text[] not null default '{}';
```

## 검사

```bash
npm run lint
npm run build
```
