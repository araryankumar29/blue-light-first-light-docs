import sys, re
from bs4 import BeautifulSoup
def txt(el): return re.sub(r"\s+"," ", el.get_text(" ", strip=True)).strip()
def convert(src, dst, label):
    s = BeautifulSoup(open(src, encoding="utf-8").read(), "html.parser")
    out = [f"# {label}", "", "Plain-text version of the wireframe set. Each board lists its phone screens with numbered components, and each requirement page lists the rules for those screens. Bracketed values such as [14] are placeholders.", ""]
    for sec in s.select("section.board"):
        classes = sec.get("class", [])
        if sec.select("table.log"):
            out += ["## Conflicts settled", ""]
            rows = sec.select("table.log tr")[1:]
            out += ["| Item | What the sources say | Decision and why |", "|---|---|---|"]
            for r in rows:
                c = [txt(td) for td in r.find_all("td")]
                if len(c)==3: out.append(f"| {c[0]} | {c[1]} | {c[2]} |")
            out.append("")
            continue
        if sec.select(".prose") and not sec.select(".cols"):
            h = sec.select_one("h1")
            kicker = sec.select_one(".kicker")
            if kicker: out += [f"_{txt(kicker)}_", ""]
            if h: out += [f"## {txt(h)}", ""]
            for p in sec.select("p"):
                t = txt(p)
                if t: out.append(t if not t.startswith("•") else "- " + t[1:].strip())
                out.append("")
            continue
        h = sec.select_one(".bh h1")
        intro = sec.select_one(".bh p")
        if sec.select_one(".kicker") and not sec.select_one(".bh"):
            out += [f"_{txt(sec.select_one('.kicker'))}_", ""]
            if sec.select_one("h1"): out += [f"## {txt(sec.select_one('h1'))}", ""]
            for p in sec.select("p"):
                out += [txt(p), ""]
            continue
        if h: out += [f"## {txt(h)}", ""]
        if intro: out += [txt(intro), ""]
        for col in sec.select(".col"):
            name = txt(col.select_one("h3")) if col.select_one("h3") else ""
            out += [f"### {name}", ""]
            sub = col.select_one(".sub")
            if sub: out += [txt(sub), ""]
            para = col.select_one("p.para")
            if para:
                out += [txt(para), ""]
                for k in col.select(".k"):
                    out += [f"**{txt(k)}**", ""]
                    nxt = k.find_next_sibling()
                    if nxt and nxt.name == "ul":
                        out += [f"- {txt(li)}" for li in nxt.select("li")] + [""]
                    elif nxt and "src" in nxt.get("class", []):
                        out += [txt(nxt), ""]
                continue
            legend = col.select_one(".legend")
            if legend:
                out += ["**Components**", ""]
                for li in legend.select("li"):
                    n = txt(li.select_one(".n")); t = txt(li.select_one("b")); d = txt(li.select_one(".d"))
                    out.append(f"{n}. **{t}**: {d}")
                out.append("")
    open(dst, "w", encoding="utf-8").write("\n".join(out))
    return len(out)
jobs = [
 ("client_v4.html","First_Light_Client_Wireframes_v4.md","First Light · Client wireframes v4"),
 ("dp_v2.html","First_Light_Design_Partner_Wireframes_v2.md","First Light · Design partner wireframes v2"),
 ("dh_v1.html","First_Light_Design_Head_Wireframes_v1.md","First Light · Design Head wireframes v1"),
 ("rep_v1.html","First_Light_Sales_Representative_Wireframes_v1.md","First Light · Sales representative wireframes v1"),
 ("sh_v1.html","First_Light_Sales_Head_Wireframes_v1.md","First Light · Sales Head wireframes v1"),
 ("pm_v1.html","First_Light_Production_Manager_Wireframes_v1.md","First Light · Production Manager wireframes v1"),
 ("ph_v1.html","First_Light_Production_Head_Wireframes_v1.md","First Light · Production Head wireframes v1"),
 ("mh_v1.html","First_Light_Marketing_Head_Wireframes_v1.md","First Light · Marketing Head wireframes v1"),
]
for src,dst,label in jobs:
    n = convert(src, "/home/claude/blue-light-first-light-docs/wireframes/"+dst, label)
    print(dst, n)
