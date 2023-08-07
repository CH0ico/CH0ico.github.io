var now = new Date;
function createtime() { var t = new Date("08/01/2023 00:00:00");
now.setTime(now.getTime() + 250); 
var e = (now - t) / 1e3 / 60 / 60 / 24, a = Math.floor(e), n = (now - t) / 1e3 / 60 / 60 - 24 * a, r = Math.floor(n);1 == String(r).length && (r = "0" + r); var s = (now - t) / 1e3 / 60 - 1440 * a - 60 * r, i = Math.floor(s); 
1 == String(i).length && (i = "0" + i); 
var o = (now - t) / 1e3 - 86400 * a - 3600 * r - 60 * i, 
l = Math.round(o); 
1 == String(l).length && (l = "0" + l);
let g = ""; 
g = r < 18 && r >= 9 
? `<img class='boardsign' src='https://img1.imgtp.com/2023/08/03/U3hSxpgp.png' title='距离月入25k也就还差一个大佬带我~'><span class='textTip'> <br> 本站居然运行了 ${a} 天</span><span id='runtime'> ${r} 小时 ${i} 分 ${l} 秒 </span> <i class='fas fa-heartbeat' style='color:red'></i>` 
: `<img class='boardsign' src='https://img1.imgtp.com/2023/08/03/U3hSxpgp.png' title='下班了就该开开心心的玩耍，嘿嘿~'><span class='textTip'> <br> 本站居然运行了 ${a} 天</span><span id='runtime'> ${r} 小时 ${i} 分 ${l} 秒 </span> <i class='fas fa-heartbeat' style='color:red'></i>`, 
        document.getElementById("workboard") && (document.getElementById("workboard").innerHTML = g)
} setInterval((() => { createtime() }), 250); 144

var CURSOR;

Math.lerp = (a, b, n) => (1 - n) * a + n * b;

const getStyle = (el, attr) => {
    try {
        return window.getComputedStyle
            ? window.getComputedStyle(el)[attr]
            : el.currentStyle[attr];
    } catch (e) {}
    return "";
};

class Cursor {
    constructor() {
        this.pos = {curr: null, prev: null};
        this.pt = [];
        this.create();
        this.init();
        this.render();
    }

    move(left, top) {
        this.cursor.style["left"] = `${left}px`;
        this.cursor.style["top"] = `${top}px`;
    }

    create() {
        if (!this.cursor) {
            this.cursor = document.createElement("div");
            this.cursor.id = "cursor";
            this.cursor.classList.add("hidden");
            document.body.append(this.cursor);
        }

        var el = document.getElementsByTagName('*');
        for (let i = 0; i < el.length; i++)
            if (getStyle(el[i], "cursor") == "pointer")
                this.pt.push(el[i].outerHTML);

        document.body.appendChild((this.scr = document.createElement("style")));
        // 这里改变鼠标指针的颜色 由svg生成
        this.scr.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24px' height='24px'><circle cx='4' cy='4' r='4' fill='rgba(0, 128, 0, 0.5)'/></svg>") 4 4, auto}`;
    }

    refresh() {
        this.scr.remove();
        this.cursor.classList.remove("hover");
        this.cursor.classList.remove("active");
        this.pos = {curr: null, prev: null};
        this.pt = [];

        this.create();
        this.init();
        this.render();
    }

    init() {
        document.onmouseover  = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.add("hover");
        document.onmouseout   = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.remove("hover");
        document.onmousemove  = e => {(this.pos.curr == null) && this.move(e.clientX - 8, e.clientY - 8); this.pos.curr = {x: e.clientX - 8, y: e.clientY - 8}; this.cursor.classList.remove("hidden");};
        document.onmouseenter = e => this.cursor.classList.remove("hidden");
        document.onmouseleave = e => this.cursor.classList.add("hidden");
        document.onmousedown  = e => this.cursor.classList.add("active");
        document.onmouseup    = e => this.cursor.classList.remove("active");
    }

    render() {
        if (this.pos.prev) {
            this.pos.prev.x = Math.lerp(this.pos.prev.x, this.pos.curr.x, 0.15);
            this.pos.prev.y = Math.lerp(this.pos.prev.y, this.pos.curr.y, 0.15);
            this.move(this.pos.prev.x, this.pos.prev.y);
        } else {
            this.pos.prev = this.pos.curr;
        }
        requestAnimationFrame(() => this.render());
    }
}

(() => {
    CURSOR = new Cursor();
    // 需要重新获取列表时，使用 CURSOR.refresh()
})();