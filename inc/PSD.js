/** @license psd.js 2012 - imaya [ https://github.com/imaya/psd.js ] The MIT License */
(function () {
    'use strict';

    function e() {
        return function () {};
    }
    var i = this;

    function j(a, b) {
        var c = a.split("."),
            d = i;
        !(c[0] in d) && d.execScript && d.execScript("var " + c[0]);
        for (var f; c.length && (f = c.shift());)!c.length && void 0 !== b ? d[f] = b : d = d[f] ? d[f] : d[f] = {};
    }

    function l(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.superClass_ = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
    };
    var m = void 0 !== i.Uint8Array && void 0 !== i.Uint16Array && void 0 !== i.Uint32Array;

    function n() {}
    n.prototype.parse = function (a) {
        this.offset = a.ip;
        this.type = p(a);
        a.seek(26, this.offset);
        this.length = a.ip - this.offset;
    };

    function r() {}
    r.prototype.parse = function (a, b) {
        var c;
        this.offset = a.ip;
        this.signature = u(a, 4);
        this.key = u(a, 4);
        c = v(a);
        this.length = c + 12;
        "function" === typeof r[this.key] ? (this.info = new r[this.key], this.info.parse(a, c, b)) : i.console.warn("additional layer information: not implemented", this.key);
        a.seek(this.offset + this.length, 0);
    };
    var z = {};
    z.bevl = {};
    z.bevl = e();
    z.bevl.prototype.parse = function (a) {
        this.offset = a.ip;
        this.size = v(a);
        this.version = v(a);
        this.angle = A(a);
        this.strength = A(a);
        this.blur = A(a);
        this.highlightBlendModeSignature = u(a, 4);
        this.highlightBlendModeKey = u(a, 4);
        this.shadowBlendModeSignature = u(a, 4);
        this.shadowBlendModeKey = u(a, 4);
        a.seek(2);
        this.highlightColor = [v(a), v(a)];
        a.seek(2);
        this.shadowColor = [v(a), v(a)];
        this.bevelStyle = B(a);
        this.highlightOpacity = B(a);
        this.shadowOpacity = B(a);
        this.enabled = !! B(a);
        this.use = !! B(a);
        this.up = !! B(a);
        2 === this.version && (a.seek(2),
            this.readHighlightColor = [v(a), v(a)], a.seek(2), this.readShadowColor = [v(a), v(a)]);
        this.length = a.ip - this.offset;
    };
    z.cmnS = {};
    z.cmnS = e();
    z.cmnS.prototype.parse = function (a) {
        this.offset = a.ip;
        this.size = v(a);
        this.version = v(a);
        this.visible = !! B(a);
        a.seek(2);
        this.length = a.ip - this.offset;
    };
    z.dsdw = {};
    z.dsdw = e();
    z.dsdw.prototype.parse = function (a) {
        this.offset = a.ip;
        this.size = v(a);
        this.version = v(a);
        this.blur = A(a);
        this.intensity = A(a);
        this.angle = A(a);
        this.distance = A(a);
        a.seek(2);
        this.color = [v(a), v(a)];
        this.signature = u(a, 4);
        this.blend = u(a, 4);
        this.enabled = !! B(a);
        this.use = !! B(a);
        this.opacity = B(a);
        a.seek(2);
        this.nativeColor = [v(a), v(a)];
        this.length = a.ip - this.offset
    };
    z.iglw = {};
    z.iglw = e();
    z.iglw.prototype.parse = function (a) {
        this.offset = a.ip;
        this.size = v(a);
        this.version = v(a);
        this.blur = A(a);
        this.intensity = A(a);
        a.seek(2);
        this.color = [v(a), v(a)];
        this.signature = u(a, 4);
        this.blend = u(a, 4);
        this.enabled = !! B(a);
        this.opacity = B(a);
        2 === this.version && (this.invert = !! B(a), a.seek(2), this.nativeColor = [v(a), v(a)]);
        this.length = a.ip - this.offset
    };
    z.isdw = {};
    z.isdw = z.dsdw;
    z.oglw = {};
    z.oglw = e();
    z.oglw.prototype.parse = function (a) {
        this.offset = a.ip;
        this.size = v(a);
        this.version = v(a);
        this.blur = A(a);
        this.intensity = A(a);
        a.seek(2);
        this.color = [v(a), v(a)];
        this.signature = u(a, 4);
        this.blend = u(a, 4);
        this.enabled = !! B(a);
        this.opacity = B(a);
        2 === this.version && (a.seek(2), this.nativeColor = [v(a), v(a)]);
        this.length = a.ip - this.offset
    };
    z.sofi = {};
    z.sofi = e();
    z.sofi.prototype.parse = function (a) {
        var b;
        this.offset = a.ip;
        this.size = v(a);
        this.version = v(a);
        b = u(a, 4);
        if ("8BIM" !== b) throw Error("invalid signature:", b);
        this.blend = u(a, 4);
        a.seek(2);
        this.color = [D(a) >> 8, D(a) >> 8, D(a) >> 8, D(a) >> 8];
        this.opacity = B(a);
        this.enabled = !! B(a);
        a.seek(2);
        this.nativeColor = [p(a) >> 8, p(a) >> 8, p(a) >> 8, p(a) >> 8];
        this.length = a.ip - this.offset
    };
    r.Patta = e();
    r.Patta.prototype.parse = function (a, b, c) {
        b = a.ip + b;
        for (this.offset = a.ip; a.ip < b;) v(a), v(a), A(a), p(a), p(a), E(a, v(a)), u(a, a.input[a.ip++]), c.colorMode === F && G(a, 768), G(a, b - this.offset);
        this.length = a.ip - this.offset
    };
    r.PlLd = e();
    r.PlLd.prototype.parse = function (a) {
        this.offset = a.ip;
        this.type = u(a, 4);
        if ("plcL" !== this.type) throw Error("invalid type:", this.type);
        this.version = v(a);
        this.id = u(a, a.input[a.ip++]);
        this.page = A(a);
        this.totalPage = A(a);
        this.antiAlias = A(a);
        this.placedLayerType = A(a);
        this.transform = [a.readFloat64(), a.readFloat64(), a.readFloat64(), a.readFloat64(), a.readFloat64(), a.readFloat64(), a.readFloat64(), a.readFloat64()];
        this.warpVersion = A(a);
        this.warpDescriptorVersion = A(a);
        this.descriptor = new H;
        this.descriptor.parse(a);
        this.length =
            a.ip - this.offset
    };
    r.SoLd = e();
    r.SoLd.prototype.parse = function (a) {
        this.offset = a.ip;
        this.identifier = u(a, 4);
        if ("soLD" !== this.identifier) throw Error("invalid identifier:", this.identifier);
        this.version = v(a);
        this.descriptorVersion = A(a);
        this.descriptor = new H;
        this.descriptor.parse(a);
        this.length = a.ip - this.offset
    };
    r.TySh = e();
    r.TySh.prototype.parse = function (a) {
        this.offset = a.ip;
        this.version = p(a);
        this.transform = [a.readFloat64(), a.readFloat64(), a.readFloat64(), a.readFloat64(), a.readFloat64(), a.readFloat64()];
        this.textVersion = p(a);
        this.textDescriptorVersion = A(a);
        this.textData = new H;
        this.textData.parse(a);
        this.textData.items !== this.textData.item.length ? i.console.error("Descriptor parsing failed") : (this.warpVersion = p(a), this.warpDescriptorVersion = A(a), this.warpData = new H, this.warpData.parse(a), i.console.log("TySh implementation is incomplete"), this.left =
            A(a), this.top = A(a), this.right = A(a), this.bottom = A(a), this.length = a.ip - this.offset)
    };
    r.clbl = e();
    r.clbl.prototype.parse = function (a) {
        this.offset = a.ip;
        this.blendClippedElements = !! B(a);
        a.seek(3);
        this.length = a.ip - this.offset
    };
    r.fxrp = e();
    r.fxrp.prototype.parse = function (a) {
        this.offset = a.ip;
        this.referencePoint = [a.readFloat64(), a.readFloat64()];
        this.length = a.ip - this.offset;
    };
    r.iOpa = e();
    r.iOpa.prototype.parse = function (a) {
        this.offset = a.ip;
        this.opacity = B(a);
        a.seek(3);
        this.length = a.ip - this.offset;
    };
    r.infx = e();
    r.infx.prototype.parse = function (a) {
        this.offset = a.ip;
        this.blendInteriorElements = !! B(a);
        a.seek(3);
        this.length = a.ip - this.offset;
    };
    r.knko = e();
    r.knko.prototype.parse = function (a) {
        this.offset = a.ip;
        this.knockout = !! B(a);
        a.seek(3);
        this.length = a.ip - this.offset;
    };
    r.lclr = e();
    r.lclr.prototype.parse = function (a) {
        this.offset = a.ip;
        this.color = [v(a), v(a)];
        this.length = a.ip - this.offset;
    };
    r.lfx2 = e();
    r.lfx2.prototype.parse = function (a) {
        this.offset = a.ip;
        this.version = v(a);
        this.descriptorVersion = v(a);
        this.descriptor = new H;
        this.descriptor.parse(a);
        this.length = a.ip - this.offset;
    };
    r.lnsr = e();
    r.lnsr.prototype.parse = function (a) {
        this.offset = a.ip;
        this.id = u(a, 4);
        this.length = a.ip - this.offset;
    };
    r.lrFX = e();
    r.lrFX.prototype.parse = function (a) {
        var b, c, d;
        this.offset = a.ip;
        this.version = D(a);
        this.count = D(a);
        this.effect = [];
        for (d = 0; d < this.count; ++d) {
            b = u(a, 4);
            if ("8BIM" !== b) {
                i.console.warn("invalid signature:", b);
                break;
            }
            this.key = b = u(a, 4);
            if ("function" === typeof z[this.key]) c = new z[this.key], c.parse(a), this.effect[d] = {
                key: b,
                effect: c
            };
            else {
                i.console.warn("detect unknown key:", b);
                break;
            }
        }
        this.length = a.ip - this.offset;
    };
    r.lsct = e();
    r.lsct.prototype.parse = function (a, b) {
        var c;
        this.offset = a.ip;
        this.type = v(a);
        if (12 === b) {
            c = u(a, 4);
            if ("8BIM" !== c) throw Error("invalid section divider setting signature:", c);
            this.key = u(a, 4);
        }
        this.length = a.ip - this.offset;
    };
    r.lspf = e();
    r.lspf.prototype.parse = function (a) {
        this.offset = a.ip;
        this.flags = v(a);
        this.length = a.ip - this.offset;
    };
    r.luni = e();
    r.luni.prototype.parse = function (a) {
        var b;
        this.offset = a.ip;
        b = v(a);
        this.layerName = E(a, b);
        1 === (b & 1) && a.seek(2);
        this.length = a.ip - this.offset;
    };
    r.lyid = e();
    r.lyid.prototype.parse = function (a) {
        this.offset = a.ip;
        this.layerId = v(a);
        this.length = a.ip - this.offset;
    };
    r.lyvr = e();
    r.lyvr.prototype.parse = function (a) {
        this.offset = a.ip;
        this.version = v(a);
        this.length = a.ip - this.offset;
    };
    r.shmd = e();
    r.shmd.prototype.parse = function (a) {
        var b, c, d, f, g = this.metadata = [],
            k, h;
        this.offset = a.ip;
        this.items = v(a);
        k = 0;
        for (h = this.items; k < h; ++k) b = u(a, 4), c = u(a, 4), d = B(a), a.seek(3), f = v(a), f = G(a, f), g[k] = {
            signature: b,
            key: c,
            copy: d,
            data: f
        };
        this.length = a.ip - this.offset;
    };
    r.vmsk = e();
    r.vmsk.prototype.parse = function (a, b) {
        var c = a.ip + b;
        this.offset = a.ip;
        this.version = v(a);
        for (this.flags = v(a); a.ip + 26 <= c;) this.path = new n, this.path.parse(a);
        this.length = a.ip - this.offset;
    };

    function I() {};

    function H() {}
    H.prototype.parse = function (a) {
        var b, c, d, f;
        this.offset = a.ip;
        b = v(a);
        this.name = E(a, b);
        b = v(a) || 4;
        this.classId = u(a, b);
        this.items = v(a);
        this.item = [];
        d = 0;
        for (f = this.items; d < f; ++d) {
            b = v(a) || 4;
            b = u(a, b);
            c = u(a, 4);
            if ("function" !== typeof H[c]) {
                i.console.warn("OSType Key not implemented:", c);
                break
            }
            c = new H[c];
            c.parse(a);
            this.item.push({
                key: b,
                data: c
            })
        }
        this.length = a.ip - this.offset;
    };
    r.GdFl = e();
    r.GdFl.prototype.parse = function (a) {
        this.offset = a.ip;
        this.version = v(a);
        this.descriptor = new H;
        this.descriptor.parse(a);
        this.length = a.ip - this.offset
    };
    r.SoCo = e();
    r.SoCo.prototype.parse = function (a) {
        this.offset = a.ip;
        this.version = v(a);
        this.descriptor = new H;
        this.descriptor.parse(a);
        this.length = a.ip - this.offset;
    };
    H.ObAr = e();
    H.ObAr.prototype.parse = function (a) {
        this.offset = a.ip;
        i.console.warn("OSType key not implemented (undocumented): ObAr(ObjectArray?)");
        this.length = a.ip - this.offset;
    };
    H.Objc = e();
    H.Objc.prototype.parse = function (a) {
        this.offset = a.ip;
        this.value = new H;
        this.value.parse(a);
        this.length = a.ip - this.offset;
    };
    H.GlbO = H.Objc;
    H.TEXT = e();
    H.TEXT.prototype.parse = function (a) {
        var b;
        this.offset = a.ip;
        b = v(a);
        this.string = E(a, b);
        this.length = a.ip - this.offset;
    };
    H.UnFl = e();
    H.UnFl.prototype.parse = function (a) {
        var b = this.value = [],
            c, d;
        this.offset = a.ip;
        this.key = u(a, 4);
        c = v(a);
        for (d = 0; d < c; ++d) b[d] = a.readFloat64();
        this.length = a.ip - this.offset;
    };
    H.UntF = e();
    H.UntF.prototype.parse = function (a) {
        this.offset = a.ip;
        this.units = u(a, 4);
        this.value = a.readFloat64();
        this.length = a.ip - this.offset;
    };
    H.VlLs = e();
    H.VlLs.prototype.parse = function (a) {
        var b, c, d, f;
        this.offset = a.ip;
        this.item = [];
        b = v(a);
        for (c = 0; c < b; ++c) {
            d = u(a, 4);
            if ("function" !== typeof H[d]) {
                i.console.error("OSType Key not implemented:", d);
                return
            }
            f = new H[d];
            f.parse(a);
            this.item.push({
                type: d,
                data: f
            });
        }
        this.length = a.ip - this.offset;
    };
    H.alis = e();
    H.alis.prototype.parse = function (a) {
        var b;
        this.offset = a.ip;
        b = v(a);
        this.value = G(a, b);
        this.length = a.ip - this.offset
    };
    H.bool = e();
    H.bool.prototype.parse = function (a) {
        this.offset = a.ip;
        this.value = !! B(a);
        this.length = a.ip - this.offset
    };
    H.doub = e();
    H.doub.prototype.parse = function (a) {
        this.offset = a.ip;
        this.value = a.readFloat64();
        this.length = a.ip - this.offset
    };
    H["enum"] = e();
    H["enum"].prototype.parse = function (a) {
        var b;
        this.offset = a.ip;
        b = v(a);
        0 === b && (b = 4);
        this.type = u(a, b);
        b = v(a);
        0 === b && (b = 4);
        this.enum = u(a, b);
        this.length = a.ip - this.offset
    };
    H["long"] = e();
    H["long"].prototype.parse = function (a) {
        this.offset = a.ip;
        this.value = A(a);
        this.length = a.ip - this.offset
    };
    H["obj "] = e();
    H["obj "].prototype.parse = function (a) {
        var b, c, d, f;
        this.offset = a.ip;
        this.item = [];
        b = this.items = v(a);
        for (f = 0; f < b; ++f) {
            c = u(a, 4);
            d = H["obj "].Table[c];
            if ("function" !== typeof H[d]) {
                i.console.error("OSType Key not implemented:", d);
                return
            }
            d = new H[d];
            d.parse(a);
            this.item.push({
                key: c,
                data: d
            })
        }
        this.length = a.ip - this.offset
    };
    H["obj "].Table = {
        prop: "prop",
        Clss: "type",
        Enmr: "enum",
        rele: "rele",
        Idnt: "long",
        indx: "long",
        name: "TEXT"
    };
    H.prop = e();
    H.prop.prototype.parse = function (a) {
        var b;
        this.offset = a.ip;
        b = v(a);
        this.name = E(a, b);
        b = v(a) || 4;
        this.classId = u(a, b);
        b = v(a) || 4;
        this.keyId = u(a, b);
        this.length = a.ip - this.offset
    };
    H.rele = e();
    H.rele.prototype.parse = function (a) {
        var b;
        this.offset = a.ip;
        b = v(a);
        this.name = E(a, b);
        b = v(a) || 4;
        this.classId = u(a, b);
        this.value = v(a);
        this.length = a.ip - this.offset;
    };
    H.tdta = e();
    H.tdta.prototype.parse = function (a) {
        var b;
        this.offset = a.ip;
        b = v(a);
        this.data = G(a, b);
        this.length = a.ip - this.offset;
    };
    H.type = e();
    H.type.prototype.parse = function (a) {
        var b;
        this.offset = a.ip;
        b = v(a);
        this.name = E(a, b);
        b = v(a) || 4;
        this.classId = u(a, b);
        this.length = a.ip - this.offset;
    };
    H.GlbC = H.type;
    var F = 2;

    function J() {};

    function K() {
        this.channel = [];
    }
    K.prototype.parse = function (a) {
        var b;
        this.offset = a.ip;
        this.length = v(a) + 4;
        if (4 === this.length) window.console.log("skip: layer blending ranges(empty body)");
        else {
            b = this.offset + this.length;
            this.black = D(a);
            this.white = D(a);
            for (this.destRange = v(a); a.ip < b;) this.channel.push([v(a), v(a)]);
        }
    };

    function L() {}
    L.prototype.parse = function (a) {
        var b;
        this.offset = a.ip;
        b = v(a);
        this.length = b + 4;
        0 === b ? window.console.log("skip: layer mask data (empty body)") : (this.top = A(a), this.left = A(a), this.bottom = A(a), this.right = A(a), this.defaultColor = B(a), this.flags = B(a), 20 === b ? this.padding = D(a) : (this.realFlags = B(a), this.realBackground = B(a), this.top2 = A(a), this.left2 = A(a), this.bottom2 = A(a), this.right2 = A(a)))
    };

    function M(a, b) {
        this.input = m ? new Uint8Array(a) : a;
        this.ip = b | 0;
    }

    function v(a) {
        return (a.input[a.ip++] << 24 | a.input[a.ip++] << 16 | a.input[a.ip++] << 8 | a.input[a.ip++]) >>> 0
    }

    function A(a) {
        return a.input[a.ip++] << 24 | a.input[a.ip++] << 16 | a.input[a.ip++] << 8 | a.input[a.ip++]
    }

    function D(a) {
        return a.input[a.ip++] << 8 | a.input[a.ip++]
    }

    function p(a) {
        return (a.input[a.ip++] << 8 | a.input[a.ip++]) << 16 >> 16
    }

    function B(a) {
        return a.input[a.ip++]
    }
    var aa = M.prototype;
    if (m) var N = new ArrayBuffer(8),
    ba = new Uint8Array(N), ca = new Float64Array(N);
    else var da = Math.pow(2, 48),
    ea = Math.pow(2, 40), fa = Math.pow(2, 32), ga = Math.pow(2, 24), ha = Math.pow(2, 16), ia = Math.pow(2, 8), ja = Math.pow(2, -1022), ka = Math.pow(2, -52);
    aa.readFloat64 = function () {
        var a;
        if (m) {
            a = this.input;
            for (var b = this.ip, c = 8; --c;) ba[c] = a[b++];
            a = ca[0]
        } else {
            var c = this.input,
                d = this.ip;
            a = 0 === (c[d] & 128);
            b = (c[d++] & 127) << 4 | (c[d] & 240) >> 4;
            c = (c[d++] & 15) * da + c[d++] * ea + c[d++] * fa + c[d++] * ga + c[d++] * ha + c[d++] * ia + c[d++];
            a = 0 === b ? 0 === c ? 0 : (a ? 1 : -1) * ja * c * ka : 2047 === b ? c ? NaN : a ? Infinity : -Infinity : (a ? 1 : -1) * (Math.pow(2, b - 1023) + c * Math.pow(2, b - 1075))
        }
        this.ip += 8;
        return a
    };

    function G(a, b) {
        return m ? a.input.subarray(a.ip, a.ip += b) : a.input.slice(a.ip, a.ip += b)
    }
    M.prototype.slice = function (a, b) {
        this.ip = b;
        return m ? this.input.subarray(a, b) : this.input.slice(a, b)
    };
    M.prototype.fetch = function (a, b) {
        return m ? this.input.subarray(a, b) : this.input.slice(a, b)
    };

    function u(a, b) {
        var c = a.input,
            d = a.ip,
            f = [],
            g;
        for (g = 0; g < b; ++g) f[g] = String.fromCharCode(c[d++]);
        a.ip = d;
        return f.join("")
    }

    function E(a, b) {
        var c = a.input,
            d = a.ip,
            f = [],
            g;
        for (g = 0; g < b; ++g) f[g] = String.fromCharCode(c[d++] << 8 | c[d++]);
        a.ip = d;
        return f.join("")
    }
    M.prototype.seek = function (a, b) {
        "number" !== typeof b && (b = this.ip);
        this.ip = b + a
    };

    function O(a, b) {
        var c, d, f, g = [],
            k = 0;
        for (c = a.ip + b; a.ip < c;)
            if (d = a.input[a.ip++] << 24 >> 24, 0 > d) {
                d = 1 - d;
                for (f = B(a); 0 < d--;) g[k++] = f
            } else
                for (d = 1 + d; 0 < d--;) g[k++] = B(a);
        return g
    };

    function P() {}
    P.prototype.parse = function (a) {
        this.offset = a.ip;
        this.length = v(a) + 4;
        this.overlayColorSpace = D(a);
        this.colorComponents = [D(a), D(a), D(a), D(a)];
        this.opacity = D(a);
        this.kind = B(a);
        this.filter = G(a, this.offset + this.length - a.ip);
        a.seek(this.offset + this.length, 0)
    };

    function Q() {}
    Q.prototype.parse = function (a) {
        this.offset = a.ip;
        this.signature = u(a, 4);
        if ("8BPS" !== this.signature) throw Error("invalid signature");
        this.version = D(a);
        this.reserved = G(a, 6);
        this.channels = D(a);
        this.rows = v(a);
        this.columns = v(a);
        this.depth = D(a);
        this.colorMode = D(a);
        this.length = a.ip - this.offset
    };

    function R(a, b, c) {
        this.header = a;
        this.colorModeData = b;
        this.channel = c;
        this.parsed = !1
    }
    R.prototype.parse = function () {
        switch (this.header.colorMode) {
        case 0:
            window.console.error("bitmap color mode not supported");
            break;
        case 8:
            window.console.warn("duotone color mode implementation is incomplete");
        case 1:
            var a = this.channel[0],
                b, c = a.length,
                d = this.redChannel = new(m ? Uint8Array : Array)(c),
                f = this.greenChannel = new(m ? Uint8Array : Array)(c),
                g = this.blueChannel = new(m ? Uint8Array : Array)(c),
                k = this.header.depth / 8,
                h;
            for (b = h = 0; b < c; ++h, b += k) d[h] = f[h] = g[h] = a[b];
            break;
        case F:
            a = this.channel[0];
            c = a.length;
            f = this.redChannel =
                new(m ? Uint8Array : Array)(c);
            g = this.greenChannel = new(m ? Uint8Array : Array)(c);
            k = this.blueChannel = new(m ? Uint8Array : Array)(c);
            h = this.colorModeData.data;
            var s = h.length / 3;
            for (b = d = 0; b < c; ++d, b += 1) f[d] = h[a[b]], g[d] = h[a[b] + s], k[d] = h[a[b] + 2 * s];
            break;
        case 7:
            window.console.warn("multichannel color mode implementation is incomplete");
        case 3:
            a = this.redChannel = this.channel[0];
            b = this.greenChannel = this.channel[1];
            c = this.blueChannel = this.channel[2];
            f = this.header.depth / 8;
            if (1 !== f) {
                if (4 === this.channel.length) {
                    d = this.alphaChannel =
                        this.channel[3];
                    g = h = 0;
                    for (k = a.length; g < k; ++h, g += f) a[h] = a[g], b[h] = b[g], c[h] = c[g], d[h] = d[g];
                } else {
                    g = h = 0;
                    for (k = a.length; g < k; ++h, g += f) a[h] = a[g], b[h] = b[g], c[h] = c[g];
                }
                m ? (this.redChannel = a.subarray(0, h), this.greenChannel = b.subarray(0, h), this.blueChannel = c.subarray(0, h)) : a.length = b.length = c.length = h;
                4 === this.channel.length && (m ? this.alphaChannel = d.subarray(0, h) : d.length = h);
            }
            break;
        case 4:
            a = this.channel[0];
            b = this.channel[1];
            c = this.channel[2];
            d = this.channel[3];
            g = a.length;
            k = this.redChannel = new(m ? Uint8Array : Array)(g);
            h = this.greenChannel = new(m ? Uint8Array : Array)(g);
            for (var s = this.blueChannel = new(m ? Uint8Array : Array)(g), q, x, t, w, y = this.header.depth / 8, C, f = C = 0; f < g; ++C, f += y) q = 255 - a[f], x = 255 - b[f], t = 255 - c[f], w = 255 - d[f], k[C] = 65535 - (q * (255 - w) + (w << 8)) >> 8, h[C] = 65535 - (x * (255 - w) + (w << 8)) >> 8, s[C] = 65535 - (t * (255 - w) + (w << 8)) >> 8;
            break;
        case 9:
            a = this.channel[0];
            b = this.channel[1];
            c = this.channel[2];
            f = a.length;
            g = this.redChannel = new(m ? Uint8Array : Array)(f);
            k = this.greenChannel = new(m ? Uint8Array : Array)(f);
            h = this.blueChannel = new(m ? Uint8Array :
                Array)(f);
            s = 6 / 29;
            x = this.header.depth / 8;
            for (d = q = 0; d < f; ++q, d += x) y = ((100 * a[d] >> 8) + 16) / 116, t = y + (b[d] - 128) / 500, w = y - (c[d] - 128) / 200, t = t > s ? 0.950456 * Math.pow(t, 3) : 3 * (t - 16 / 116) * Math.pow(s, 2), y = y > s ? 1 * Math.pow(y, 3) : 3 * (y - 16 / 116) * Math.pow(s, 2), w = w > s ? 1.088754 * Math.pow(w, 3) : 3 * (w - 16 / 116) * Math.pow(s, 2), g[q] = 255 * Math.pow(2.041588 * t - 0.565007 * y - 0.344731 * w, 1 / 2.2), k[q] = 255 * Math.pow(-0.969244 * t + 1.875968 * y + 0.041555 * w, 1 / 2.2), h[q] = 255 * Math.pow(0.013444 * t - 0.118362 * y + 1.015175 * w, 1 / 2.2)
        }
        this.parsed = !0
    };

    function S() {}
    S.prototype.parse = function (a, b) {
        var c;
        this.offset = a.ip;
        c = v(a);
        this.length = c + 4;
        if (b.colorMode === F && 768 !== c) throw Error("invalid color mode data");
        this.data = G(a, c)
    };

    function T() {}
    l(T, J);
    T.prototype.parse = function (a, b) {
        var c = this.channel = [],
            d, f = b.channels,
            g = b.columns * b.rows * (b.depth / 8);
        for (d = 0; d < f; ++d) c[d] = G(a, g)
    };

    function U() {}
    U.prototype.parse = function (a) {
        this.offset = a.ip;
        if ("8BIM" !== u(a, 4)) throw Error("invalid signature");
        this.identifier = D(a);
        this.name = u(a, a.input[a.ip++]);
        this.dataSize = v(a);
        this.data = G(a, this.dataSize);
        this.length = a.ip - this.offset
    };

    function la() {}
    la.prototype.parse = function (a) {
        this.offset = a.ip;
        this.length = v(a) + 4;
        this.imageResource = new U;
        this.imageResource.parse(a);
        a.seek(this.offset + this.length, 0)
    };

    function V() {}
    l(V, J);
    V.prototype.parse = function (a, b) {
        var c, d = this.channel = [],
            f = this.lineLength = [],
            g, k, h = b.rows,
            s = b.channels,
            q;
        for (c = 0; c < h * s; ++c) f[c] = D(a);
        for (g = 0; g < s; ++g) {
            k = [];
            for (c = q = 0; c < h; ++c) k[c] = O(a, f[g * h + c] * (b.depth / 8)), q += k[c].length;
            if (m) {
                d[g] = new Uint8Array(q);
                q = c = 0;
                for (h = k.length; c < h; ++c) d[g].set(k[c], q), q += k[c].length
            } else d[g] = Array.prototype.concat.apply([], k)
        }
    };

    function W() {}
    W.prototype.parse = function (a, b) {
        this.offset = a.ip;
        this.compressionMethod = D(a);
        switch (this.compressionMethod) {
        case 0:
            this.image = new T;
            break;
        case 1:
            this.image = new V;
            break;
        default:
            throw Error("unknown compression method");
        }
        this.image.parse(a, b);
        this.length = a.ip - this.offset
    };
    W.prototype.createCanvas = function (a, b) {
        var c = document.createElement("canvas"),
            d = c.getContext("2d"),
            f = c.width = a.columns,
            g = c.height = a.rows,
            k, h, s, q, x, t;
        k = new R(a, b, this.image.channel);
        k.parsed || k.parse();
        t = [k.redChannel, k.greenChannel, k.blueChannel];
        if (0 >= f || 0 >= g) return null;
        k = d.createImageData(f, g);
        h = k.data;
        for (q = 0; q < g; ++q)
            for (s = 0; s < f; ++s) x = q * f + s, h[4 * x] = t[0][x], h[4 * x + 1] = t[1][x], h[4 * x + 2] = t[2][x], h[4 * x + 3] = 255;
        d.putImageData(k, 0, 0);
        return c;
    };

    function ma() {
        this.info = [];
    }
    ma.prototype.parse = function (a, b) {
        var c, d;
        this.offset = a.ip;
        this.top = A(a);
        this.left = A(a);
        this.bottom = A(a);
        this.right = A(a);
        this.channels = D(a);
        c = 0;
        for (d = this.channels; c < d; ++c) this.info[c] = {
            id: p(a),
            length: v(a)
        };
        if ("8BIM" !== u(a, 4)) throw Error("invalid blend mode signature");
        this.blendMode = u(a, 4);
        this.opacity = B(a);
        this.clipping = B(a);
        this.flags = B(a);
        this.filter = B(a);
        this.extraLength = v(a);
        c = a.ip + this.extraLength;
        this.layerMaskData = new L;
        this.layerMaskData.parse(a);
        this.blendingRanges = new K;
        this.blendingRanges.parse(a);
        d = B(a);
        this.name = u(a, d);
        a.seek((4 - (1 + d) % 4) % 4);
        for (this.additionalLayerInfo = []; a.ip < c;) d = new r, d.parse(a, b), this.additionalLayerInfo.push(d);
        this.length = a.ip - this.offset;
    };

    function X() {}
    l(X, I);
    X.prototype.parse = function (a, b, c) {
        this.channel = G(a, c)
    };

    function Y() {}
    l(Y, I);
    Y.prototype.parse = function (a, b, c) {
        var d = this.lineLength = [],
            f = [];
        b = b.bottom - b.top;
        var g = a.ip + c,
            k = 0;
        for (c = 0; c < b; ++c) d[c] = D(a);
        for (c = 0; c < b && !(f[c] = O(a, d[c]), k += f[c].length, a.ip >= g); ++c);
        if (m) {
            this.channel = new Uint8Array(k);
            a = c = 0;
            for (b = f.length; c < b; ++c) this.channel.set(f[c], a), a += f[c].length
        } else this.channel = Array.prototype.concat.apply([], f)
    };

    function Z() {}
    Z.prototype.parse = function (a, b) {
        var c = this.channel = [],
            d, f, g, k, h;
        this.offset = a.ip;
        f = 0;
        for (g = b.channels; f < g; ++f)
            if (k = a.ip, h = b.info[f], d = D(a), 2 !== h.length) {
                switch (d) {
                case 0:
                    d = new X;
                    break;
                case 1:
                    d = new Y;
                    break;
                default:
                    throw Error("unknown compression method: " + d);
                }
                d.parse(a, b, h.length - 2);
                c[f] = d;
                a.seek(h.length + k, 0)
            }
        this.length = a.ip - this.offset
    };
    Z.prototype.createCanvas = function (a, b, c) {
        var d = document.createElement("canvas"),
            f = d.getContext("2d"),
            g = d.width = c.right - c.left,
            k = d.height = c.bottom - c.top,
            h, s, q = this.channel,
            x = [],
            t, w, y, C;
        if (0 === g || 0 === k) return null;
        h = f.createImageData(g, k);
        s = h.data;
        t = 0;
        for (w = q.length; t < w; ++t) switch (c.info[t].id) {
        case 0:
        case 1:
        case 2:
        case 3:
            x[c.info[t].id] = q[t].channel;
            break;
        case -1:
            y = q[t].channel;
            break;
        case -2:
            C = q[t].channel;
            break;
        default:
            window.console.warn("not supported channel id", c.info[t].id)
        }
        y && x.push(y);
        a = new R(a,
            b, x);
        a.parsed || a.parse();
        q = [a.redChannel, a.greenChannel, a.blueChannel, a.alphaChannel];
        for (b = 0; b < k; ++b)
            for (a = 0; a < g; ++a) c = b * g + a, s[4 * c + 0] = q[0][c], s[4 * c + 1] = q[1][c], s[4 * c + 2] = q[2][c], s[4 * c + 3] = C ? C[c] / 255 * (q[3] ? q[3][c] : 255) : q[3] ? q[3][c] : 255;
        f.putImageData(h, 0, 0);
        return d
    };

    function na() {
        this.layerRecord = [];
        this.channelImageData = []
    }
    na.prototype.parse = function (a, b) {
        var c, d, f;
        this.offset = a.ip;
        this.length = v(a) + 4;
        this.layerCount = Math.abs(p(a));
        c = 0;
        for (d = this.layerCount; c < d; ++c) f = new ma, f.parse(a, b), this.layerRecord[c] = f;
        c = 0;
        for (d = this.layerCount; c < d; ++c) f = new Z, f.parse(a, this.layerRecord[c]), this.channelImageData[c] = f;
        a.seek(this.offset + this.length, 0)
    };

    function oa() {}
    oa.prototype.parse = function (a, b) {
        var c;
        this.offset = a.ip;
        c = v(a);
        this.length = c + 4;
        0 === c && window.console.log("skip: layer and mask information (empty body)");
        c = a.ip + c;
        this.layerInfo = new na;
        this.globalLayerMaskInfo = new P;
        this.additionalLayerInfo = new r;
        this.layerInfo.parse(a, b);
        this.globalLayerMaskInfo.parse(a, b);
        this.additionalLayerInfo.parse(a, b);
        a.seek(c, 0)
    };

    function $(a, b) {
        b || (b = {});
        this.stream = new M(a, b.inputPosition | 0)
    }
    $.prototype.parse = function () {
        var a = this.stream;
        this.header = new Q;
        this.colorModeData = new S;
        this.imageResources = new la;
        this.layerAndMaskInformation = new oa;
        this.imageData = new W;
        this.header.parse(a);
        this.colorModeData.parse(a, this.header);
        this.imageResources.parse(a);
        this.layerAndMaskInformation.parse(a, this.header);
        this.imageData.parse(a, this.header)
    };
    j("PSD.Parser", $);
    j("PSD.Parser.prototype.parse", $.prototype.parse);
}).call(this);