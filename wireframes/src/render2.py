import sys
from playwright.sync_api import sync_playwright
src, dst = sys.argv[1], sys.argv[2]
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={"width":1587,"height":1123})
    pg.goto("file://"+src)
    pg.pdf(path=dst, format="A3", landscape=True, print_background=True, margin={"top":"0","bottom":"0","left":"0","right":"0"})
    b.close()
