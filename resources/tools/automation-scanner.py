from pathlib import Path


def scan_markdown(root: str) -> list[str]:
    matches: list[str] = []
    for path in Path(root).rglob("*.md"):
        text = path.read_text(encoding="utf-8")
        if "automation" in text.lower() or "workflow" in text.lower():
            matches.append(str(path))
    return matches


if __name__ == "__main__":
    for match in scan_markdown("."):
        print(match)
