import Link from "next/link";
import type { ReactNode } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/common/Button";
import { TypewriterPromptBox } from "@/components/guide/TypewriterPromptBox";
import { UseExampleCard } from "@/components/guide/UseExampleCard";

const repeatedRequests = [
  "핵심만 요약해줘",
  "표로 정리해줘",
  "초보자도 이해하게 설명해줘",
  "리스크도 같이 봐줘",
  "문장을 자연스럽게 다듬어줘",
];

const concepts = [
  {
    title: "프롬프트 블록",
    description: "AI에게 무엇을 할지 알려주는 작업 단위예요.",
    examples: ["핵심요약", "고객분석", "이미지프롬프트"],
  },
  {
    title: "조각 태그",
    description: "AI가 어떤 방식으로 답할지 조정하는 옵션이에요.",
    examples: [
      "ELI5 · 아주 쉽게 설명",
      "TL;DR · 짧은 요약 먼저",
      "table · 표로 정리",
      "redteam · 약점과 리스크 검토",
      "polish · 문장을 자연스럽게 다듬기",
    ],
  },
  {
    title: "블록팩",
    description: "자주 쓰는 블록과 태그를 묶어둔 나만의 AI 요청 세트예요.",
    examples: ["상품기획 블록팩", "딥리서치 블록팩"],
  },
];

const steps = [
  { title: "블록팩을 만들어요", description: "직접 만들거나 추천 블록팩으로 시작해요." },
  { title: "필요한 블록과 태그를 담아요", description: "자주 쓰는 작업 방식과 답변 방식을 골라요." },
  { title: "사용하기를 눌러요", description: "블록팩 등록 문구가 클립보드에 복사돼요." },
  { title: "내가 쓰는 AI에 붙여넣어요", description: "ChatGPT, Claude, Gemini 같은 AI에 붙여넣어 사용할 수 있어요." },
  { title: "짧은 조합으로 요청해요", description: "이후에는 '핵심요약 + ELI5 + table'처럼 짧게 입력해도 돼요." },
];

const benefits = [
  { title: "반복해서 쓰던 말을 줄일 수 있어요", description: "자주 쓰는 요청 방식을 매번 다시 쓰지 않아도 돼요." },
  {
    title: "답변 스타일을 일정하게 유지할 수 있어요",
    description: "요약은 짧게, 설명은 쉽게, 검토는 냉정하게 같은 기준을 미리 정해둘 수 있어요.",
  },
  { title: "여러 요청을 쉽게 섞어 쓸 수 있어요", description: "고객분석 + 구매장벽분석 + benefits처럼 이어 붙여 사용할 수 있어요." },
  { title: "AI 도구가 바뀌어도 활용할 수 있어요", description: "복사한 등록 문구를 붙여넣는 방식이라 여러 AI에서 비슷하게 쓸 수 있어요." },
];

const useExamples = [
  {
    command: "핵심요약 + ELI5 + table",
    request: "긴 내용을 핵심만 쉽게, 표로 정리해줘.",
    details: [
      "핵심요약: 긴 내용에서 중요한 내용만 간단히 정리",
      "ELI5: 초보자도 이해할 수 있게 쉽게 설명",
      "table: 표 형식으로 정리",
    ],
  },
  {
    command: "고객분석 + 구매장벽분석 + benefits",
    request: "고객의 고민, 망설이는 이유, 체감 혜택까지 정리해줘.",
    details: [
      "고객분석: 타깃 고객의 니즈, 고민, 구매 동기 정리",
      "구매장벽분석: 구매를 망설이게 하는 이유 분석",
      "benefits: 기능보다 고객이 체감하는 혜택 중심으로 정리",
    ],
  },
  {
    command: "이미지프롬프트 + mood + lighting",
    request: "콘셉트, 분위기, 조명감까지 반영한 이미지 프롬프트로 바꿔줘.",
    details: [
      "이미지프롬프트: 이미지 생성 AI에 넣을 문장으로 변환",
      "mood: 원하는 분위기까지 반영",
      "lighting: 조명/광원 느낌까지 포함해서 정리",
    ],
  },
  {
    command: "딥리서치 + sources + evidence + next steps",
    request: "출처와 근거를 바탕으로 조사하고, 다음 액션까지 제안해줘.",
    details: [
      "딥리서치: 주제를 깊이 있게 조사",
      "sources: 출처를 함께 제시",
      "evidence: 주장보다 근거 중심으로 정리",
      "next steps: 다음에 할 행동까지 제안",
    ],
  },
];

export default function GuidePage() {
  return (
    <PageShell className="py-14 [word-break:keep-all]">
      <div className="mx-auto w-full max-w-[1200px]">
        <header className="border-b border-border pb-16">
          <p className="mb-4 text-[13px] font-medium text-muted">사용 가이드</p>
          <h1 className="max-w-[980px] text-[34px] font-semibold leading-tight [text-wrap:balance] sm:text-[44px] lg:text-[48px]">
            매번 같은 프롬프트를 다시 쓰지 않도록
          </h1>
          <p className="mt-5 max-w-[760px] text-[15px] leading-[1.62] text-muted">
            프롬프트 블록은 자주 쓰는 AI 요청 방식을 짧은 블록으로 저장해두는 방법이에요.
            <br />
            블록팩으로 묶어 내가 사용하는 AI에 붙여넣어두면,
            <br />
            짧은 조합만으로 반복 작업을 빠르게 요청할 수 있어요.
          </p>
        </header>

        <main className="space-y-24 py-20">
          <section>
            <SectionHeading eyebrow="왜 필요한가요?" title="AI를 쓰다 보면 같은 말을 계속 반복하게 돼요." />
            <TypewriterPromptBox phrases={repeatedRequests} />
            <p className="mt-8 max-w-[760px] text-[15px] leading-[1.62] text-muted">
              프롬프트 블록은 이런 반복되는 요청 방식을 짧게 저장해두기 위한 방법이에요.
            </p>
          </section>

          <section>
            <SectionHeading eyebrow="좋은 점" title="반복 작업이 가벼워져요." />
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {benefits.map((benefit) => (
                <article key={benefit.title} className="rounded-[var(--radius-card)] border border-border bg-background p-5">
                  <h3 className="text-[15px] font-semibold leading-[1.5]">{benefit.title}</h3>
                  <p className="mt-2 text-[13px] leading-[1.55] text-muted">{benefit.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <SectionHeading eyebrow="핵심 개념" title="세 가지만 알면 돼요." />
            <div className="mt-8 space-y-4">
              {concepts.map((concept, index) => (
                <article
                  key={concept.title}
                  className="grid gap-5 rounded-[var(--radius-card)] border border-border bg-background p-5 [word-break:keep-all] sm:p-6 lg:grid-cols-[220px_1fr]"
                >
                  <div>
                    <p className="text-[12px] font-medium text-muted">{index + 1}</p>
                    <h3 className="mt-2 text-[20px] font-semibold leading-tight">{concept.title}</h3>
                  </div>
                  <div>
                    <p className="max-w-[760px] text-[14px] leading-[1.55] text-muted">{concept.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {concept.examples.map((example) => (
                        <span
                          key={example}
                          className="whitespace-nowrap rounded-full bg-subtle px-3 py-1.5 text-[12px] text-muted [word-break:keep-all]"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section>
            <SectionHeading eyebrow="사용 방법" title="이렇게 사용해요." />
            <div className="mt-10">
              {steps.map((step, index) => (
                <TimelineStep key={step.title} index={index + 1} isLast={index === steps.length - 1}>
                  <h3 className="text-[17px] font-semibold">{step.title}</h3>
                  <p className="mt-2 max-w-[760px] text-[14px] leading-[1.62] text-muted">{step.description}</p>
                </TimelineStep>
              ))}
            </div>
          </section>

          <section>
            <SectionHeading
              eyebrow="사용 예시"
              title="이렇게 써볼 수 있어요."
              description="블록팩을 등록한 뒤에는 짧게 조합해서 요청할 수 있어요."
            />
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {useExamples.map((example) => (
                <UseExampleCard key={example.command} {...example} />
              ))}
            </div>
          </section>

          <section>
            <div className="rounded-[var(--radius-card)] border border-border bg-subtle p-6 sm:p-8">
              <h2 className="text-[24px] font-semibold [text-wrap:balance]">꼭 알아두세요.</h2>
              <p className="mt-5 max-w-[760px] text-[14px] leading-[1.62] text-foreground">
                블록팩 등록은 AI를 영구적으로 학습시키는 기능은 아니에요. 대화창에 붙여넣으면 보통 그 대화 안에서 작동하고,
                맞춤 지침이나 프로젝트 설정에 넣으면 반복해서 쓰기 더 좋아요.
              </p>
              <p className="mt-4 max-w-[760px] text-[13px] leading-[1.6] text-muted">
                AI 도구마다 지침을 기억하는 방식은 조금씩 달라요. 가장 안정적으로 쓰려면 새 대화에서 블록팩 등록 문구를 먼저 붙여넣거나,
                해당 AI의 맞춤 지침/프로젝트 설정에 넣어주세요.
              </p>
            </div>
          </section>
        </main>

        <section className="rounded-[var(--radius-card)] border border-border bg-background p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="max-w-[760px] text-[24px] font-semibold leading-tight [text-wrap:balance]">
                자주 쓰는 요청부터 블록팩으로 만들어보세요.
              </h2>
              <p className="mt-3 max-w-[760px] text-[14px] leading-[1.62] text-muted">
                처음부터 완벽하게 만들 필요는 없어요. 자주 쓰는 블록 몇 개만 담아도 반복 작업이 훨씬 가벼워집니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/packs">
                <Button variant="primary" size="md">내 블록팩으로 가기</Button>
              </Link>
              <Link href="/library">
                <Button variant="outline" size="md">블록 라이브러리 보기</Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div>
      <p className="text-[13px] font-medium text-muted">{eyebrow}</p>
      <h2 className="mt-3 max-w-[720px] text-[28px] font-semibold leading-tight [text-wrap:balance] sm:text-[34px]">
        {title}
      </h2>
      {description ? <p className="mt-4 max-w-[640px] text-[14px] leading-[1.62] text-muted">{description}</p> : null}
    </div>
  );
}

function TimelineStep({ index, isLast, children }: { index: number; isLast: boolean; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[56px_1fr] gap-5">
      <div className="flex flex-col items-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-[15px] font-semibold">
          {index}
        </div>
        {!isLast ? <div className="mt-3 h-14 w-px bg-border sm:h-16" /> : null}
      </div>
      <div className={isLast ? "pb-0" : "pb-8"}>{children}</div>
    </div>
  );
}
