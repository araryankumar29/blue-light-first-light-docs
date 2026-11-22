import html
E = html.escape
CSS = """
@page { size: A3 landscape; margin: 0; }
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Helvetica Neue',Arial,sans-serif;background:#fff;color:#1b1b1b}
.board{width:420mm;height:297mm;padding:14mm 16mm;page-break-after:always;overflow:hidden;background:#fff}
.bh{display:flex;justify-content:space-between;align-items:flex-end;border-bottom:0.3mm solid #d9d9d9;padding-bottom:4mm;margin-bottom:7mm}
.bh h1{font-size:19pt;font-weight:600;letter-spacing:-0.2px}
.bh p{font-size:9.5pt;color:#6b6b6b;max-width:150mm;line-height:1.45}
.cols{display:grid;grid-template-columns:repeat(4,1fr);gap:9mm;}
.col h3{font-size:11pt;font-weight:600;margin-bottom:1mm}
.col .sub{font-size:8.6pt;color:#6b6b6b;margin-bottom:3mm;line-height:1.4}
.phone{width:250px;height:540px;border:1.6px solid #2b2b2b;border-radius:30px;padding:9px;background:#fff;position:relative}
.scr{height:100%;border-radius:22px;background:#f6f6f5;overflow:hidden;position:relative;display:flex;flex-direction:column}
.sb{height:26px;display:flex;justify-content:space-between;align-items:center;padding:0 16px;font-size:9px;color:#444;font-weight:600}
.body{flex:1;padding:8px 12px;display:flex;flex-direction:column;gap:6px;overflow:hidden;position:relative;min-height:0}
.fold{font-size:7.5px;color:#888;text-align:center;border-top:1px dashed #bdbdbd;padding-top:3px;margin-top:auto}
.hdr{display:flex;align-items:center;justify-content:space-between;height:34px}
.hdr .ttl{font-size:11px;font-weight:600;color:#1b1b1b;text-align:center;flex:1}
.hdr .ic{width:22px;height:22px;border:1px solid #9a9a9a;border-radius:6px;font-size:7px;display:flex;align-items:center;justify-content:center;color:#555;background:#fff}
.lbl{font-size:8.5px;text-transform:uppercase;letter-spacing:.08em;color:#666;display:flex;justify-content:space-between}
.lbl b{font-weight:600;color:#555;text-transform:none;letter-spacing:0;font-size:9px;text-decoration:underline}
.h1{font-family:Georgia,serif;font-size:15px;line-height:1.2;color:#1b1b1b}
.h2{font-size:11px;font-weight:600;color:#1b1b1b}
.muted{font-size:8.6px;color:#6b6b6b;line-height:1.35}
.bars div{height:6px;background:#dedede;border-radius:3px;margin-bottom:5px}
.img{background:#e6e6e5;border-radius:14px;position:relative;display:flex;align-items:flex-end;justify-content:flex-start;padding:7px;}
.img span{font-size:7.5px;color:#777;background:#f6f6f5cc;border-radius:4px;padding:2px 4px}
.img:before{content:"";position:absolute;inset:0;background:linear-gradient(to top right,transparent 49.6%,#d0d0cf 49.6%,#d0d0cf 50.4%,transparent 50.4%);border-radius:14px}
.card{background:#fff;border:1px solid #e0e0de;border-radius:14px;padding:9px}
.btn{height:30px;border-radius:15px;display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:600}
.btn.pri{background:#2b2b2b;color:#fff}
.btn.ghost{border:1px solid #9a9a9a;color:#2b2b2b;background:#fff}
.inp{height:30px;border:1px solid #bdbdbd;border-radius:9px;background:#fff;display:flex;align-items:center;padding:0 9px;font-size:8.6px;color:#777}
.chips{display:flex;gap:5px;overflow:hidden}
.chip{font-size:8px;border:1px solid #bdbdbd;border-radius:12px;padding:3px 8px;white-space:nowrap;color:#444;background:#fff}
.chip.on{background:#2b2b2b;color:#fff;border-color:#2b2b2b}
.hrow{display:flex;gap:7px;overflow:hidden}
.hcard{flex:0 0 118px;background:#fff;border:1px solid #e0e0de;border-radius:12px;padding:5px}
.hcard .img{height:70px;border-radius:9px}
.hcard .t{font-size:8.6px;font-weight:600;margin-top:5px}
.hcard .s{font-size:7.6px;color:#6b6b6b}
.stg{flex:0 0 74px;height:72px;border-radius:12px;border:1px solid #cfcfcd;background:#fff;padding:6px;font-size:7.6px;display:flex;flex-direction:column;justify-content:space-between}
.stg.now{background:#2b2b2b;color:#fff;border-color:#2b2b2b}
.stg.past{color:#777}
.stg.fut{color:#999;background:#f0f0ef;border-style:dashed}
.tabs{display:flex;justify-content:space-around;background:#fff;border-top:1px solid #e0e0de;padding:7px 0 9px;font-size:7.8px;color:#777}
.tabs .on{color:#1b1b1b;font-weight:700}
.tabs span:before{content:"";display:block;width:12px;height:12px;border-radius:4px;background:#d6d6d4;margin:0 auto 3px}
.tabs .on:before{background:#2b2b2b}
.row{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #e6e6e4;padding:7px 0;font-size:8.6px}
.row .r{color:#6b6b6b}
.avs{display:flex;gap:9px;justify-content:space-between}
.av{width:34px;text-align:center;font-size:7.4px;color:#555}
.av i{display:block;width:30px;height:30px;border-radius:50%;background:#dcdcda;margin-bottom:3px}
.bub{max-width:78%;background:#fff;border:1px solid #e0e0de;border-radius:12px;padding:6px 8px;font-size:8px;color:#333;line-height:1.35}
.bub.me{align-self:flex-end;background:#e4e4e2;border-color:#e4e4e2}
.sheet{position:absolute;left:0;right:0;bottom:0;max-height:78%;overflow:hidden;background:#fff;border-radius:20px 20px 0 0;border-top:1px solid #d0d0ce;padding:12px 12px 16px;box-shadow:0 -6px 18px rgba(0,0,0,.06);display:flex;flex-direction:column;gap:7px}
.sheet .grab{width:34px;height:4px;background:#c8c8c6;border-radius:2px;margin:0 auto 4px}
.dim{position:absolute;inset:0;background:rgba(40,40,40,.18)}
.qr{width:120px;height:120px;margin:0 auto;border:1px solid #bdbdbd;border-radius:8px;background:repeating-conic-gradient(#8a8a8a 0 25%,#fff 0 50%) 0 0/16px 16px}
.ico{width:46px;height:46px;border:1px solid #9a9a9a;border-radius:12px;background:#fff;font-size:7.5px;color:#444;display:flex;align-items:center;justify-content:center;text-align:center;line-height:1.2}
.ico.open{border-style:dashed;color:#888}
.ibar{display:flex;gap:6px;align-items:center}
.tagn{position:absolute;top:-7px;left:-7px;width:17px;height:17px;border-radius:50%;background:#2b2b2b;color:#fff;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;z-index:5;border:2px solid #fff}
.legend{margin-top:3mm;font-size:8.3px;line-height:1.4}
.legend li{list-style:none;margin-bottom:2.2mm;padding-left:0}
.legend .n{display:inline-block;width:14px;height:14px;border-radius:50%;background:#2b2b2b;color:#fff;text-align:center;line-height:14px;font-size:7.5px;font-weight:700;margin-right:4px;vertical-align:1px}
.legend b{font-weight:600;color:#1b1b1b}
.legend .d{color:#5c5c5c}
.legend .k{color:#8a8a8a;font-size:7.6px;text-transform:uppercase;letter-spacing:.05em}
.legend ul{padding:0}
"""

counter = {"n": 0}
def comp(inner, title, detail, kind="", tag=None):
    counter["n"] += 1
    n = counter["n"]
    return inner, n, title, detail, kind

def phone(items, extra=""):
    # items: list of (inner_html, n, ...), positioned sequentially in body unless raw
    parts = []
    for item in items:
        inner, n = item[0], item[1]
        parts.append(f'<div style="position:relative">{inner}<span class="tagn">{n}</span></div>')
    return parts

def sbar():
    return '<div class="sb"><span>9:41</span><span>●●●</span></div>'

def hdr(left="‹", center="", right=("",)):
    rr = "".join(f'<span class="ic">{E(x)}</span>' for x in right)
    return f'<div class="hdr"><span class="ic">{E(left)}</span><span class="ttl">{E(center)}</span><span style="display:flex;gap:5px">{rr}</span></div>'

def tabbar(items, active):
    out = []
    for t in items:
        out.append(f'<span class="{"on" if t==active else ""}">{E(t)}</span>')
    return '<div class="tabs">' + "".join(out) + '</div>'

def build_screen(title, components, sheet=None):
    legend = []
    body_items, tabs_items = [], []
    for i,(h, t, d) in enumerate(components, start=1):
        blk = f'<div style="position:relative">{h}<span class="tagn">{i}</span></div>'
        (tabs_items if 'class="tabs"' in h else body_items).append(blk)
        legend.append(f'<li><span class="n">{i}</span><b>{E(t)}</b><div class="d">{E(d)}</div></li>')
    sheet_html = ""
    if sheet:
        inner = []
        for j,(h,t,d) in enumerate(sheet, start=len(components)+1):
            inner.append(f'<div style="position:relative">{h}<span class="tagn">{j}</span></div>')
            legend.append(f'<li><span class="n">{j}</span><b>{E(t)}</b><div class="d">{E(d)}</div></li>')
        sheet_html = '<div class="dim"></div><div class="sheet"><div class="grab"></div>' + "".join(inner) + '</div>'
    body = "".join(body_items) + '<div class="fold">continues below · scroll</div>'
    screen = f'<div class="phone"><div class="scr">{sbar()}<div class="body">{body}</div>{"".join(tabs_items)}{sheet_html}</div></div>'
    return screen, "".join(legend)

def col(title, sub, components, sheet=None):
    screen, legend = build_screen(title, components, sheet)
    return f'<div class="col"><h3>{E(title)}</h3><div class="sub">{E(sub)}</div>{screen}<ul class="legend">{legend}</ul></div>'

def board(title, intro, cols):
    return f'<section class="board"><div class="bh"><h1>{E(title)}</h1><p>{E(intro)}</p></div><div class="cols">{"".join(cols)}</div></section>'

def req_col(title, para, bullets, sources):
    bl = "".join(f"<li>{E(b)}</li>" for b in bullets)
    return (f'<div class="col"><h3>{E(title)}</h3><p class="para">{E(para)}</p>'
            f'<div class="k">Rules and states</div><ul class="bl">{bl}</ul>'
            f'<div class="k">Sources</div><div class="src">{E(sources)}</div></div>')

def req_board(title, intro, cols):
    return f'<section class="board"><div class="bh"><h1>{E(title)}</h1><p>{E(intro)}</p></div><div class="cols">{"".join(cols)}</div></section>'

def page_block(title, paras):
    body = "".join(f"<p>{E(p)}</p>" for p in paras)
    return f'<section class="board"><div class="bh"><h1>{E(title)}</h1></div><div class="prose">{body}</div></section>'

CSS += """
.para{font-size:12.4px;line-height:1.62;color:#2b2b2b;margin-bottom:4mm}
.k{font-size:9px;text-transform:uppercase;letter-spacing:.07em;color:#777;margin:5mm 0 1.6mm}
.bl{padding-left:14px;font-size:11px;line-height:1.5;color:#333}
.bl li{margin-bottom:1.4mm}
.src{font-size:10px;color:#6b6b6b;line-height:1.5}
.prose{max-width:250mm;font-size:11pt;line-height:1.6;color:#2b2b2b}
.prose p{margin-bottom:4mm}
.note-warn{font-size:8.4px;color:#5c5c5c;border:1px dashed #9a9a9a;border-radius:8px;padding:5px 7px;line-height:1.35}
table.log{border-collapse:collapse;width:100%;font-size:9.4px;line-height:1.4}
table.log th{text-align:left;border-bottom:1px solid #999;padding:4px 6px;font-weight:600}
table.log td{border-bottom:1px solid #e0e0de;padding:4px 6px;vertical-align:top}
"""
