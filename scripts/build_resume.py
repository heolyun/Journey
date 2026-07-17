from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    KeepTogether,
    PageTemplate,
    PageBreak,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "resume" / "heo-ryun-resume.pdf"

INK = colors.HexColor("#171B26")
MUTED = colors.HexColor("#667085")
LINE = colors.HexColor("#D6DBE5")
BLUE = colors.HexColor("#276EF1")
PALE_BLUE = colors.HexColor("#F4F7FF")
PALE_GRAY = colors.HexColor("#F8F9FB")

pdfmetrics.registerFont(TTFont("Malgun", r"C:\Windows\Fonts\malgun.ttf"))
pdfmetrics.registerFont(TTFont("MalgunBold", r"C:\Windows\Fonts\malgunbd.ttf"))

styles = getSampleStyleSheet()


def style(name, **kwargs):
    kwargs.setdefault("fontName", "Malgun")
    kwargs.setdefault("textColor", INK)
    return ParagraphStyle(name, **kwargs)


BODY = style("BodyKR", fontSize=9.4, leading=15, spaceAfter=4)
SMALL = style("SmallKR", fontSize=8.2, leading=12.4, textColor=MUTED)
TITLE = style("TitleKR", fontName="MalgunBold", fontSize=23, leading=28, spaceAfter=3)
ROLE = style("RoleKR", fontName="MalgunBold", fontSize=11, leading=15, textColor=BLUE)
SECTION = style("SectionKR", fontName="MalgunBold", fontSize=14, leading=18, spaceBefore=4, spaceAfter=8)
SUBHEAD = style("SubheadKR", fontName="MalgunBold", fontSize=10.5, leading=15, spaceAfter=3)
LABEL = style("LabelKR", fontSize=7.8, leading=11, textColor=MUTED)
VALUE = style("ValueKR", fontName="MalgunBold", fontSize=9.2, leading=13)
BULLET = style("BulletKR", fontSize=9, leading=14, leftIndent=9, firstLineIndent=-7, spaceAfter=2)
CALLOUT = style("CalloutKR", fontName="MalgunBold", fontSize=11.2, leading=17, textColor=INK)


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.4)
    canvas.line(18 * mm, 13 * mm, 192 * mm, 13 * mm)
    canvas.setFont("Malgun", 7.4)
    canvas.setFillColor(MUTED)
    canvas.drawString(18 * mm, 8.2 * mm, "Heo Ryun | Cloud Infrastructure · DevOps")
    canvas.drawRightString(192 * mm, 8.2 * mm, str(doc.page))
    canvas.restoreState()


def section(title):
    return [
        Spacer(1, 5),
        HRFlowable(width="100%", thickness=0.8, color=colors.HexColor("#8792AA")),
        Spacer(1, 9),
        Paragraph(title, SECTION),
    ]


def bullet(text):
    return Paragraph(f"• {text}", BULLET)


def meta_card(label, value):
    return Table(
        [[Paragraph(label, LABEL)], [Paragraph(value, VALUE)]],
        colWidths=[31 * mm],
        rowHeights=[8 * mm, 16 * mm],
        style=TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PALE_GRAY),
                ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        ),
    )


def project(period, title, overview, bullets, tech):
    left = Paragraph(period, SMALL)
    right = [
        Paragraph(title, SUBHEAD),
        Paragraph(overview, BODY),
        *[bullet(item) for item in bullets],
        Paragraph(f"<font color='#667085'>기술:</font> {tech}", SMALL),
    ]
    table = Table([[left, right]], colWidths=[31 * mm, 139 * mm], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (0, -1), 8),
                ("RIGHTPADDING", (1, 0), (1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("LINEBELOW", (0, 0), (-1, -1), 0.45, LINE),
            ]
        )
    )
    return KeepTogether(table)


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = BaseDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=17 * mm,
        bottomMargin=18 * mm,
        title="Heo Ryun Resume",
        author="Heo Ryun",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
    doc.addPageTemplates([PageTemplate(id="resume", frames=[frame], onPage=footer)])

    story = []
    story.extend(
        [
            Paragraph("Heo Ryun <font size='10' color='#276EF1'> 신입 </font>", TITLE),
            Paragraph("Cloud Infrastructure · DevOps Engineer", ROLE),
            Spacer(1, 8),
            Table(
                [
                    [Paragraph("1997년생 · 남", BODY), Paragraph("010-4288-8707", BODY)],
                    [Paragraph("hl620@naver.com", BODY), Paragraph("충남 천안시 서북구", BODY)],
                    [Paragraph("github.com/heolyun", BODY), Paragraph("journey-eta-two.vercel.app", BODY)],
                ],
                colWidths=[87 * mm, 87 * mm],
                style=TableStyle(
                    [
                        ("BACKGROUND", (0, 0), (-1, -1), PALE_BLUE),
                        ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                        ("INNERGRID", (0, 0), (-1, -1), 0.35, LINE),
                        ("LEFTPADDING", (0, 0), (-1, -1), 8),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                        ("TOPPADDING", (0, 0), (-1, -1), 6),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                    ]
                ),
            ),
            Spacer(1, 13),
            Table(
                [[meta_card("학력", "충남도립대학교"), meta_card("전공", "호텔조리학과"), meta_card("경력", "개발 직무 신입"), meta_card("지원 분야", "Cloud · DevOps")]],
                colWidths=[43.5 * mm] * 4,
                style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 2), ("RIGHTPADDING", (0, 0), (-1, -1), 2)]),
            ),
        ]
    )
    story.extend(section("간략 소개"))
    story.extend(
        [
            Paragraph("웹 서비스를 만들며 운영의 한계를 직접 마주하고, Azure와 Kubernetes까지 확장해 온 클라우드 인프라 엔지니어 지망생입니다.", CALLOUT),
            Spacer(1, 5),
            Paragraph(
                "React와 Spring 기반 서비스 개발을 시작으로 Docker, GitHub Actions, Azure Container Registry, Blob Storage, Azure OpenAI와 AKS를 연결해 실제 서비스를 배포·운영했습니다. 기능 구현에 머무르지 않고 빌드 환경과 실행 환경의 분리, 대용량 모델 저장 방식, 컨테이너 네트워크와 배포 자동화를 개선하는 과정에 집중했습니다.",
                BODY,
            ),
            Paragraph(
                "프로게이머 경험에서 익힌 반복 훈련과 빠른 피드백 수용, 요식업 현장에서 쌓은 책임감과 협업 태도를 기술 학습에도 적용하고 있습니다. 개발 직무는 신입이지만 새로운 환경을 끝까지 이해하고 동작하는 결과로 만드는 끈기를 강점으로 삼고 있습니다.",
                BODY,
            ),
        ]
    )
    story.extend(section("기술 역량"))
    skills = [
        ["Cloud / Infra", "Azure VM · AKS · ACR · Blob Storage · Azure OpenAI · Key Vault"],
        ["Container / DevOps", "Docker · Docker Compose · Kubernetes · GitHub Actions · Nginx"],
        ["Backend / Data", "Java · Spring · Spring Security · MyBatis · Oracle · PostgreSQL · REST API"],
        ["Frontend / AI", "React · TypeScript · Vite · Axios · YOLO · VLM · OpenAI API"],
        ["Learning", "Linux · Helm · Monitoring · AWS Infrastructure"],
    ]
    skill_table = Table(
        [[Paragraph(a, VALUE), Paragraph(b, BODY)] for a, b in skills],
        colWidths=[38 * mm, 136 * mm],
        style=TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, -1), PALE_BLUE),
                ("GRID", (0, 0), (-1, -1), 0.4, LINE),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        ),
    )
    story.append(skill_table)

    story.append(PageBreak())
    story.extend(section("교육 및 프로젝트"))
    story.append(Paragraph("휴먼교육센터 · 심화_심층 데이터 분석을 통한 서비스 솔루션 개발자 과정", SUBHEAD))
    story.append(Paragraph("2026.05.11 - 2026.07.13", SMALL))
    story.append(Spacer(1, 5))
    story.append(
        project(
            "1차 프로젝트",
            "CSAS - AI 기반 건물 균열 분석 서비스",
            "건물 이미지를 업로드하면 AI가 균열 위치와 유형을 분석하고, 결과를 앨범에서 다시 조회하는 팀 프로젝트입니다.",
            [
                "React 프론트엔드에서 모바일 카메라 촬영·파일 업로드·분석 결과 화면을 구현했습니다.",
                "고해상도 사진의 413 오류를 줄이기 위해 업로드 전 이미지 압축과 오류 안내를 적용했습니다.",
                "균열 좌표 시각화, 원본/분석 이미지 비교, 유형 필터와 앨범 상세 모달을 개선했습니다.",
                "AWS 인프라 담당은 아니었으며 S3·EKS·Weaviate가 연결되는 서비스 데이터 흐름을 협업 과정에서 이해했습니다.",
            ],
            "React, Vite, Axios, Canvas Image Compression, AI API",
        )
    )
    story.append(
        project(
            "2차 프로젝트",
            "Burinake - 화재 감지·신고 자동화 AI 서비스",
            "CCTV 이미지에서 화재를 감지하고 VLM이 상황을 판단해 신고 정보를 생성하는 서비스에서 Cloud Infrastructure·DevOps·AI Infrastructure를 담당했습니다.",
            [
                "Azure VM, NSG, SSH 인증과 Docker Compose 기반 멀티 컨테이너 실행 환경을 구성했습니다.",
                "GitHub Actions에서 이미지를 빌드해 ACR로 배포하도록 CI/CD를 분리하고 반복 배포를 자동화했습니다.",
                "YOLO 모델을 Blob Storage에 분리하고 initContainer에서 다운로드하도록 해 이미지 비대화를 개선했습니다.",
                "Frontend·Spring Boot·PostgreSQL·YOLO·VLM을 AKS에 배포하고 Ingress, Secret, ConfigMap, HPA를 구성했습니다.",
                "프로젝트 종료 후 정적 데모와 운영 증빙·데이터 백업을 남기고 Azure 리소스를 제거해 비용을 통제했습니다.",
            ],
            "Azure, AKS, ACR, Blob Storage, Key Vault, Docker, Kubernetes, GitHub Actions, PostgreSQL, YOLO, VLM",
        )
    )

    story.append(Paragraph("휴먼교육센터 · 자바(JAVA) 활용 데이터 플랫폼 구축 풀스택 개발자 과정", SUBHEAD))
    story.append(Paragraph("2025.10.15 - 2026.04.08", SMALL))
    story.append(Spacer(1, 5))
    story.append(
        project(
            "1차 프로젝트",
            "DoctorLink - 병원·환자 건강 기록 서비스",
            "사전 문진과 건강 기록, 커뮤니티를 연결한 첫 React 팀 프로젝트입니다.",
            [
                "회원가입·로그인·아이디/비밀번호 찾기 화면과 AuthContext 기반 로그인 상태 유지를 구현했습니다.",
                "건강 문진 저장, 대시보드 모달, 캘린더 데이터 연결과 커뮤니티 작성·삭제·관리자 답변 흐름을 구현했습니다.",
                "새로고침 시 인증 상태가 초기화되는 문제를 브라우저 저장소와 상태 복원 흐름으로 개선했습니다.",
            ],
            "React, Context API, localStorage, Spring, Oracle",
        )
    )
    story.append(
        project(
            "2차 프로젝트",
            "#Trip - 성향 기반 여행 추천 서비스",
            "성향 분석 결과를 여행지 추천과 일정 작성으로 연결한 Spring MVC 팀 프로젝트에서 인증 백엔드를 담당했습니다.",
            [
                "로그인·로그아웃·회원가입·로그인 유지와 Oracle DB 연동을 구현했습니다.",
                "아이디 찾기와 SMTP 기반 임시 비밀번호 발송 흐름을 구성했습니다.",
                "SNS 간편 로그인과 OAuth2 API를 연결하며 일반 로그인과 외부 인증 경로를 정리했습니다.",
            ],
            "Java, Spring MVC, Spring Security, OAuth2, SMTP, MyBatis, Oracle, JSP",
        )
    )
    story.append(
        project(
            "3차 프로젝트",
            "오늘Farm - 농산물 시세 분석 커머스",
            "공공 시세 데이터, 상품·주문과 AI 식단 추천을 결합한 팀 프로젝트에서 팀장과 핵심 기능 개발을 담당했습니다.",
            [
                "KAMIS 시세 스냅샷을 저장하고 상품 가격 계산에 연결해 가격 기준 오류를 개선했습니다.",
                "상품·장바구니·리뷰·주문 API와 관리자 상품/회원 관리 기능을 구현했습니다.",
                "OpenAI 기반 식단 챗봇과 저장 흐름을 구현하고, 한 끼 요청의 응답 파싱·예외 처리를 보완했습니다.",
                "팀 일정과 역할을 조율하고 외부 API·결제·AI 기능의 통합 우선순위를 관리했습니다.",
            ],
            "React, Spring, MyBatis, Oracle, KAMIS API, OpenAI API, PortOne",
        )
    )

    story.extend(section("개인 프로젝트 및 배포 경험"))
    story.append(
        project(
            "2026.04.14",
            "TeamRullet - 조건 기반 팀 밸런싱",
            "참가자 실력과 같은 팀·분리 조건을 반영해 균형 잡힌 팀을 생성하는 하루 개인 프로젝트입니다.",
            ["티어 점수 정규화, 입력 조건 충돌 검증과 팀별 총점·인원 편차 비용 함수를 구현했습니다.", "GitHub와 Netlify를 연결해 첫 외부 배포를 완료했습니다."],
            "React, TypeScript, Vite, Netlify",
        )
    )
    story.append(
        project(
            "2026.04.15",
            "CHAMBTI - 게임 캐릭터 성향 추천",
            "퀴즈 응답 가중치로 캐릭터 적합도를 계산하고 추천 근거와 공유 결과를 제공하는 개인 프로젝트입니다.",
            ["상위 3개 추천, 유사 캐릭터, localStorage 결과 복원과 공유 slug 흐름을 구현했습니다.", "Netlify SPA 라우팅과 SEO를 구성했습니다."],
            "React, TypeScript, Vite, React Router, Netlify",
        )
    )

    story.extend(section("자격 및 학습 계획"))
    cert_table = Table(
        [
            [Paragraph("2026.08.01 예정", SMALL), Paragraph("리눅스마스터 2급 시험 예정", VALUE)],
            [Paragraph("재응시 예정", SMALL), Paragraph("정보처리기능사 - 필기 합격 경험, 실기 기간 경과로 재응시 준비", VALUE)],
        ],
        colWidths=[37 * mm, 137 * mm],
        style=TableStyle(
            [
                ("GRID", (0, 0), (-1, -1), 0.4, LINE),
                ("BACKGROUND", (0, 0), (0, -1), PALE_GRAY),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        ),
    )
    story.append(cert_table)

    story.append(PageBreak())
    story.extend(section("자기소개"))
    story.append(Paragraph("개발과 인프라를 선택한 이유", SUBHEAD))
    story.append(
        Paragraph(
            "웹 프로젝트를 진행하며 기능이 완성돼도 실제 환경에서 실행·배포되지 않으면 사용자에게 전달될 수 없다는 점을 경험했습니다. 정적 배포에서 시작해 Azure VM, Docker Compose, CI/CD와 AKS까지 직접 확장하면서 서비스가 동작하는 기반을 설계하고 운영하는 일에 흥미를 느꼈습니다. 특히 Burinake에서 AI 모델, 백엔드, 데이터베이스와 프론트엔드를 하나의 클러스터에서 연결하고 운영 문제를 해결한 경험을 통해 클라우드 인프라와 DevOps를 목표 직무로 정했습니다.",
            BODY,
        )
    )
    story.append(Spacer(1, 7))
    story.append(Paragraph("경험을 개발 역량으로 전환한 과정", SUBHEAD))
    story.append(
        Paragraph(
            "프로게이머로 활동하며 짧은 시간 안에 상황을 분석하고, 반복 훈련과 피드백을 통해 성과를 높이는 방식을 익혔습니다. 이후 요식업계에서 꾸준히 일하며 정해진 시간 안에 품질을 유지하는 책임감, 동료와 작업 순서를 맞추는 협업, 예상하지 못한 상황에 즉시 대응하는 태도를 길렀습니다. 분야는 달랐지만 이 경험은 로그와 현상을 관찰하고 원인을 찾아 반복적으로 개선하는 개발·운영 업무의 방식과 맞닿아 있습니다.",
            BODY,
        )
    )
    story.append(Spacer(1, 7))
    story.append(Paragraph("직무 강점", SUBHEAD))
    story.extend(
        [
            bullet("문제를 증상으로만 보지 않고 빌드 환경, 저장소, 네트워크와 런타임 설정으로 나눠 원인을 추적합니다."),
            bullet("프로게이머 경험에서 체득한 반복 훈련과 피드백 반영 속도를 새로운 기술 학습에 적용합니다."),
            bullet("요식업 현장에서 쌓은 책임감과 협업 경험을 바탕으로 역할 경계를 넘어 서비스 전체 흐름을 확인합니다."),
            bullet("팀 프로젝트에서 일정·역할을 조율하고, 운영 종료 시 백업과 비용 정리까지 책임지는 완결성을 중요하게 생각합니다."),
        ]
    )
    story.append(Spacer(1, 7))
    story.append(Paragraph("협업 방식", SUBHEAD))
    story.append(
        Paragraph(
            "팀 프로젝트에서는 본인 기능만 완성하는 것보다 서비스 전체가 연결되는지를 우선 확인했습니다. 오늘Farm에서는 팀장으로 일정과 기능 의존성을 조율했고, Burinake에서는 프론트엔드·백엔드·AI 서버의 실행 조건과 배포 설정을 문서화해 팀원이 동일한 환경을 이해할 수 있도록 했습니다. 문제가 생기면 진행 상황과 원인을 먼저 공유하고, 재현 가능한 명령과 문서로 남기는 협업을 지향합니다.",
            BODY,
        )
    )
    story.append(Spacer(1, 7))
    story.append(Paragraph("입사 후 성장 계획", SUBHEAD))
    story.append(
        Paragraph(
            "입사 초기에는 Linux, 네트워크, 배포 파이프라인과 회사의 운영 절차를 빠르게 익혀 안정적인 배포와 장애 대응에 기여하겠습니다. 이후 Terraform 기반 IaC, Prometheus·Grafana 또는 CloudWatch 기반 관측성, AWS 인프라 설계를 실제 프로젝트로 확장해 재현 가능하고 신뢰할 수 있는 운영 환경을 만드는 엔지니어로 성장하겠습니다.",
            BODY,
        )
    )

    doc.build(story)
    print(OUTPUT)


if __name__ == "__main__":
    build()
