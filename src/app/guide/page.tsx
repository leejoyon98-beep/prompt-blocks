import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/common/Button";

const blockExamples = [
  { title: "핵심요약", description: "긴 내용에서 중요한 내용만 정리" },
  { title: "고객분석", description: "타깃 고객의 고민과 구매 이유 정리" },
  { title: "이미지프롬프트", description: "이미지 생성 AI에 넣을 문장으로 변환" },
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
    description: "처음부터 직접 만들거나, 추천 블록팩으로 빠르게 시작할 수 있어요.",
  },
  {
    title: "필요한 블록과 태그를 담아요",
    description: "자주 쓰는 작업 블록과 답변 방식을 골라 블록팩에 추가해요.",
  },
  {
    title: "사용하기를 눌러요",
    description: "선택한 블록과 태그의 의미가 담긴 등록 문구가 복사돼요.",
  },
  {
    title: "내가 쓰는 AI에 붙여넣어요",
    description: "ChatGPT, Claude, Gemini 같은 AI 대화창이나 맞춤 지침에 붙여넣어 사용할 수 있어요.",
  },
  {
    title: "짧은 조합으로 요청해요",
    description: "등록한 뒤에는 ‘핵심요약 + ELI5 + table’처럼 짧게 입력해도 원하는 방식으로 답변을 받을 수 있어요.",
  },
];

const benefits = [
  {
    title: "반복해서 쓰던 말을 줄일 수 있어요",
    description: "자주 쓰는 요청 방식을 블록팩으로 등록해두면 매번 긴 프롬프트를 다시 쓰지 않아도 돼요.",
  },
  {
    title: "답변 스타일을 더 일정하게 만들 수 있어요",
    description: "요약은 짧게, 설명은 쉽게, 검토는 냉정하게 같은 기준을 미리 정해둘 수 있어요.",
  },
  {
    title: "여러 요청을 쉽게 섞어 쓸 수 있어요",
    description: "고객분석 + 구매장벽분석 + benefits처럼 필요한 작업을 이어 붙여 사용할 수 있어요.",
  },
  {
    title: "AI 도구가 바뀌어도 활용할 수 있어요",
    description: "복사한 등록 문구를 붙여넣는 방식이라 여러 AI 도구에서 비슷하게 사용할 수 있어요.",
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
          매번 같은 프롬프트를 다시 쓰지 않도록
        </h1>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
          프롬프트 블록은 자주 쓰는 AI 요청 방식을 짧은 블록으로 저장해두는 방법이에요. 블록팩으로 묶어 내가
          사용하는 AI에 붙여넣어두면, 이후에는 짧은 조합만으로 반복 작업을 빠르게 요청할 수 있어요.
        </p>
      </header>

      <div className="divide-y divide-border">
        <GuideSection title="왜 필요한가요?">
          <p className="max-w-3xl text-[14px] leading-relaxed text-muted">
            AI를 쓰다 보면 비슷한 말을 계속 반복하게 돼요. ‘핵심만 요약해줘’, ‘표로 정리해줘’, ‘초보자도 이해하게
            설명해줘’, ‘리스크도 같이 봐줘’ 같은 요청은 거의 매번 다시 쓰게 됩니다. 프롬프트 블록은 이런 반복되는
            요청 방식을 짧게 저장해두기 위한 방법이에요.
          </p>
        </GuideSection>

        <GuideSection title="프롬프트 블록이 뭔가요?">
          <p className="max-w-3xl text-[14px] leading-relaxed text-muted">
            프롬프트 블록은 AI에게 일을 시키는 짧은 명령 조각이에요. 긴 요청문을 매번 새로 쓰는 대신, 자주 쓰는
            작업 방식을 짧은 이름으로 불러올 수 있게 해줍니다.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-2">
            {blockExamples.map((example) => (
              <ExampleLine key={example.title}>
                <span className="font-medium">{example.title}</span>: {example.description}
              </ExampleLine>
            ))}
          </div>
        </GuideSection>

        <GuideSection title="조각 태그는 뭔가요?">
          <p className="max-w-3xl text-[14px] leading-relaxed text-muted">
            조각 태그는 답변의 모양을 조정하는 작은 옵션이에요. 프롬프트 블록이 ‘무엇을 할지’를 정한다면, 조각
            태그는 ‘어떤 방식으로 답할지’를 정해줍니다.
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
            블록팩은 자주 쓰는 프롬프트 블록과 조각 태그를 묶어둔 나만의 AI 요청 세트예요. 업무별로 여러 개를
            만들어두면 상황에 맞게 꺼내 쓸 수 있어요.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {packExamples.map((example) => (
              <ExampleLine key={example}>{example}</ExampleLine>
            ))}
          </div>
        </GuideSection>

        <GuideSection title="어떻게 쓰나요?">
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
              블록팩 등록은 AI를 영구적으로 학습시키는 기능은 아니에요. 대화창에 붙여넣으면 보통 그 대화 안에서
              작동하고, 맞춤 지침이나 프로젝트 설정에 넣으면 반복해서 쓰기 더 좋아요.
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">
              AI 도구마다 지침을 기억하는 방식은 조금씩 달라요. 가장 안정적으로 쓰려면 새 대화에서 블록팩 등록
              문구를 먼저 붙여넣거나, 해당 AI의 맞춤 지침/프로젝트 설정에 넣어주세요.
            </p>
          </div>
        </GuideSection>

        <GuideSection title="이렇게 써볼 수 있어요">
          <p className="mb-4 max-w-3xl text-[14px] leading-relaxed text-muted">
            블록팩을 등록한 뒤에는 아래처럼 짧게 조합해서 요청할 수 있어요.
          </p>
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
            <h2 className="text-[20px] font-semibold tracking-tight">자주 쓰는 요청부터 블록팩으로 만들어보세요.</h2>
            <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-muted">
              처음부터 완벽하게 만들 필요는 없어요. 자주 쓰는 블록 몇 개만 담아도 반복 작업이 훨씬 가벼워집니다.
            </p>
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
