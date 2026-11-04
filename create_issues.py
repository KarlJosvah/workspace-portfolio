import subprocess
import re

with open("docs/TASKS-remaining.md", "r", encoding="utf-8") as f:
    lines = f.readlines()

# Detect whether gh supports native --parent flag (v2.94.0+)
def gh_supports_parent_flag() -> bool:
    try:
        result = subprocess.run(
            ["gh", "--version"],
            capture_output=True, text=True, check=True
        )
        # e.g. "gh version 2.94.0 (2024-...)"
        match = re.search(r"gh version (\d+)\.(\d+)", result.stdout)
        if match:
            major, minor = int(match.group(1)), int(match.group(2))
            return (major, minor) >= (2, 94)
    except subprocess.CalledProcessError:
        pass
    return False

USE_PARENT_FLAG = gh_supports_parent_flag()
print(f"gh --parent flag support: {'YES' if USE_PARENT_FLAG else 'NO (will use gh api fallback)'}\n")

def get_issue_number(url: str) -> str | None:
    """Extract issue number from a GitHub issue URL."""
    parts = url.strip().split("/")
    return parts[-1] if parts else None

def link_sub_issue(parent_number: str, sub_number: str) -> None:
    """Link sub_number as a GitHub sub-issue of parent_number via gh api."""
    try:
        subprocess.run(
            [
                "gh", "api",
                "--method", "POST",
                f"/repos/{{owner}}/{{repo}}/issues/{parent_number}/sub_issues",
                "--field", f"sub_issue_id={sub_number}",
            ],
            capture_output=True, text=True, check=True
        )
        print(f"  -> Linked #{sub_number} as sub-issue of #{parent_number}")
    except subprocess.CalledProcessError as e:
        print(f"  [ERROR] Failed to link #{sub_number} under #{parent_number}: {e.stderr.strip()}")

current_parent_number = None

i = 0
while i < len(lines):
    line = lines[i].strip()

    # 1. Handle Main Issues (##) - No body
    if line.startswith("## ") and not line.startswith("#### "):
        parent_title = line[3:].strip()
        print(f"\nCreating Parent Issue: {parent_title}")

        try:
            result = subprocess.run(
                ["gh", "issue", "create", "--title", parent_title, "--body", ""],
                capture_output=True, text=True, check=True
            )
            current_parent_number = get_issue_number(result.stdout)
            print(f"-> Created Parent #{current_parent_number}")
        except subprocess.CalledProcessError as e:
            print(f"[ERROR] Failed to create parent issue '{parent_title}': {e.stderr.strip()}")
            current_parent_number = None

        i += 1
        continue

    # 2. Handle Sub-Issues (####) - Includes body/description lines
    elif line.startswith("#### "):
        sub_title = line[5:].strip()

        # Collect body lines until the next header or divider
        body_lines = []
        i += 1
        while i < len(lines):
            next_line = lines[i].strip()
            if next_line.startswith("##") or next_line.startswith("####"):
                break
            if next_line != "---":
                body_lines.append(lines[i].rstrip())
            i += 1

        sub_body = "\n".join(body_lines).strip()

        print(f"  Creating Sub-Issue: {sub_title}")

        try:
            cmd = ["gh", "issue", "create", "--title", sub_title, "--body", sub_body]

            # Native --parent flag (gh >= 2.94.0)
            if USE_PARENT_FLAG and current_parent_number:
                cmd += ["--parent", current_parent_number]

            result = subprocess.run(
                cmd, capture_output=True, text=True, check=True
            )
            sub_number = get_issue_number(result.stdout)
            print(f"  -> Created Sub-Issue #{sub_number}")

            # Fallback: link via gh api if --parent wasn't used
            if not USE_PARENT_FLAG and current_parent_number and sub_number:
                link_sub_issue(current_parent_number, sub_number)

        except subprocess.CalledProcessError as e:
            print(f"  [ERROR] Failed to create sub-issue '{sub_title}': {e.stderr.strip()}")

        continue

    i += 1

print("\nAll issues and sub-issues created successfully!")
