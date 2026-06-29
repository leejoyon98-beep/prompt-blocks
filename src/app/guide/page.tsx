import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/common/Button";

const blockExamples = [
  "핵심요약 = 긴 내용에서 중요한 내용만 정리",
  "고객분석 = 타깃 고객의 니즈, 고민, 구매 동기 정리",
  "이미지프롬프트 = 이미지 생성 AI에 넣을 프롬프트로 변환",
];

const tagExamples = [
  { tag: "ELI5", text: "아주 쉽게 설명" },
  { tag: "TL;DR", text: "짧은 요약 먼저" },
  { tag: "table", text: "표로 정리" },
  { tag: "redteam", text: "약점과 리스크 검토" },
  { tag: "polish", text: "문장을 자연스럽게 다듬기" },
];

const packExamples = ["상품기획 블록팩", "이미지 작업 블록팩", "딥리서치 블록팩", "직장인 기본 블록팩"];

const steps = [
  {
    title: "블록팩을 만들어요",
    description: "새 블록팩을 만들거나 추천 블록팩으로 시작해요.",
  },
  {
    title: "블록과 태그를 조립해요",
    description: "필요한 프롬프트 블록과 조각 태그를 블록팩에 추가해요.",
  },
  {
    title: "사용하기 버튼을 눌러요",
    description: "블록팩 등록 문구가 클립보드에 복사돼요.",
  },
  {
    title: "내가 사용하는 AI에 붙여넣어요",
    description: "ChatGPT, Claude, Gemini 같은 AI 대화창이나 맞춤 지침에 붙여넣어요.",
  },
  {
    title: "짧은 조합으로 요청해요",
    description: "등록 후에는 핵심요약 + ELI5 + table 처럼 짧게 입력해도 돼요.",
  },
];

const benefits = [
  {
    title: "긴 프롬프트를 반복해서 쓰지 않아도 돼요",
    description: "자주 쓰는 작업 방식을 블록팩으로 등록해두면 반복 작업이 빨라져요.",
  },
  {
    title: "원하는 답변 방식을 일정하게 유지할 수 있어요",
    description: "요약, 표 정리, 쉬운 설명, 리스크 검토 같은 방식을 매번 다시 설명하지 않아도 돼요.",
  },
  {
    title: "여러 작업 의도를 쉽게 조합할 수 있어요",
    description: "고객분석 + 구매장벽분석 + benefits 처럼 필요한 작업을 이어 붙일 수 있어요.",
  },
  {
    title: "AI 도구가 바뀌어도 사용할 수 있어요",
    description: "복사한 블록팩 등록 문구를 내가 사용하는 AI에 붙여넣는 방식이라 여러 AI 도구에서 활용할 수 있어요.",
  },
];

const useExamples = [
  {
    command: "핵심요약 + ELI5 + table:",
    request: "아래 내용을 정리해줘.",
  },
  {
    command: "고객분석 + 구매장벽분석 + benefits:",
    request: "이 제품을 고객 관점에서 분석해줘.",
  },
  {
    command: "이미지프롬프트 + mood + lighting:",
    request: "아래 콘셉트를 이미지 생성용 프롬프트로 바꿔줘.",
  },
  {
    command: "딥리서치 + sources + evidence + next steps:",
    request: "아래 주제에 대해 근거 중심으로 조사하고 다음 액션까지 정리해줘.",
  },
];

export default function GuidePage() {
  return (
    <PageShell className="py-12">
      <header className="border-b border-border pb-10">
        <h1 className="max-w-3xl text-[36px] font-semibold leading-tight tracking-tight sm:text-[44px]">
          프롬프트 블록 사용 가이드
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
          프롬프트 블록은 자주 쓰는 AI 작업 방식을 짧은 명령 조각으로 저장해두고,
          필요할 때 조합해서 쓰는 방법이에요.
        </p>
      </header>

      <div className="divide-y divide-border">
        <GuideSection title="프롬프트 블록이 뭔가요?">
          <p className="max-w-3xl text-[14px] leading-relaxed text-muted">
            프롬프트 블록은 AI에게 ‘무엇을 해달라’고 요청하는 짧은 명령 조각이에요. 매번 긴 프롬프트를 새로 쓰는
            대신, 자주 쓰는 작업 방식을 짧은 이름으로 불러올 수 있어요.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-2">
            {blockExamples.map((example) => (
              <ExampleLine key={example}>{example}</ExampleLine>
            ))}
          </div>
        </GuideSection>

        <GuideSection title="조각 태그는 뭔가요?">
          <p className="max-w-3xl text-[14px] leading-relaxed text-muted">
            조각 태그는 AI가 ‘어떤 방식으로 답할지’ 조정하는 작은 옵션이에요. 프롬프트 블록이 작업의 종류를
            정한다면, 조각 태그는 답변의 방식, 길이, 형식, 톤을 정해요.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {tagExamples.map((item) => (
              <span
                key={item.tag}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-[12px] text-muted"
              >
                <span className="font-medium text-foreground">{item.tag}</span>: {item.text}
              </span>
            ))}
          </div>
        </GuideSection>

        <GuideSection title="블록팩은 뭔가요?">
          <p className="max-w-3xl text-[14px] leading-relaxed text-muted">
            블록팩은 자주 쓰는 프롬프트 블록과 조각 태그를 묶어둔 나만의 AI 사용 세트예요. 작업 목적별로 여러 개의
            블록팩을 만들어둘 수 있어요.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {packExamples.map((example) => (
              <ExampleLine key={example}>{example}</ExampleLine>
            ))}
          </div>
        </GuideSection>

        <GuideSection title="어떻게 사용하나요?">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-5">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-[var(--radius-card)] border border-border bg-background p-4">
                <span className="text-[12px] font-semibold text-muted">{index + 1}</span>
                <h3 className="mt-2 text-[14px] font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </GuideSection>

        <GuideSection title="쓰면 뭐가 좋은가요?">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-[var(--radius-card)] border border-border bg-background p-4">
                <h3 className="text-[14px] font-semibold tracking-tight">{benefit.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{benefit.description}</p>
              </div>
            ))}
          </div>
        </GuideSection>

        <GuideSection title="꼭 알아두세요">
          <div className="rounded-[var(--radius-card)] border border-border bg-subtle p-5">
            <p className="text-[14px] leading-relaxed text-foreground">
              블록팩 등록은 AI를 영구적으로 학습시키는 기능은 아니에요. 대화창에 붙여넣으면 해당 대화 안에서 주로
              작동하고, 맞춤 지침이나 프로젝트 설정에 넣으면 반복해서 사용하기 더 좋아요.
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">
              AI 도구마다 지침을 기억하는 방식은 다를 수 있어요. 가장 안정적으로 쓰려면 새 대화에서 블록팩 등록
              문구를 먼저 붙여넣거나, 해당 AI의 맞춤 지침/프로젝트 설정에 넣어주세요.
            </p>
          </div>
        </GuideSection>

        <GuideSection title="예를 들어 이렇게 쓸 수 있어요">
          <div className="rounded-[var(--radius-card)] border border-border bg-subtle p-4">
            <div className="space-y-4">
              {useExamples.map((example) => (
                <div key={example.command}>
                  <p className="font-mono text-[13px] font-medium text-foreground">{example.command}</p>
                  <p className="mt-1 text-[13px] text-muted">{example.request}</p>
                </div>
              ))}
            </div>
          </div>
        </GuideSection>
      </div>

      <section className="mt-12 rounded-[var(--radius-card)] border border-border bg-background p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-[20px] font-semibold tracking-tight">이제 블록팩을 만들어볼까요?</h2>
            <p className="mt-1 text-[13px] text-muted">내 블록팩에서 시작하거나 블록 라이브러리를 둘러보세요.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/packs">
              <Button variant="primary" size="md">
                내 블록팩으로 가기
              </Button>
            </Link>
            <Link href="/library">
              <Button variant="outline" size="md">
                블록 라이브러리 보기
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function GuideSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="py-10">
      <h2 className="text-[24px] font-semibold tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function ExampleLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-subtle px-4 py-3 text-[13px] leading-relaxed text-foreground">
      {children}
    </div>
  );
}
