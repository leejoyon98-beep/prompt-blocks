import type { PromptTag } from "@/types";

export const promptTags: PromptTag[] = [
  {
    "id": "tag_tldr",
    "type": "modifier",
    "category": "답변 구조",
    "tag": "TL;DR",
    "labelKo": "짧은 요약 먼저",
    "meaning": "긴 답변을 읽기 전에 핵심만 아주 짧게 먼저 요약",
    "promptText": "답변 맨 앞에 TL;DR 형식으로 핵심 내용을 아주 짧게 먼저 요약해줘.",
    "aliases": [
      "tldr",
      "tl;dr",
      "too long didn't read",
      "summary-first",
      "summary",
      "짧은 요약",
      "초압축 요약"
    ],
    "similarTags": [
      {
        "tag": "summary-first",
        "difference": "TL;DR은 긴 답변 앞에 붙는 1~2줄짜리 초압축 요약에 가까워요. summary-first는 답변을 결론 우선으로 구성하는 태그이고,"
      },
      {
        "tag": "concise",
        "difference": "TL;DR은 긴 답변 앞에 붙는 짧은 요약만 추가하는 태그예요. concise는 답변 전체를 짧고 간결하게 만드는 태그이고,"
      }
    ]
  },
  {
    "id": "tag_summary_first",
    "type": "modifier",
    "category": "답변 구조",
    "tag": "summary-first",
    "labelKo": "요약 먼저",
    "meaning": "답변 앞에 결론이나 핵심 요약을 먼저 제시",
    "promptText": "답변 맨 앞에 결론이나 핵심 요약을 먼저 제시해줘.",
    "aliases": [
      "summary first",
      "summary",
      "conclusion-first",
      "핵심 먼저",
      "결론 먼저",
      "요약 먼저"
    ],
    "similarTags": [
      {
        "tag": "TL;DR",
        "difference": "summary-first는 답변 전체를 결론 우선 구조로 정리하는 태그예요. TL;DR은 긴 답변 앞에 붙는 아주 짧은 압축 요약이고,"
      }
    ]
  },
  {
    "id": "tag_context_first",
    "type": "modifier",
    "category": "답변 구조",
    "tag": "context-first",
    "labelKo": "배경 먼저",
    "meaning": "답변 전에 필요한 배경과 맥락을 먼저 설명",
    "promptText": "본론에 들어가기 전에 필요한 배경과 맥락을 먼저 설명해줘.",
    "aliases": [
      "context",
      "background",
      "맥락",
      "배경"
    ]
  },
  {
    "id": "tag_compare",
    "type": "modifier",
    "category": "답변 구조",
    "tag": "compare",
    "labelKo": "비교해서 설명",
    "meaning": "여러 대상의 차이와 공통점을 비교해서 설명",
    "promptText": "여러 대상을 기준별로 비교해서 차이와 공통점을 설명해줘.",
    "aliases": [
      "comparison",
      "비교",
      "대조"
    ]
  },
  {
    "id": "tag_pros_cons",
    "type": "modifier",
    "category": "답변 구조",
    "tag": "pros-cons",
    "labelKo": "장단점",
    "meaning": "장점과 단점으로 나누어 균형 있게 정리",
    "promptText": "장점과 단점을 나누어 균형 있게 정리해줘.",
    "aliases": [
      "proscons",
      "pros & cons",
      "장단점"
    ]
  },
  {
    "id": "tag_priority",
    "type": "modifier",
    "category": "답변 구조",
    "tag": "priority",
    "labelKo": "우선순위",
    "meaning": "중요도나 시급도 기준으로 우선순위를 정리",
    "promptText": "중요도와 시급도를 고려해서 우선순위대로 정리해줘.",
    "aliases": [
      "prioritize",
      "ranking",
      "우선정리"
    ]
  },
  {
    "id": "tag_criteria",
    "type": "modifier",
    "category": "답변 구조",
    "tag": "criteria",
    "labelKo": "판단 기준",
    "meaning": "선택이나 평가에 필요한 기준을 먼저 제시",
    "promptText": "판단 기준을 먼저 세우고 그 기준에 따라 정리해줘.",
    "aliases": [
      "standard",
      "evaluation",
      "기준"
    ]
  },
  {
    "id": "tag_framework",
    "type": "modifier",
    "category": "답변 구조",
    "tag": "framework",
    "labelKo": "프레임워크",
    "meaning": "구조화된 프레임워크나 틀에 맞춰 정리",
    "promptText": "내용을 이해하기 쉬운 프레임워크나 구조로 나누어 정리해줘.",
    "aliases": [
      "structure",
      "lens",
      "프레임"
    ]
  },
  {
    "id": "tag_flow",
    "type": "modifier",
    "category": "답변 구조",
    "tag": "flow",
    "labelKo": "자연스러운 흐름",
    "meaning": "내용이 앞뒤로 자연스럽게 이어지도록 정리",
    "promptText": "내용의 흐름이 자연스럽게 이어지도록 순서와 연결을 다듬어줘.",
    "aliases": [
      "narrative flow",
      "흐름",
      "연결"
    ]
  },
  {
    "id": "tag_one_liner",
    "type": "modifier",
    "category": "답변 구조",
    "tag": "one-liner",
    "labelKo": "한 문장 요약",
    "meaning": "핵심을 한 문장으로 압축",
    "promptText": "핵심 내용을 한 문장으로 압축해서 제시해줘.",
    "aliases": [
      "one sentence",
      "한줄요약",
      "한 문장"
    ]
  },
  {
    "id": "tag_decision",
    "type": "modifier",
    "category": "답변 구조",
    "tag": "decision",
    "labelKo": "의사결정 도움",
    "meaning": "선택이나 의사결정을 도와주는 방식으로 정리",
    "promptText": "선택을 쉽게 할 수 있도록 기준, 리스크, 추천안을 함께 정리해줘.",
    "aliases": [
      "recommendation",
      "decision support",
      "결정"
    ]
  },
  {
    "id": "tag_eli5",
    "type": "modifier",
    "category": "설명 방식",
    "tag": "eli5",
    "labelKo": "쉽게 설명",
    "meaning": "어려운 내용을 초보자도 이해할 수 있게 풀어서 설명",
    "promptText": "초보자도 이해할 수 있도록 쉬운 말과 간단한 비유로 설명해줘.",
    "aliases": [
      "ELI5",
      "easy",
      "beginner",
      "쉽게"
    ]
  },
  {
    "id": "tag_deep_dive",
    "type": "modifier",
    "category": "설명 방식",
    "tag": "deep-dive",
    "labelKo": "깊게 설명",
    "meaning": "원리, 맥락, 배경까지 깊게 설명",
    "promptText": "표면적인 요약에 그치지 말고 원리와 맥락까지 깊게 설명해줘.",
    "aliases": [
      "deepdive",
      "in-depth",
      "깊게"
    ]
  },
  {
    "id": "tag_steps",
    "type": "modifier",
    "category": "설명 방식",
    "tag": "step-by-step",
    "labelKo": "단계별 설명",
    "meaning": "순서대로 따라 할 수 있게 단계별로 설명",
    "promptText": "순서대로 따라 할 수 있게 단계별로 설명해줘.",
    "aliases": [
      "steps",
      "step by step",
      "process",
      "단계별"
    ],
    "similarTags": [
      {
        "tag": "timeline",
        "difference": "step-by-step은 사용자가 따라 할 수 있는 절차를 단계별로 설명해요. timeline은 시간 순서와 기간을 중심으로 정리하고,"
      },
      {
        "tag": "roadmap",
        "difference": "step-by-step은 당장 수행할 세부 절차에 더 가까워요. roadmap은 중장기 흐름을 큰 단계로 보여주고,"
      }
    ]
  },
  {
    "id": "tag_examples",
    "type": "modifier",
    "category": "설명 방식",
    "tag": "example-heavy",
    "labelKo": "예시 중심",
    "meaning": "설명보다 예시를 많이 넣어 이해하기 쉽게 제시",
    "promptText": "설명만 하지 말고 이해하기 쉬운 예시를 충분히 넣어줘.",
    "aliases": [
      "examples",
      "sample",
      "case",
      "예시"
    ]
  },
  {
    "id": "tag_analogy",
    "type": "modifier",
    "category": "설명 방식",
    "tag": "analogy",
    "labelKo": "비유로 설명",
    "meaning": "어려운 개념을 비유를 들어 설명",
    "promptText": "어려운 개념은 직관적인 비유를 들어 설명해줘.",
    "aliases": [
      "metaphor",
      "비유"
    ]
  },
  {
    "id": "tag_plain_language",
    "type": "modifier",
    "category": "설명 방식",
    "tag": "plain-language",
    "labelKo": "쉬운 말",
    "meaning": "전문 용어나 어려운 표현을 줄이고 쉽게 작성",
    "promptText": "어려운 표현과 전문 용어를 줄이고 쉬운 말로 작성해줘.",
    "aliases": [
      "plain",
      "easy words",
      "쉬운말"
    ]
  },
  {
    "id": "tag_technical",
    "type": "modifier",
    "category": "설명 방식",
    "tag": "technical",
    "labelKo": "전문가용",
    "meaning": "실무자나 전문가가 볼 수 있게 정확하고 전문적으로 작성",
    "promptText": "실무자나 전문가가 볼 수 있게 정확한 용어와 근거를 사용해 설명해줘.",
    "aliases": [
      "expert",
      "professional",
      "전문가"
    ]
  },
  {
    "id": "tag_practical",
    "type": "modifier",
    "category": "설명 방식",
    "tag": "practical",
    "labelKo": "실무 적용",
    "meaning": "실제 적용 방법과 활용 예시 위주로 설명",
    "promptText": "이론보다 실제 적용 방법과 활용 예시 위주로 설명해줘.",
    "aliases": [
      "hands-on",
      "실무",
      "적용"
    ]
  },
  {
    "id": "tag_why",
    "type": "modifier",
    "category": "설명 방식",
    "tag": "why",
    "labelKo": "이유까지 설명",
    "meaning": "결론뿐 아니라 왜 그런지 이유까지 설명",
    "promptText": "결론만 말하지 말고 왜 그런지 이유와 근거를 함께 설명해줘.",
    "aliases": [
      "reason",
      "rationale",
      "왜"
    ]
  },
  {
    "id": "tag_mistakes",
    "type": "modifier",
    "category": "설명 방식",
    "tag": "mistakes",
    "labelKo": "실수 포함",
    "meaning": "자주 하는 실수와 피해야 할 점을 함께 설명",
    "promptText": "자주 하는 실수와 피해야 할 점도 함께 짚어줘.",
    "aliases": [
      "pitfalls",
      "common mistakes",
      "실수"
    ]
  },
  {
    "id": "tag_concise",
    "type": "modifier",
    "category": "문체/톤",
    "tag": "concise",
    "labelKo": "간결하게",
    "meaning": "불필요한 설명을 줄이고 핵심만 압축",
    "promptText": "중복과 장황한 설명을 줄이고 간결하게 답해줘.",
    "aliases": [
      "brief",
      "compact",
      "간단히"
    ],
    "similarTags": [
      {
        "tag": "TL;DR",
        "difference": "concise는 답변 전체의 길이와 표현을 간결하게 줄이는 태그예요. TL;DR은 답변 앞에 초압축 요약을 붙이고,"
      }
    ]
  },
  {
    "id": "tag_polish",
    "type": "modifier",
    "category": "문체/톤",
    "tag": "polish",
    "labelKo": "문장 다듬기",
    "meaning": "거친 초안을 자연스럽고 매끄럽게 정리",
    "promptText": "문장을 자연스럽고 매끄럽게 다듬되 의미는 바꾸지 말아줘.",
    "aliases": [
      "refine",
      "다듬기"
    ],
    "similarTags": [
      {
        "tag": "rewrite",
        "difference": "polish는 기존 문장의 결을 살리면서 매끄럽게 다듬는 태그예요. rewrite는 같은 의미를 유지하며 문장을 다시 쓰는 쪽이고,"
      },
      {
        "tag": "humanize",
        "difference": "polish는 문장 자체를 매끄럽게 정리하는 태그예요. humanize는 AI처럼 균일하고 과하게 정돈된 느낌을 줄이는 태그이고,"
      }
    ]
  },
  {
    "id": "tag_humanize",
    "type": "modifier",
    "category": "??/?",
    "tag": "humanize",
    "labelKo": "AI? ???",
    "meaning": "AI ???? ??? ??? ???, ??? ??? ??? ????? ??? ??? ??",
    "promptText": "AI ???? ???? ???? ??? ??? ???, ??? ?? ??? ??? ??? ????? ????. ?? ??? ?? ???? ??? ??, ?? ???? ?? ???, ? ???? ????? ???? ??? ????. ??? ??? ????? ?? ??, ??, ???, ?? ??, ????? ?? ??? ???? ???? ???. ???? ??? ?? ?? ??? ??? ??? ????. ?? ??? ??, ??, ?? ?? ??? ???? ?? ??, ???? ??, ??, ??, ?? ??? ?? ??? ????? ????. ?? ??? ?? ?? ???? ??? ?? ?? ??, ?? ??? ??? ???, ???? ??? ?? ??? ???? ????. ?????? ???? ??? ??? ??? ?? ???? ??? ????, ??? ????, ?? ?????, ??? ??? ?? ??? ??? ????. ?? ??? ??? ?? 1??, 2??, ??? ?? ????. ?, ????? ??? ?? ??? ??? ??? ??? ?????? ??, ???, ??, ????, ???, ?? ??? ???? ???. ?? ???? ???? ????? ????.",
    "aliases": [
      "AI? ???",
      "? AI???",
      "????",
      "?????",
      "?? ??",
      "????? ?",
      "??? ? ???",
      "?? ?? ??",
      "human",
      "natural",
      "natural-writing",
      "less-ai",
      "AI ?? ???"
    ],
    "similarTags": [
      {
        "tag": "polish",
        "difference": "humanize? ?? ??, ??, ??, ?? ???? ??? AI ???? ??? ??? ??? ??. polish? ??? ???? ??? ??."
      },
      {
        "tag": "rewrite",
        "difference": "humanize? ??? ????? ??? ??? ??? ????? ??? ???? ??? ??. rewrite? ?? ??? ?? ?? ??."
      },
      {
        "tag": "concise",
        "difference": "humanize? ? ?? ????? ?? ??? ?? ??? ????? ??? ??? ??. concise? ?? ??? ?? ???? ??? ??."
      }
    ]
  },
  {
    "id": "tag_tone_formal",
    "type": "modifier",
    "category": "문체/톤",
    "tag": "formal",
    "labelKo": "격식 있게",
    "meaning": "보고서나 업무 문서에 맞는 단정한 톤으로 작성",
    "promptText": "업무 문서에 어울리도록 단정하고 격식 있는 톤으로 답해줘.",
    "aliases": [
      "business",
      "격식"
    ]
  },
  {
    "id": "tag_tone_casual",
    "type": "modifier",
    "category": "문체/톤",
    "tag": "casual",
    "labelKo": "편한 톤",
    "meaning": "딱딱하지 않고 자연스럽고 편한 말투로 작성",
    "promptText": "너무 딱딱하지 않게 자연스럽고 편한 톤으로 답해줘.",
    "aliases": [
      "편한",
      "친근"
    ]
  },
  {
    "id": "tag_friendly",
    "type": "modifier",
    "category": "문체/톤",
    "tag": "friendly",
    "labelKo": "친근하게",
    "meaning": "부담 없고 친근한 말투로 작성",
    "promptText": "읽는 사람이 편하게 느끼도록 친근한 톤으로 작성해줘.",
    "aliases": [
      "warm",
      "human",
      "친근"
    ]
  },
  {
    "id": "tag_confident",
    "type": "modifier",
    "category": "문체/톤",
    "tag": "confident",
    "labelKo": "확신 있게",
    "meaning": "우물쭈물하지 않고 단정하고 확신 있는 문체로 작성",
    "promptText": "표현을 더 단정하고 확신 있게 정리해줘.",
    "aliases": [
      "assertive",
      "확신"
    ]
  },
  {
    "id": "tag_neutral",
    "type": "modifier",
    "category": "문체/톤",
    "tag": "neutral",
    "labelKo": "중립적으로",
    "meaning": "감정이나 편향을 줄이고 중립적인 톤으로 작성",
    "promptText": "감정적 표현이나 편향을 줄이고 중립적인 톤으로 작성해줘.",
    "aliases": [
      "balanced",
      "objective",
      "중립"
    ]
  },
  {
    "id": "tag_premium",
    "type": "modifier",
    "category": "문체/톤",
    "tag": "premium",
    "labelKo": "고급스럽게",
    "meaning": "세련되고 고급스러운 느낌의 문체로 작성",
    "promptText": "세련되고 고급스러운 느낌이 나도록 문장을 정리해줘.",
    "aliases": [
      "luxury",
      "고급"
    ]
  },
  {
    "id": "tag_editorial",
    "type": "modifier",
    "category": "문체/톤",
    "tag": "editorial",
    "labelKo": "에디토리얼 톤",
    "meaning": "매거진이나 에디토리얼처럼 감도 있게 작성",
    "promptText": "매거진이나 에디토리얼 문체처럼 감도 있게 작성해줘.",
    "aliases": [
      "magazine",
      "editorial tone",
      "매거진"
    ]
  },
  {
    "id": "tag_minimal",
    "type": "modifier",
    "category": "문체/톤",
    "tag": "minimal",
    "labelKo": "미니멀하게",
    "meaning": "군더더기 없이 최소한의 표현으로 정리",
    "promptText": "군더더기 없이 꼭 필요한 표현만 남겨 미니멀하게 정리해줘.",
    "aliases": [
      "simple",
      "minimalist",
      "미니멀"
    ]
  },
  {
    "id": "tag_redteam",
    "type": "modifier",
    "category": "검토/개선",
    "tag": "redteam",
    "labelKo": "비판적으로 검토",
    "meaning": "허점, 반례, 리스크, 놓친 전제를 찾아서 점검",
    "promptText": "결과를 비판적으로 검토하고 허점, 반례, 리스크, 놓친 전제를 짚어줘.",
    "aliases": [
      "critique",
      "검토"
    ],
    "similarTags": [
      {
        "tag": "risk",
        "difference": "redteam은 허점, 반례, 놓친 전제까지 더 공격적으로 검토해요. risk는 예상 위험 요소를 정리하고,"
      },
      {
        "tag": "edge-cases",
        "difference": "redteam은 결과 전체의 논리적 약점과 반박 가능성까지 점검해요. edge-cases는 예외 상황을 찾는 태그이고,"
      }
    ]
  },
  {
    "id": "tag_checklist",
    "type": "modifier",
    "category": "검토/개선",
    "tag": "checklist",
    "labelKo": "체크리스트",
    "meaning": "확인해야 할 항목을 체크리스트로 제시",
    "promptText": "실행하거나 검토할 항목은 체크리스트로 정리해줘.",
    "aliases": [
      "list",
      "체크"
    ]
  },
  {
    "id": "tag_qa_check",
    "type": "modifier",
    "category": "검토/개선",
    "tag": "qa-check",
    "labelKo": "품질 점검",
    "meaning": "결과물의 품질과 누락된 부분을 점검",
    "promptText": "결과물의 품질, 누락, 오류 가능성을 점검해줘.",
    "aliases": [
      "qa",
      "quality check",
      "품질"
    ]
  },
  {
    "id": "tag_risk",
    "type": "modifier",
    "category": "검토/개선",
    "tag": "risk",
    "labelKo": "위험 요소",
    "meaning": "위험 요소와 주의해야 할 점을 분석",
    "promptText": "위험 요소, 부작용, 주의해야 할 점을 분석해줘.",
    "aliases": [
      "risks",
      "risk analysis",
      "리스크"
    ],
    "similarTags": [
      {
        "tag": "redteam",
        "difference": "risk는 예상되는 위험 요소와 주의점을 정리하는 데 집중해요. redteam은 허점과 반례까지 비판적으로 검토하고,"
      },
      {
        "tag": "edge-cases",
        "difference": "risk는 그로 인해 생길 수 있는 위험을 정리해요. edge-cases는 특수하거나 놓치기 쉬운 상황을 보고,"
      }
    ]
  },
  {
    "id": "tag_edge_cases",
    "type": "modifier",
    "category": "검토/개선",
    "tag": "edge-cases",
    "labelKo": "예외 상황",
    "meaning": "예외 상황과 특수 케이스를 검토",
    "promptText": "일반적인 경우뿐 아니라 예외 상황과 특수 케이스도 검토해줘.",
    "aliases": [
      "edge case",
      "exceptions",
      "예외"
    ],
    "similarTags": [
      {
        "tag": "risk",
        "difference": "edge-cases는 일반적인 흐름에서 벗어나는 예외 상황을 찾는 데 초점이 있어요. risk는 위험 요소를 정리하고,"
      },
      {
        "tag": "redteam",
        "difference": "edge-cases는 빠뜨리기 쉬운 특수 케이스를 보완해요. redteam은 전체 논리와 전제를 비판적으로 공격해보고,"
      }
    ]
  },
  {
    "id": "tag_improve",
    "type": "modifier",
    "category": "검토/개선",
    "tag": "improve",
    "labelKo": "개선안",
    "meaning": "현재 내용의 부족한 점을 보완하고 개선안을 제안",
    "promptText": "부족한 점을 짚고 더 나은 개선안을 제안해줘.",
    "aliases": [
      "improvement",
      "개선"
    ]
  },
  {
    "id": "tag_simplify",
    "type": "modifier",
    "category": "검토/개선",
    "tag": "simplify",
    "labelKo": "단순화",
    "meaning": "복잡한 내용을 더 단순하고 이해하기 쉽게 정리",
    "promptText": "복잡한 내용을 더 단순하고 이해하기 쉽게 정리해줘.",
    "aliases": [
      "simpler",
      "단순화"
    ]
  },
  {
    "id": "tag_clarify",
    "type": "modifier",
    "category": "검토/개선",
    "tag": "clarify",
    "labelKo": "명확화",
    "meaning": "애매한 표현이나 흐릿한 논리를 명확하게 정리",
    "promptText": "애매한 표현과 흐릿한 논리를 더 명확하게 정리해줘.",
    "aliases": [
      "clear",
      "clarity",
      "명확"
    ]
  },
  {
    "id": "tag_rewrite",
    "type": "modifier",
    "category": "검토/개선",
    "tag": "rewrite",
    "labelKo": "재작성",
    "meaning": "같은 의미를 유지하면서 더 좋은 문장으로 재작성",
    "promptText": "의미는 유지하되 더 자연스럽고 좋은 문장으로 재작성해줘.",
    "aliases": [
      "rephrase",
      "다시쓰기",
      "polish"
    ],
    "similarTags": [
      {
        "tag": "polish",
        "difference": "rewrite는 같은 의미를 유지하면서 문장 구조나 표현을 더 크게 바꿀 수 있어요. polish는 기존 문장을 매끄럽게 다듬고,"
      },
      {
        "tag": "humanize",
        "difference": "rewrite는 같은 내용을 다른 문장으로 다시 쓰는 데 초점이 있어요. humanize는 AI식으로 평탄한 느낌을 줄이는 데 초점이 있고,"
      }
    ]
  },
  {
    "id": "tag_tighten",
    "type": "modifier",
    "category": "검토/개선",
    "tag": "tighten",
    "labelKo": "밀도 있게 압축",
    "meaning": "중복을 줄이고 문장의 밀도를 높여 압축",
    "promptText": "중복을 줄이고 문장의 밀도를 높여 더 탄탄하게 압축해줘.",
    "aliases": [
      "compress",
      "shorten",
      "압축"
    ]
  },
  {
    "id": "tag_table",
    "type": "modifier",
    "category": "출력 형식",
    "tag": "table",
    "labelKo": "표로 정리",
    "meaning": "비교, 목록, 항목을 표 형태로 정리",
    "promptText": "비교하거나 정리할 내용은 표로 구성해줘.",
    "aliases": [
      "matrix",
      "표"
    ],
    "similarTags": [
      {
        "tag": "bullets",
        "difference": "table은 기준별 비교나 항목 정리에 맞게 행과 열로 구조화해요. bullets는 핵심을 목록으로 빠르게 나열하고,"
      },
      {
        "tag": "numbered",
        "difference": "table은 순서보다 비교와 분류가 중요할 때 좋아요. numbered는 순서가 중요한 내용을 번호로 정리하고,"
      }
    ]
  },
  {
    "id": "tag_bullets",
    "type": "modifier",
    "category": "출력 형식",
    "tag": "bullets",
    "labelKo": "불릿",
    "meaning": "핵심을 불릿 목록으로 정리",
    "promptText": "핵심 내용을 불릿 목록으로 정리해줘.",
    "aliases": [
      "bullet points",
      "list",
      "불릿"
    ],
    "similarTags": [
      {
        "tag": "table",
        "difference": "bullets는 핵심 항목을 가볍게 훑을 수 있게 나열해요. table은 행과 열로 비교하거나 분류하고,"
      },
      {
        "tag": "numbered",
        "difference": "bullets는 순서보다 핵심 항목 나열이 중요할 때 맞아요. numbered는 순서가 중요한 목록에 맞고,"
      }
    ]
  },
  {
    "id": "tag_numbered",
    "type": "modifier",
    "category": "출력 형식",
    "tag": "numbered",
    "labelKo": "번호 목록",
    "meaning": "순서가 있는 내용을 번호 목록으로 정리",
    "promptText": "순서가 중요한 내용은 번호 목록으로 정리해줘.",
    "aliases": [
      "numbered list",
      "번호"
    ],
    "similarTags": [
      {
        "tag": "bullets",
        "difference": "numbered는 단계나 우선순위처럼 순서가 중요한 내용을 정리해요. bullets는 순서 없는 핵심 목록에 가깝고,"
      },
      {
        "tag": "table",
        "difference": "numbered는 읽는 순서나 실행 순서가 중요할 때 적합해요. table은 비교와 분류에 강하고,"
      }
    ]
  },
  {
    "id": "tag_template",
    "type": "modifier",
    "category": "출력 형식",
    "tag": "template",
    "labelKo": "템플릿",
    "meaning": "바로 복사해 쓸 수 있는 템플릿 형태로 작성",
    "promptText": "바로 복사해 쓸 수 있는 템플릿 형태로 작성해줘.",
    "aliases": [
      "format",
      "템플릿"
    ]
  },
  {
    "id": "tag_script",
    "type": "modifier",
    "category": "출력 형식",
    "tag": "script",
    "labelKo": "스크립트",
    "meaning": "말로 읽을 수 있는 대본이나 스크립트 형태로 작성",
    "promptText": "말로 읽을 수 있는 자연스러운 스크립트 형태로 작성해줘.",
    "aliases": [
      "대본",
      "speech"
    ]
  },
  {
    "id": "tag_email",
    "type": "modifier",
    "category": "출력 형식",
    "tag": "email",
    "labelKo": "이메일",
    "meaning": "이메일 제목, 인사, 본문, 마무리 형식으로 작성",
    "promptText": "이메일 제목, 인사, 본문, 마무리를 갖춘 이메일 형식으로 작성해줘.",
    "aliases": [
      "mail",
      "메일"
    ]
  },
  {
    "id": "tag_brief",
    "type": "modifier",
    "category": "출력 형식",
    "tag": "brief",
    "labelKo": "브리프",
    "meaning": "목적, 배경, 요구사항이 보이는 작업 브리프 형태로 정리",
    "promptText": "목적, 배경, 요구사항, 산출물을 포함한 작업 브리프 형태로 정리해줘.",
    "aliases": [
      "creative brief",
      "브리프"
    ]
  },
  {
    "id": "tag_md",
    "type": "modifier",
    "category": "출력 형식",
    "tag": "md",
    "labelKo": "마크다운",
    "meaning": "마크다운 문서 구조로 정리",
    "promptText": "제목, 소제목, 목록을 활용해 마크다운 문서로 정리해줘.",
    "aliases": [
      "markdown",
      "마크다운"
    ]
  },
  {
    "id": "tag_json",
    "type": "modifier",
    "category": "출력 형식",
    "tag": "json",
    "labelKo": "JSON",
    "meaning": "기계가 읽기 쉬운 JSON 구조로 정리",
    "promptText": "결과를 유효한 JSON 구조로 정리해줘.",
    "aliases": [
      "structured json",
      "제이슨"
    ]
  },
  {
    "id": "tag_next_steps",
    "type": "modifier",
    "category": "업무/실행",
    "tag": "next-steps",
    "labelKo": "다음 액션",
    "meaning": "답변 끝에 바로 실행할 수 있는 다음 단계 제안",
    "promptText": "답변 끝에 바로 실행할 수 있는 다음 액션을 짧게 정리해줘.",
    "aliases": [
      "next steps",
      "action",
      "next",
      "다음 액션"
    ]
  },
  {
    "id": "tag_todo",
    "type": "modifier",
    "category": "업무/실행",
    "tag": "todo",
    "labelKo": "할 일 목록",
    "meaning": "해야 할 일을 실행 가능한 목록으로 정리",
    "promptText": "해야 할 일을 실행 가능한 할 일 목록으로 정리해줘.",
    "aliases": [
      "to-do",
      "task list",
      "할일"
    ]
  },
  {
    "id": "tag_timeline",
    "type": "modifier",
    "category": "업무/실행",
    "tag": "timeline",
    "labelKo": "일정 흐름",
    "meaning": "순서와 기간을 고려해 실행 흐름을 정리",
    "promptText": "작업 순서와 예상 기간을 고려해 타임라인으로 정리해줘.",
    "aliases": [
      "schedule",
      "일정"
    ],
    "similarTags": [
      {
        "tag": "step-by-step",
        "difference": "timeline은 언제 무엇을 할지 시간 순서와 기간을 중심으로 정리해요. step-by-step은 따라 할 절차를 설명하고,"
      },
      {
        "tag": "roadmap",
        "difference": "timeline은 더 구체적인 시간 순서와 일정감에 초점이 있어요. roadmap은 중장기 방향과 단계 흐름을 보여주고,"
      }
    ]
  },
  {
    "id": "tag_owner",
    "type": "modifier",
    "category": "업무/실행",
    "tag": "owner",
    "labelKo": "담당자",
    "meaning": "담당자나 역할별로 해야 할 일을 정리",
    "promptText": "담당자나 역할별로 해야 할 일을 나누어 정리해줘.",
    "aliases": [
      "role",
      "담당"
    ]
  },
  {
    "id": "tag_priority_plan",
    "type": "modifier",
    "category": "업무/실행",
    "tag": "priority-plan",
    "labelKo": "우선 실행 계획",
    "meaning": "우선순위를 기준으로 실행 계획을 정리",
    "promptText": "우선순위를 기준으로 실행 계획을 정리해줘.",
    "aliases": [
      "prioritized plan",
      "우선계획"
    ]
  },
  {
    "id": "tag_quick_win",
    "type": "modifier",
    "category": "업무/실행",
    "tag": "quick-win",
    "labelKo": "빠른 성과",
    "meaning": "빠르게 성과를 낼 수 있는 항목을 제안",
    "promptText": "가장 빠르게 성과를 낼 수 있는 quick win 항목을 제안해줘.",
    "aliases": [
      "quick wins",
      "빠른성과"
    ]
  },
  {
    "id": "tag_roadmap",
    "type": "modifier",
    "category": "업무/실행",
    "tag": "roadmap",
    "labelKo": "로드맵",
    "meaning": "중장기 실행 흐름을 단계별로 정리",
    "promptText": "중장기 실행 흐름을 단계별 로드맵으로 정리해줘.",
    "aliases": [
      "plan",
      "로드맵"
    ],
    "similarTags": [
      {
        "tag": "timeline",
        "difference": "roadmap은 장기적인 방향과 단계별 흐름을 더 크게 보여줘요. timeline은 시간 순서와 기간을 구체적으로 잡고,"
      },
      {
        "tag": "step-by-step",
        "difference": "roadmap은 목표까지 가는 큰 단계와 흐름을 정리해요. step-by-step은 바로 따라 할 절차에 가깝고,"
      }
    ]
  },
  {
    "id": "tag_estimate",
    "type": "modifier",
    "category": "업무/실행",
    "tag": "estimate",
    "labelKo": "추정",
    "meaning": "시간, 비용, 난이도를 대략적으로 추정",
    "promptText": "필요한 시간, 비용, 난이도를 대략적으로 추정해줘.",
    "aliases": [
      "estimation",
      "추정"
    ]
  },
  {
    "id": "tag_actionable",
    "type": "modifier",
    "category": "업무/실행",
    "tag": "actionable",
    "labelKo": "실행 가능하게",
    "meaning": "추상적인 내용을 바로 실행 가능한 행동으로 바꾸기",
    "promptText": "추상적인 내용을 바로 실행 가능한 행동 단위로 바꿔줘.",
    "aliases": [
      "action items",
      "실행"
    ]
  },
  {
    "id": "tag_handoff",
    "type": "modifier",
    "category": "업무/실행",
    "tag": "handoff",
    "labelKo": "인수인계",
    "meaning": "다른 사람에게 넘길 수 있게 맥락과 할 일을 정리",
    "promptText": "다른 사람이 이어받을 수 있도록 맥락, 결정사항, 다음 할 일을 정리해줘.",
    "aliases": [
      "handover",
      "인수인계"
    ]
  },
  {
    "id": "tag_sources",
    "type": "modifier",
    "category": "리서치/근거",
    "tag": "sources",
    "labelKo": "출처 포함",
    "meaning": "참고한 출처나 확인해야 할 자료를 함께 제시",
    "promptText": "가능하면 참고한 출처나 확인해야 할 자료를 함께 제시해줘.",
    "aliases": [
      "source",
      "citations",
      "출처"
    ]
  },
  {
    "id": "tag_evidence",
    "type": "modifier",
    "category": "리서치/근거",
    "tag": "evidence",
    "labelKo": "근거 중심",
    "meaning": "주장보다 근거를 중심으로 정리",
    "promptText": "주장보다 근거와 사실 관계를 중심으로 정리해줘.",
    "aliases": [
      "proof",
      "근거"
    ]
  },
  {
    "id": "tag_fact_check",
    "type": "modifier",
    "category": "리서치/근거",
    "tag": "fact-check",
    "labelKo": "팩트체크",
    "meaning": "사실 여부와 불확실한 부분을 점검",
    "promptText": "사실 여부와 불확실한 부분을 구분해서 점검해줘.",
    "aliases": [
      "verify",
      "verification",
      "팩트체크"
    ]
  }
];

export const tagById = new Map(promptTags.map((tag) => [tag.id, tag]));

export const TAG_CATEGORIES = Array.from(new Set(promptTags.map((tag) => tag.category)));
