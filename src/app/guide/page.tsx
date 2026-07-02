import Link from "next/link";
import type { ReactNode } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/common/Button";
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
    description: "답변의 길이, 형식, 톤을 조정하는 작은 옵션이에요.",
    examples: ["ELI5: 쉽게", "TL;DR: 짧게", "table: 표로", "redteam: 리스크 검토"],
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
    command: "???? + ELI5 + table:",
    shortRequest: "?? ??? ????.",
    longRequest: [
      "? ???? ??? ??? ??? ????.",
      "???? ??? ? ?? ?? ?????,",
      "?? ??? ?? ????.",
    ],
  },
  {
    command: "???? + ?????? + benefits:",
    shortRequest: "? ??? ?? ???? ????.",
    longRequest: [
      "? ??? ?? ??? ?? ??? ??? ??? ????.",
      "??? ???? ?? ??? ????,",
      "???? ??? ???? ?? ???? ????.",
    ],
  },
  {
    command: "??????? + mood + lighting:",
    shortRequest: "?? ???? ??? ??? ????? ???.",
    longRequest: [
      "?? ???? ??? ?? AI? ?? ? ?? ????? ???.",
      "??? ???? ?? ???? ???,",
      "?? ???? ???? ????? ????.",
    ],
  },
  {
    command: "???? + sources + evidence + next steps:",
    shortRequest: "?? ??? ?? ?? ???? ???? ?? ???? ????.",
    longRequest: [
      "?? ??? ?? ?? ????.",
      "???? ??? ???? ????,",
      "???? ??? ?? ??? ?? ????.",
      "????? ??? ??? ?? ?? ???? ????.",
    ],
  },
];

export default function GuidePage() {
  return (
    <PageShell className="py-14 [word-break:keep-all]">
      <header className="border-b border-border pb-16">
        <p className="mb-4 text-[13px] font-medium text-muted">사용 가이드</p>
        <h1 className="max-w-[980px] text-[34px] font-semibold leading-tight [text-wrap:balance] sm:text-[44px] lg:text-[48px]">
          매번 같은 프롬프트를 다시 쓰지 않도록
        </h1>
        <p className="mt-5 max-w-[720px] text-[15px] leading-[1.75] text-muted">
          프롬프트 블록은 자주 쓰는 AI 요청 방식을 짧은 블록으로 저장해두는 방법이에요.
          <br />
          블록팩으로 묶어 내가 사용하는 AI에 붙여넣어두면,
          <br />
          짧은 조합만으로 반복 작업을 빠르게 요청할 수 있어요.
        </p>
      </header>

      <main className="space-y-24 py-20">
        <section className="max-w-[820px]">
          <SectionHeading eyebrow="왜 필요한가요?" title="AI를 쓰다 보면 같은 말을 계속 반복하게 돼요." />
          <div className="mt-8 flex max-w-[720px] flex-wrap gap-2.5">
            {repeatedRequests.map((request) => (
              <span key={request} className="rounded-full border border-border bg-background px-4 py-2 text-[13px] text-foreground">
                {request}
              </span>
            ))}
          </div>
          <p className="mt-8 max-w-[640px] text-[15px] leading-[1.7] text-muted">
            프롬프트 블록은 이런 반복되는 요청 방식을 짧게 저장해두기 위한 방법이에요.
          </p>
        </section>

        <section>
          <SectionHeading eyebrow="핵심 개념" title="세 가지만 알면 돼요." />
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {concepts.map((concept) => (
              <article key={concept.title} className="rounded-[var(--radius-card)] border border-border bg-background p-5">
                <h3 className="text-[18px] font-semibold">{concept.title}</h3>
                <p className="mt-3 text-[14px] leading-[1.7] text-muted">{concept.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {concept.examples.map((example) => (
                    <span key={example} className="rounded-full bg-subtle px-3 py-1.5 text-[12px] text-muted">
                      {example}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-[900px]">
          <SectionHeading eyebrow="사용 방법" title="이렇게 사용해요." />
          <div className="mt-10 space-y-0">
            {steps.map((step, index) => (
              <TimelineStep key={step.title} index={index + 1} isLast={index === steps.length - 1}>
                <h3 className="text-[17px] font-semibold">{step.title}</h3>
                <p className="mt-2 max-w-[620px] text-[14px] leading-[1.7] text-muted">{step.description}</p>
              </TimelineStep>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading eyebrow="좋은 점" title="반복 작업이 가벼워져요." />
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {benefits.map((benefit) => (
              <article key={benefit.title} className="rounded-[var(--radius-card)] border border-border bg-background p-5">
                <h3 className="text-[15px] font-semibold leading-[1.5]">{benefit.title}</h3>
                <p className="mt-2 text-[13px] leading-[1.7] text-muted">{benefit.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-[900px]">
          <div className="rounded-[var(--radius-card)] border border-border bg-subtle p-6 sm:p-8">
            <h2 className="text-[24px] font-semibold [text-wrap:balance]">꼭 알아두세요.</h2>
            <p className="mt-5 max-w-[720px] text-[14px] leading-[1.7] text-foreground">
              블록팩 등록은 AI를 영구적으로 학습시키는 기능은 아니에요. 대화창에 붙여넣으면 보통 그 대화 안에서 작동하고,
              맞춤 지침이나 프로젝트 설정에 넣으면 반복해서 쓰기 더 좋아요.
            </p>
            <p className="mt-4 max-w-[720px] text-[13px] leading-[1.7] text-muted">
              AI 도구마다 지침을 기억하는 방식은 조금씩 달라요. 가장 안정적으로 쓰려면 새 대화에서 블록팩 등록 문구를 먼저 붙여넣거나,
              해당 AI의 맞춤 지침/프로젝트 설정에 넣어주세요.
            </p>
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
              <UseExampleCard
                key={example.command}
                command={example.command}
                shortRequest={example.shortRequest}
                longRequest={example.longRequest}
              />
            ))}
          </div>
        </section>
      </main>

      <section className="rounded-[var(--radius-card)] border border-border bg-background p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="max-w-[680px] text-[24px] font-semibold leading-tight [text-wrap:balance]">
              자주 쓰는 요청부터 블록팩으로 만들어보세요.
            </h2>
            <p className="mt-3 max-w-[620px] text-[14px] leading-[1.7] text-muted">
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
      {description ? <p className="mt-4 max-w-[640px] text-[14px] leading-[1.7] text-muted">{description}</p> : null}
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
