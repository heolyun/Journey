from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import BaseDocTemplate, Frame, PageBreak, PageTemplate, Paragraph, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "resume" / "heo-ryun-cover-letter.pdf"
W, H = A4
M = 20 * mm

INK = colors.HexColor("#172033")
TEXT = colors.HexColor("#344054")
MUTED = colors.HexColor("#72809A")
BLUE = colors.HexColor("#376FF6")
PALE_BLUE = colors.HexColor("#F3F6FF")
LINE = colors.HexColor("#DCE2EC")

pdfmetrics.registerFont(TTFont("Malgun", r"C:\Windows\Fonts\malgun.ttf"))
pdfmetrics.registerFont(TTFont("MalgunBold", r"C:\Windows\Fonts\malgunbd.ttf"))

TITLE = ParagraphStyle("title", fontName="MalgunBold", fontSize=24, leading=30, textColor=INK)
SUBTITLE = ParagraphStyle("subtitle", fontName="Malgun", fontSize=8.5, leading=13, textColor=MUTED)
HERO = ParagraphStyle("hero", fontName="MalgunBold", fontSize=12.5, leading=20, textColor=INK, alignment=TA_LEFT)
SECTION = ParagraphStyle("section", fontName="MalgunBold", fontSize=12, leading=18, textColor=INK)
BODY = ParagraphStyle("body", fontName="Malgun", fontSize=9.15, leading=16.2, textColor=TEXT, wordWrap="CJK")


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.line(M, 14 * mm, W - M, 14 * mm)
    canvas.setFillColor(MUTED)
    canvas.setFont("Malgun", 7)
    canvas.drawString(M, 9.5 * mm, "Heo Ryun · 자기소개서")
    canvas.drawRightString(W - M, 9.5 * mm, str(doc.page))
    canvas.restoreState()


def section_heading(number, title):
    badge = Table([[number]], colWidths=[28], rowHeights=[20])
    badge.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), PALE_BLUE),
        ("FONTNAME", (0, 0), (-1, -1), "MalgunBold"),
        ("FONTSIZE", (0, 0), (-1, -1), 7.5),
        ("TEXTCOLOR", (0, 0), (-1, -1), BLUE),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    row = Table([[badge, Paragraph(title, SECTION)]], colWidths=[38, W - 2 * M - 38])
    row.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ("LINEBELOW", (1, 0), (1, 0), 0.6, LINE),
    ]))
    return row


def add_section(story, number, title, paragraphs):
    story.extend([section_heading(number, title), Spacer(1, 11)])
    for paragraph in paragraphs:
        story.extend([Paragraph(paragraph, BODY), Spacer(1, 11)])
    story.append(Spacer(1, 5))


def page_header(story, title, subtitle):
    story.extend([
        Paragraph(title, TITLE),
        Spacer(1, 3),
        Paragraph(subtitle, SUBTITLE),
        Spacer(1, 22),
    ])


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = BaseDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=M,
        rightMargin=M,
        topMargin=18 * mm,
        bottomMargin=20 * mm,
        title="Heo Ryun 자기소개서",
        author="Heo Ryun",
    )
    frame = Frame(M, 20 * mm, W - 2 * M, H - 38 * mm, id="main", leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    doc.addPageTemplates(PageTemplate(id="page", frames=[frame], onPage=footer))

    story = []
    page_header(story, "자기소개서", "Heo Ryun · 클라우드 인프라 / DevOps 엔지니어")
    hero = Table([[Paragraph("가장 잘 설명하는 단어는 ‘생존력’입니다.", HERO)]], colWidths=[W - 2 * M])
    hero.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), PALE_BLUE),
        ("BOX", (0, 0), (-1, -1), 0, PALE_BLUE),
        ("LEFTPADDING", (0, 0), (-1, -1), 18),
        ("RIGHTPADDING", (0, 0), (-1, -1), 18),
        ("TOPPADDING", (0, 0), (-1, -1), 14),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
    ]))
    story.extend([hero, Spacer(1, 22)])

    add_section(story, "01", "성장 과정 · 변화 속에서 역할을 만드는 생존력", [
        "생존력은 주어진 상황을 버티는 능력이 아닙니다. 환경이 달라졌을 때 변화를 빠르게 받아들이고, 필요한 것을 배우며, 결국 맡은 역할을 만들어내는 능력입니다. 프로게이머, 요식업, 개발은 서로 다른 분야였지만 매번 초보자의 자리에서 시작했습니다. 반복적인 연습과 피드백으로 실력을 쌓아 프로게이머 팀의 리더가 되었고, 군 복무 이후에는 요식업의 기본 업무부터 다시 익혀 주방 운영을 책임지는 주방장이 되었습니다.",
        "리더였다는 결과보다 그 자리까지 올라가는 과정을 여러 번 경험했다는 점이 강점입니다. 지시와 피드백을 받아들이고 기초부터 반복했으며, 하고자 한 분야에서는 맡은 몫을 해낼 때까지 쉽게 포기하지 않았습니다. 개발 역시 비전공 신입으로 시작했지만 웹 서비스 구현에서 Azure와 Kubernetes 배포·운영까지 학습 범위를 넓혔습니다.",
    ])
    add_section(story, "02", "성격의 장단점 · 사람들과 어울리며 끝까지 해결합니다", [
        "새로운 조직에 적응하고 사람들과 신뢰 관계를 형성하는 데 자신이 있습니다. 프로게이머 팀과 요식업 현장처럼 다양한 역할의 사람들이 함께 움직이는 환경에서 상대를 존중하는 태도와 기본적인 예의를 중요하게 생각해왔습니다. 개인의 의견을 먼저 내세우기보다 조직의 방식과 맡은 역할을 이해하고, 지시받은 업무를 정확하게 수행합니다. 조건이 달라지면 상황과 사람에 맞춰 우선순위를 조정하며 유연하게 대응합니다.",
        "반면 책임감을 느끼는 문제는 다른 사람에게 부담을 주기보다 혼자 해결하려는 경향이 있습니다. 끈기 있게 원인을 찾는 과정에서 문제 해결 능력을 키웠지만, 혼자 오래 고민하면 팀 전체의 판단이 늦어질 수 있다는 점도 배웠습니다. 이후에는 문제의 원인과 시도한 방법, 현재 막힌 지점을 먼저 공유하고 일정 시간 이상 해결되지 않으면 의견을 요청하는 기준을 세웠습니다.",
        "또한 빠르게 실행하는 데 비해 기록과 계획이 뒤늦게 따라오는 점을 보완하기 위해 Git의 브랜치와 커밋으로 작업 단위를 나누고, AI 대화도 프로젝트와 주제별로 분리해 관리하고 있습니다. 현재는 작업 우선순위와 진행 상태를 관리하는 AntiADHD 프로젝트를 개발하며 실제 습관에 맞는 업무 관리 체계를 직접 만들고 있습니다.",
    ])
    story.append(PageBreak())

    page_header(story, "서비스를 사용자에게 전달하는 사람", "지원 동기와 클라우드 엔지니어로서의 성장 목표")
    add_section(story, "03", "지원 동기 및 직무 역량 · 클라우드에서 찾은 답", [
        "주방 일은 이미 잘하고 있었고 필요하다면 언제든 다시 해낼 수 있는 일이었습니다. 하지만 빠르게 변화하는 AI 시대에 익숙한 능력만 고집해서는 경쟁력을 유지하기 어렵다고 판단했습니다. 단순히 새로운 직업을 찾기보다 어릴 때부터 관심을 두고 꿈꿔왔던 개발에 도전했습니다. Java와 Spring 기반 백엔드, React 기반 프론트엔드, 데이터베이스와 AI 기술을 배우며 인증, 상품, 외부 API, 이미지 업로드와 AI 분석 결과 화면 등을 구현했습니다.",
        "AI가 개발 생산성을 높이는 모습을 보며 기능 구현을 넘어 변화 속에서도 오래 필요한 역할이 무엇인지 고민했습니다. AI가 개발을 돕더라도 서비스를 실행하고 연결하며, 보호하고 장애에 대응해 사용자에게 안정적으로 전달하는 책임은 사라지지 않는다고 생각했습니다. 기능이 구현됐다는 사실만으로 서비스가 완성되는 것은 아닙니다. 사용자가 안정적으로 이용할 수 있어야 가치가 전달되며, 그 기반을 책임지는 클라우드 인프라에서 답을 찾았습니다.",
        "Burinake에서는 Azure와 Kubernetes 환경에서 웹 서비스, 데이터베이스와 AI 서버를 연결하고 CI/CD를 구성했습니다. AI 이미지의 크기로 VM 디스크가 부족해졌을 때 GitHub Actions에서 이미지를 빌드하도록 빌드 환경과 실행 환경을 분리했습니다. YOLO 모델은 컨테이너 이미지에 포함하는 대신 Blob Storage에서 내려받도록 변경했습니다. 문제를 임시로 우회하지 않고 실행 환경과 저장소의 책임을 분리하면서, 클라우드는 안정성, 비용, 확장성과 운영 전체를 관리하는 분야라는 점을 배웠습니다.",
    ])
    add_section(story, "04", "입사 후 포부 · 기본 업무부터 운영 책임까지", [
        "입사 초기에는 회사의 기존 인프라 구성과 업무 방식을 먼저 이해하겠습니다. 문서와 로그, 기존 장애 사례를 살펴보고 작은 운영 업무와 반복 작업부터 정확하게 수행하겠습니다. 모르는 것을 감추기보다 질문하고 피드백을 받아들이며 맡은 업무를 통해 신뢰를 쌓겠습니다.",
        "이후에는 Linux와 네트워크, Docker와 Kubernetes에 대한 이해를 높이고 CI/CD, 모니터링과 장애 대응 업무에 기여하겠습니다. 단순히 명령어를 실행하는 데 그치지 않고 서비스 구조와 배포 과정에서 문제가 발생한 원인을 설명하고 재발을 방지할 수 있는 엔지니어로 성장하겠습니다. 장기적으로는 AWS와 Azure 환경을 깊이 이해하고 AI 서비스의 컴퓨팅 자원, 데이터, 보안, 비용과 확장성을 함께 고려하겠습니다.",
        "생존은 변화를 외면하지 않고 필요하다면 다시 배우는 적극적인 선택입니다. 새로운 조직에서도 기본부터 배우며 맡은 역할을 만들고, 서비스의 배포부터 운영과 장애 대응까지 책임지는 클라우드 엔지니어가 되겠습니다.",
    ])

    doc.build(story)
    print(OUTPUT)


if __name__ == "__main__":
    build()
