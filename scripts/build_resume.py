from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "resume" / "heo-ryun-resume.pdf"

W, H = A4
M = 18 * mm
CONTENT_W = W - 2 * M

INK = colors.HexColor("#172033")
TEXT = colors.HexColor("#344054")
MUTED = colors.HexColor("#72809A")
BLUE = colors.HexColor("#376FF6")
BLUE_DARK = colors.HexColor("#2459D6")
PALE_BLUE = colors.HexColor("#F3F6FF")
PALE = colors.HexColor("#F7F9FC")
LINE = colors.HexColor("#DCE2EC")
WHITE = colors.white

pdfmetrics.registerFont(TTFont("Malgun", r"C:\Windows\Fonts\malgun.ttf"))
pdfmetrics.registerFont(TTFont("MalgunBold", r"C:\Windows\Fonts\malgunbd.ttf"))


def text_width(text, font="Malgun", size=9):
    return pdfmetrics.stringWidth(text, font, size)


def wrap(text, max_width, font="Malgun", size=9):
    words = text.split()
    lines, current = [], ""
    for word in words:
        candidate = word if not current else f"{current} {word}"
        if text_width(candidate, font, size) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_text(c, text, x, y, max_width, size=9, leading=14, font="Malgun", color=TEXT):
    c.setFont(font, size)
    c.setFillColor(color)
    for line in wrap(text, max_width, font, size):
        c.drawString(x, y, line)
        y -= leading
    return y


def section_title(c, title, y):
    c.setFillColor(BLUE)
    c.roundRect(M, y - 3, 4, 18, 2, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("MalgunBold", 14)
    c.drawString(M + 12, y, title)
    return y - 25


def pill(c, label, x, y, fill=PALE_BLUE, color=BLUE_DARK, font_size=8.2):
    width = text_width(label, "MalgunBold", font_size) + 17
    c.setFillColor(fill)
    c.roundRect(x, y - 4, width, 20, 10, fill=1, stroke=0)
    c.setFillColor(color)
    c.setFont("MalgunBold", font_size)
    c.drawString(x + 8.5, y + 2, label)
    return x + width + 6


def bullet(c, text, x, y, width, size=8.7, leading=13):
    c.setFillColor(BLUE)
    c.circle(x + 2.5, y + 3, 1.7, fill=1, stroke=0)
    return draw_text(c, text, x + 11, y, width - 11, size=size, leading=leading, color=TEXT)


def project_card(c, y, title, role, summary, bullets, tags, height, accent=BLUE):
    x = M
    c.setFillColor(WHITE)
    c.setStrokeColor(LINE)
    c.setLineWidth(0.7)
    c.roundRect(x, y - height, CONTENT_W, height, 10, fill=1, stroke=1)
    c.setFillColor(accent)
    c.roundRect(x, y - height, 5, height, 3, fill=1, stroke=0)

    tx = x + 17
    ty = y - 22
    c.setFillColor(INK)
    c.setFont("MalgunBold", 11.5)
    c.drawString(tx, ty, title)
    role_width = text_width(role, "MalgunBold", 7.4) + 16
    c.setFillColor(PALE_BLUE)
    c.roundRect(x + CONTENT_W - role_width - 13, ty - 5, role_width, 18, 9, fill=1, stroke=0)
    c.setFillColor(BLUE_DARK)
    c.setFont("MalgunBold", 7.4)
    c.drawString(x + CONTENT_W - role_width - 5, ty + 1, role)

    ty -= 19
    ty = draw_text(c, summary, tx, ty, CONTENT_W - 34, size=8.7, leading=13, color=MUTED)
    ty -= 3
    for item in bullets:
        ty = bullet(c, item, tx, ty, CONTENT_W - 34)
        ty -= 2

    px = tx
    py = y - height + 16
    for tag in tags:
        px = pill(c, tag, px, py, fill=PALE, color=MUTED, font_size=7.2)
    return y - height - 10


def mini_project(c, x, y, width, title, subtitle, tags):
    height = 88
    c.setFillColor(PALE)
    c.setStrokeColor(LINE)
    c.roundRect(x, y - height, width, height, 10, fill=1, stroke=1)
    c.setFillColor(INK)
    c.setFont("MalgunBold", 10)
    c.drawString(x + 14, y - 21, title)
    draw_text(c, subtitle, x + 14, y - 39, width - 28, size=8, leading=12, color=MUTED)
    px = x + 14
    for tag in tags:
        px = pill(c, tag, px, y - height + 14, fill=WHITE, color=MUTED, font_size=6.8)


def footer(c, page):
    c.setStrokeColor(LINE)
    c.line(M, 14 * mm, W - M, 14 * mm)
    c.setFillColor(MUTED)
    c.setFont("Malgun", 7)
    c.drawString(M, 9.5 * mm, "Heo Ryun · Cloud Infrastructure / DevOps")
    c.drawRightString(W - M, 9.5 * mm, str(page))


def page_one(c):
    y = H - 22 * mm
    c.setFillColor(INK)
    c.setFont("MalgunBold", 26)
    c.drawString(M, y, "Heo Ryun")
    pill(c, "신입", M + 126, y + 1, fill=PALE_BLUE, color=BLUE_DARK, font_size=8)
    c.setFillColor(BLUE)
    c.setFont("MalgunBold", 12.5)
    c.drawString(M, y - 25, "Cloud Infrastructure · DevOps Engineer")

    c.setFillColor(MUTED)
    c.setFont("Malgun", 8.6)
    contact_y = y - 52
    c.drawString(M, contact_y, "010-4288-8707  ·  hl620@naver.com  ·  충남 천안시 서북구")
    c.drawRightString(W - M, contact_y, "github.com/heolyun")
    c.linkURL("https://github.com/heolyun", (W - M - 82, contact_y - 3, W - M, contact_y + 10), relative=0)

    y -= 76
    box_h = 83
    c.setFillColor(PALE_BLUE)
    c.roundRect(M, y - box_h, CONTENT_W, box_h, 12, fill=1, stroke=0)
    c.setFillColor(BLUE)
    c.setFont("MalgunBold", 8)
    c.drawString(M + 18, y - 20, "PROFILE")
    c.setFillColor(INK)
    c.setFont("MalgunBold", 12.2)
    c.drawString(M + 18, y - 41, "웹 서비스 개발에서 시작해 Azure와 Kubernetes 운영까지 확장했습니다.")
    draw_text(
        c,
        "배포 자동화, 컨테이너 연결, AI 모델 저장 방식과 운영 비용까지 서비스의 전체 생명주기를 책임지는 엔지니어를 목표로 합니다.",
        M + 18,
        y - 61,
        CONTENT_W - 36,
        size=8.7,
        leading=13,
        color=TEXT,
    )
    y -= box_h + 24

    y = section_title(c, "Core Skills", y)
    skill_rows = [
        ["Azure", "AKS", "Kubernetes", "Docker", "GitHub Actions", "Linux"],
        ["ACR", "Blob Storage", "Key Vault", "Nginx", "PostgreSQL", "Spring"],
    ]
    for row in skill_rows:
        x = M
        for item in row:
            x = pill(c, item, x, y, fill=PALE, color=TEXT, font_size=7.6)
        y -= 28
    y -= 8

    y = section_title(c, "Selected Projects", y)
    y = project_card(
        c,
        y,
        "Burinake",
        "Cloud · DevOps · AI Infra",
        "화재 감지와 신고 자동화 AI 서비스를 Azure에서 컨테이너 기반으로 배포·운영했습니다.",
        [
            "GitHub Actions에서 이미지를 빌드해 ACR로 배포하고, AKS는 이미지를 pull하도록 CI/CD를 분리했습니다.",
            "YOLO 모델을 Blob Storage와 initContainer로 분리해 이미지 비대화와 VM 디스크 부족 문제를 개선했습니다.",
            "Frontend·Backend·PostgreSQL·YOLO·VLM을 AKS에 연결하고 Secret, ConfigMap, Ingress, HPA를 구성했습니다.",
        ],
        ["Azure", "AKS", "Docker", "CI/CD", "YOLO / VLM"],
        158,
    )
    y = project_card(
        c,
        y,
        "CSAS",
        "Frontend",
        "AI 기반 건물 균열 분석 서비스의 모바일 촬영·업로드와 분석 결과 앨범을 구현했습니다.",
        [
            "업로드 전 이미지 압축과 오류 안내로 고해상도 모바일 사진의 413 실패를 줄였습니다.",
            "균열 좌표·유형 필터, 원본/분석 비교와 앨범 상세 모달을 개선했습니다.",
        ],
        ["React", "Vite", "Axios", "AI API"],
        123,
        accent=colors.HexColor("#6C7BF7"),
    )
    footer(c, 1)


def page_two(c):
    y = H - 21 * mm
    y = section_title(c, "Education & Project Experience", y)

    c.setFillColor(INK)
    c.setFont("MalgunBold", 10.5)
    c.drawString(M, y, "휴먼교육센터 · 심화_심층 데이터 분석을 통한 서비스 솔루션 개발자 과정")
    c.setFillColor(MUTED)
    c.setFont("Malgun", 8)
    c.drawRightString(W - M, y, "2026.05.11 - 2026.07.13")
    y -= 25
    mini_project(c, M, y, 84 * mm, "1차 · CSAS", "모바일 이미지 업로드와 AI 균열 분석 앨범 UI", ["React", "AI API"])
    mini_project(c, M + 90 * mm, y, 84 * mm, "2차 · Burinake", "Azure · AKS 기반 컨테이너 운영과 CI/CD", ["Azure", "AKS", "DevOps"])
    y -= 108

    c.setFillColor(INK)
    c.setFont("MalgunBold", 10.5)
    c.drawString(M, y, "휴먼교육센터 · 자바(JAVA) 활용 데이터 플랫폼 구축 풀스택 개발자 과정")
    c.setFillColor(MUTED)
    c.setFont("Malgun", 8)
    c.drawRightString(W - M, y, "2025.10.15 - 2026.04.08")
    y -= 25
    third = (CONTENT_W - 16) / 3
    mini_project(c, M, y, third, "1차 · DoctorLink", "인증 상태와 건강 기록 흐름을 연결한 React 서비스", ["React", "Context"])
    mini_project(c, M + third + 8, y, third, "2차 · #Trip", "OAuth2·SMTP 계정 복구를 포함한 인증 백엔드", ["Spring", "OAuth2"])
    mini_project(c, M + (third + 8) * 2, y, third, "3차 · 오늘Farm", "시세·상품·AI 식단을 통합하고 팀장 역할 수행", ["Spring", "OpenAI"])
    y -= 112

    y = section_title(c, "Additional Projects", y)
    mini_project(c, M, y, 84 * mm, "TeamRullet", "조건 검증과 점수 편차를 반영한 팀 밸런싱", ["TypeScript", "Netlify"])
    mini_project(c, M + 90 * mm, y, 84 * mm, "CHAMBTI", "응답 가중치 기반 게임 캐릭터 추천", ["React", "Netlify"])
    y -= 112

    y = section_title(c, "Education & Certification", y)
    c.setFillColor(PALE)
    c.roundRect(M, y - 78, CONTENT_W, 78, 10, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("MalgunBold", 9.5)
    c.drawString(M + 16, y - 20, "충남도립대학교 · 호텔조리학과")
    c.setFont("MalgunBold", 9)
    c.drawString(M + 16, y - 45, "리눅스마스터 2급")
    c.setFillColor(MUTED)
    c.setFont("Malgun", 8)
    c.drawString(M + 110, y - 45, "2026.08.01 시험 예정")
    c.setFillColor(INK)
    c.setFont("MalgunBold", 9)
    c.drawString(M + 16, y - 64, "정보처리기능사")
    c.setFillColor(MUTED)
    c.setFont("Malgun", 8)
    c.drawString(M + 110, y - 64, "필기 합격 경험 · 재응시 준비")
    y -= 102

    y = section_title(c, "Experience & Strengths", y)
    c.setFillColor(INK)
    c.setFont("MalgunBold", 10.5)
    c.drawString(M, y, "경험을 기술 역량으로 전환하는 사람")
    y -= 19
    y = draw_text(
        c,
        "프로게이머 활동을 통해 짧은 시간 안에 상황을 분석하고 반복 훈련과 피드백으로 성과를 높이는 방식을 익혔습니다. 요식업 현장에서는 품질과 시간을 지키는 책임감, 동료와 작업 순서를 맞추는 협업과 돌발 상황 대응력을 쌓았습니다.",
        M,
        y,
        CONTENT_W,
        size=8.7,
        leading=13.5,
        color=TEXT,
    )
    y -= 8

    strengths = [
        ("원인 추적", "문제를 빌드·저장소·네트워크·런타임 설정으로 나눠 확인합니다."),
        ("완결성", "기능 구현부터 배포, 운영 증빙, 백업과 비용 정리까지 마무리합니다."),
        ("협업", "진행 상황과 원인을 먼저 공유하고 재현 가능한 문서와 명령을 남깁니다."),
    ]
    card_w = (CONTENT_W - 16) / 3
    for index, (title, desc) in enumerate(strengths):
        x = M + index * (card_w + 8)
        c.setFillColor(PALE_BLUE)
        c.roundRect(x, y - 72, card_w, 72, 9, fill=1, stroke=0)
        c.setFillColor(BLUE_DARK)
        c.setFont("MalgunBold", 9)
        c.drawString(x + 12, y - 20, title)
        draw_text(c, desc, x + 12, y - 38, card_w - 24, size=7.7, leading=11.5, color=TEXT)
    footer(c, 2)


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=A4)
    c.setTitle("Heo Ryun Resume")
    c.setAuthor("Heo Ryun")
    page_one(c)
    c.showPage()
    page_two(c)
    c.save()
    print(OUTPUT)


if __name__ == "__main__":
    build()
