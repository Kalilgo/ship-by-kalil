import { j as g, m as Qe } from './proxy.Ce3DUqBB.js';
import { R, r as ne } from './index.DYrVU9rO.js';
var be = (e) => e.type === 'checkbox',
  ae = (e) => e instanceof Date,
  P = (e) => e == null;
const dt = (e) => typeof e == 'object';
var E = (e) => !P(e) && !Array.isArray(e) && dt(e) && !ae(e),
  Dt = (e) => (E(e) && e.target ? (be(e.target) ? e.target.checked : e.target.value) : e),
  Nt = (e, s) =>
    s.split('.').some((r, n, o) => !isNaN(Number(r)) && e.has(o.slice(0, n).join('.'))),
  St = (e) => {
    const s = e.constructor && e.constructor.prototype;
    return E(s) && s.hasOwnProperty('isPrototypeOf');
  },
  Re = typeof window < 'u' && typeof window.HTMLElement < 'u' && typeof document < 'u';
function S(e) {
  if (e instanceof Date) return new Date(e);
  const s = typeof FileList < 'u' && e instanceof FileList;
  if (Re && (e instanceof Blob || s)) return e;
  const r = Array.isArray(e);
  if (!r && !(E(e) && St(e))) return e;
  const n = r ? [] : Object.create(Object.getPrototypeOf(e));
  for (const o in e) Object.prototype.hasOwnProperty.call(e, o) && (n[o] = S(e[o]));
  return n;
}
var we = (e) => /^\w*$/.test(e),
  A = (e) => e === void 0,
  Le = (e) => (Array.isArray(e) ? e.filter(Boolean) : []),
  Me = (e) => Le(e.replace(/["|']|\]/g, '').split(/\.|\[/)),
  m = (e, s, r) => {
    if (!s || !E(e)) return r;
    const n = (we(s) ? [s] : Me(s)).reduce((o, l) => (P(o) ? o : o[l]), e);
    return A(n) || n === e ? (A(e[s]) ? r : e[s]) : n;
  },
  Q = (e) => typeof e == 'boolean',
  H = (e) => typeof e == 'function',
  k = (e, s, r) => {
    let n = -1;
    const o = we(s) ? [s] : Me(s),
      l = o.length,
      d = l - 1;
    for (; ++n < l; ) {
      const u = o[n];
      let j = r;
      if (n !== d) {
        const I = e[u];
        j = E(I) || Array.isArray(I) ? I : isNaN(+o[n + 1]) ? {} : [];
      }
      if (u === '__proto__' || u === 'constructor' || u === 'prototype') return;
      ((e[u] = j), (e = e[u]));
    }
  };
const le = {
    BLUR: 'blur',
    FOCUS_OUT: 'focusout',
    SUBMIT: 'submit',
    TRIGGER: 'trigger',
    VALID: 'valid',
  },
  G = {
    onBlur: 'onBlur',
    onChange: 'onChange',
    onSubmit: 'onSubmit',
    onTouched: 'onTouched',
    all: 'all',
  },
  W = {
    max: 'max',
    min: 'min',
    maxLength: 'maxLength',
    minLength: 'minLength',
    pattern: 'pattern',
    required: 'required',
    validate: 'validate',
  },
  je = 'form',
  ct = 'root',
  jt = R.createContext(null);
jt.displayName = 'HookFormControlContext';
var Ct = (e, s, r, n = !0) => {
  const o = { defaultValues: s._defaultValues };
  for (const l in e)
    Object.defineProperty(o, l, {
      get: () => {
        const d = l;
        return (s._proxyFormState[d] !== G.all && (s._proxyFormState[d] = !n || G.all), e[d]);
      },
    });
  return o;
};
const Tt = typeof window < 'u' ? R.useLayoutEffect : R.useEffect;
var M = (e) => typeof e == 'string',
  Ot = (e, s, r, n, o) =>
    M(e)
      ? (n && s.watch.add(e), m(r, e, o))
      : Array.isArray(e)
        ? e.map((l) => (n && s.watch.add(l), m(r, l)))
        : (n && (s.watchAll = !0), r),
  Te = (e) => P(e) || !dt(e);
function se(e, s, r = new WeakSet()) {
  if (Te(e) || Te(s)) return Object.is(e, s);
  if (ae(e) && ae(s)) return Object.is(e.getTime(), s.getTime());
  const n = Object.keys(e),
    o = Object.keys(s);
  if (n.length !== o.length) return !1;
  if (r.has(e) || r.has(s)) return !0;
  (r.add(e), r.add(s));
  for (const l of n) {
    const d = e[l];
    if (!o.includes(l)) return !1;
    if (l !== 'ref') {
      const u = s[l];
      if (
        (ae(d) && ae(u)) || ((E(d) || Array.isArray(d)) && (E(u) || Array.isArray(u)))
          ? !se(d, u, r)
          : !Object.is(d, u)
      )
        return !1;
    }
  }
  return !0;
}
const Rt = R.createContext(null);
Rt.displayName = 'HookFormContext';
var Lt = (e, s, r, n, o) =>
    s ? { ...r[e], types: { ...(r[e] && r[e].types ? r[e].types : {}), [n]: o || !0 } } : {},
  me = (e) => (Array.isArray(e) ? e : [e]),
  Xe = () => {
    let e = [];
    return {
      get observers() {
        return e;
      },
      next: (o) => {
        for (const l of e) l.next && l.next(o);
      },
      subscribe: (o) => (
        e.push(o),
        {
          unsubscribe: () => {
            e = e.filter((l) => l !== o);
          },
        }
      ),
      unsubscribe: () => {
        e = [];
      },
    };
  };
function ft(e, s) {
  const r = {};
  for (const n in e)
    if (e.hasOwnProperty(n)) {
      const o = e[n],
        l = s[n];
      if (o && E(o) && l) {
        const d = ft(o, l);
        E(d) && (r[n] = d);
      } else e[n] && (r[n] = l);
    }
  return r;
}
var L = (e) => E(e) && !Object.keys(e).length,
  Ie = (e) => e.type === 'file',
  Ve = (e) => {
    if (!Re) return !1;
    const s = e ? e.ownerDocument : 0;
    return e instanceof (s && s.defaultView ? s.defaultView.HTMLElement : HTMLElement);
  },
  yt = (e) => e.type === 'select-multiple',
  Ue = (e) => e.type === 'radio',
  Mt = (e) => Ue(e) || be(e),
  Ce = (e) => Ve(e) && e.isConnected;
function It(e, s) {
  const r = s.slice(0, -1).length;
  let n = 0;
  for (; n < r; ) e = A(e) ? n++ : e[s[n++]];
  return e;
}
function Ut(e) {
  for (const s in e) if (e.hasOwnProperty(s) && !A(e[s])) return !1;
  return !0;
}
function D(e, s) {
  const r = Array.isArray(s) ? s : we(s) ? [s] : Me(s),
    n = r.length === 1 ? e : It(e, r),
    o = r.length - 1,
    l = r[o];
  return (
    n && delete n[l],
    o !== 0 && ((E(n) && L(n)) || (Array.isArray(n) && Ut(n))) && D(e, r.slice(0, -1)),
    e
  );
}
var Pt = (e) => {
  for (const s in e) if (H(e[s])) return !0;
  return !1;
};
function ht(e) {
  return Array.isArray(e) || (E(e) && !Pt(e));
}
function Oe(e, s = {}) {
  for (const r in e) {
    const n = e[r];
    ht(n) ? ((s[r] = Array.isArray(n) ? [] : {}), Oe(n, s[r])) : A(n) || (s[r] = !0);
  }
  return s;
}
function he(e, s, r) {
  r || (r = Oe(s));
  for (const n in e) {
    const o = e[n];
    if (ht(o))
      A(s) || Te(r[n]) ? (r[n] = Oe(o, Array.isArray(o) ? [] : {})) : he(o, P(s) ? {} : s[n], r[n]);
    else {
      const l = s[n];
      r[n] = !se(o, l);
    }
  }
  return r;
}
const et = { value: !1, isValid: !1 },
  tt = { value: !0, isValid: !0 };
var mt = (e) => {
    if (Array.isArray(e)) {
      if (e.length > 1) {
        const s = e.filter((r) => r && r.checked && !r.disabled).map((r) => r.value);
        return { value: s, isValid: !!s.length };
      }
      return e[0].checked && !e[0].disabled
        ? e[0].attributes && !A(e[0].attributes.value)
          ? A(e[0].value) || e[0].value === ''
            ? tt
            : { value: e[0].value, isValid: !0 }
          : tt
        : et;
    }
    return et;
  },
  gt = (e, { valueAsNumber: s, valueAsDate: r, setValueAs: n }) =>
    A(e) ? e : s ? (e === '' ? NaN : e && +e) : r && M(e) ? new Date(e) : n ? n(e) : e;
const rt = { isValid: !1, value: null };
var bt = (e) =>
  Array.isArray(e)
    ? e.reduce((s, r) => (r && r.checked && !r.disabled ? { isValid: !0, value: r.value } : s), rt)
    : rt;
function st(e) {
  const s = e.ref;
  return Ie(s)
    ? s.files
    : Ue(s)
      ? bt(e.refs).value
      : yt(s)
        ? [...s.selectedOptions].map(({ value: r }) => r)
        : be(s)
          ? mt(e.refs).value
          : gt(A(s.value) ? e.ref.value : s.value, e);
}
var Bt = (e) => e.substring(0, e.search(/\.\d+(\.|$)/)) || e,
  qt = (e, s, r, n) => {
    const o = {};
    for (const l of e) {
      const d = m(s, l);
      d && k(o, l, d._f);
    }
    return { criteriaMode: r, names: [...e], fields: o, shouldUseNativeValidation: n };
  },
  Fe = (e) => e instanceof RegExp,
  ye = (e) => (A(e) ? e : Fe(e) ? e.source : E(e) ? (Fe(e.value) ? e.value.source : e.value) : e),
  it = (e) => ({
    isOnSubmit: !e || e === G.onSubmit,
    isOnBlur: e === G.onBlur,
    isOnChange: e === G.onChange,
    isOnAll: e === G.all,
    isOnTouch: e === G.onTouched,
  });
const at = 'AsyncFunction';
var $t = (e) =>
    !!e &&
    !!e.validate &&
    !!(
      (H(e.validate) && e.validate.constructor.name === at) ||
      (E(e.validate) && Object.values(e.validate).find((s) => s.constructor.name === at))
    ),
  Wt = (e) =>
    e.mount &&
    (e.required || e.min || e.max || e.maxLength || e.minLength || e.pattern || e.validate),
  nt = (e, s, r) =>
    !r &&
    (s.watchAll ||
      s.watch.has(e) ||
      [...s.watch].some((n) => e.startsWith(n) && /^\.\w+/.test(e.slice(n.length))));
const ge = (e, s, r, n) => {
  for (const o of r || Object.keys(e)) {
    const l = m(e, o);
    if (l) {
      const { _f: d, ...u } = l;
      if (d) {
        if (d.refs && d.refs[0] && s(d.refs[0], o) && !n) return !0;
        if (d.ref && s(d.ref, d.name) && !n) return !0;
        if (ge(u, s)) break;
      } else if (E(u) && ge(u, s)) break;
    }
  }
};
function lt(e, s, r) {
  const n = m(e, r);
  if (n || we(r)) return { error: n, name: r };
  const o = r.split('.');
  for (; o.length; ) {
    const l = o.join('.'),
      d = m(s, l),
      u = m(e, l);
    if (d && !Array.isArray(d) && r !== l) return { name: r };
    if (u && u.type) return { name: l, error: u };
    if (u && u.root && u.root.type) return { name: `${l}.root`, error: u.root };
    o.pop();
  }
  return { name: r };
}
var Ht = (e, s, r, n) => {
    r(e);
    const { name: o, ...l } = e;
    return (
      L(l) ||
      Object.keys(l).length >= Object.keys(s).length ||
      Object.keys(l).find((d) => s[d] === (!n || G.all))
    );
  },
  Gt = (e, s, r) =>
    !e ||
    !s ||
    e === s ||
    me(e).some((n) => n && (r ? n === s : n.startsWith(s) || s.startsWith(n))),
  zt = (e, s, r, n, o) =>
    o.isOnAll
      ? !1
      : !r && o.isOnTouch
        ? !(s || e)
        : (r ? n.isOnBlur : o.isOnBlur)
          ? !e
          : (r ? n.isOnChange : o.isOnChange)
            ? e
            : !0,
  Zt = (e, s) => !Le(m(e, s)).length && D(e, s),
  Kt = (e, s, r) => {
    const n = me(m(e, r));
    return (k(n, ct, s[r]), k(e, r, n), e);
  };
function ot(e, s, r = 'validate') {
  if (M(e) || (Array.isArray(e) && e.every(M)) || (Q(e) && !e))
    return { type: r, message: M(e) ? e : '', ref: s };
}
var oe = (e) => (E(e) && !Fe(e) ? e : { value: e, message: '' }),
  ut = async (e, s, r, n, o, l) => {
    const {
        ref: d,
        refs: u,
        required: j,
        maxLength: I,
        minLength: z,
        min: p,
        max: N,
        pattern: x,
        validate: X,
        name: B,
        valueAsNumber: Z,
        mount: q,
      } = e._f,
      _ = m(r, B);
    if (!q || s.has(B)) return {};
    const ee = u ? u[0] : d,
      te = (v) => {
        o && ee.reportValidity && (ee.setCustomValidity(Q(v) ? '' : v || ''), ee.reportValidity());
      },
      C = {},
      ue = Ue(d),
      de = be(d),
      ke = ue || de,
      K =
        ((Z || Ie(d)) && A(d.value) && A(_)) ||
        (Ve(d) && d.value === '') ||
        _ === '' ||
        (Array.isArray(_) && !_.length),
      ie = Lt.bind(null, B, n, C),
      ce = (v, F, w, T = W.maxLength, Y = W.minLength) => {
        const $ = v ? F : w;
        C[B] = { type: v ? T : Y, message: $, ref: d, ...ie(v ? T : Y, $) };
      };
    if (
      l
        ? !Array.isArray(_) || !_.length
        : j &&
          ((!ke && (K || P(_))) || (Q(_) && !_) || (de && !mt(u).isValid) || (ue && !bt(u).isValid))
    ) {
      const { value: v, message: F } = M(j) ? { value: !!j, message: j } : oe(j);
      if (v && ((C[B] = { type: W.required, message: F, ref: ee, ...ie(W.required, F) }), !n))
        return (te(F), C);
    }
    if (!K && (!P(p) || !P(N))) {
      let v, F;
      const w = oe(N),
        T = oe(p);
      if (!P(_) && !isNaN(_)) {
        const Y = d.valueAsNumber || (_ && +_);
        (P(w.value) || (v = Y > w.value), P(T.value) || (F = Y < T.value));
      } else {
        const Y = d.valueAsDate || new Date(_),
          $ = (ve) => new Date(new Date().toDateString() + ' ' + ve),
          fe = d.type == 'time',
          re = d.type == 'week';
        (M(w.value) && _ && (v = fe ? $(_) > $(w.value) : re ? _ > w.value : Y > new Date(w.value)),
          M(T.value) &&
            _ &&
            (F = fe ? $(_) < $(T.value) : re ? _ < T.value : Y < new Date(T.value)));
      }
      if ((v || F) && (ce(!!v, w.message, T.message, W.max, W.min), !n))
        return (te(C[B].message), C);
    }
    if ((I || z) && !K && (M(_) || (l && Array.isArray(_)))) {
      const v = oe(I),
        F = oe(z),
        w = !P(v.value) && _.length > +v.value,
        T = !P(F.value) && _.length < +F.value;
      if ((w || T) && (ce(w, v.message, F.message), !n)) return (te(C[B].message), C);
    }
    if (x && !K && M(_)) {
      const { value: v, message: F } = oe(x);
      if (
        Fe(v) &&
        !_.match(v) &&
        ((C[B] = { type: W.pattern, message: F, ref: d, ...ie(W.pattern, F) }), !n)
      )
        return (te(F), C);
    }
    if (X) {
      if (H(X)) {
        const v = await X(_, r),
          F = ot(v, ee);
        if (F && ((C[B] = { ...F, ...ie(W.validate, F.message) }), !n)) return (te(F.message), C);
      } else if (E(X)) {
        let v = {};
        for (const F in X) {
          if (!L(v) && !n) break;
          const w = ot(await X[F](_, r), ee, F);
          w && ((v = { ...w, ...ie(F, w.message) }), te(w.message), n && (C[B] = v));
        }
        if (!L(v) && ((C[B] = { ref: ee, ...v }), !n)) return C;
      }
    }
    return (te(!0), C);
  };
const Yt = { mode: G.onSubmit, reValidateMode: G.onChange, shouldFocusError: !0 };
function Jt(e = {}) {
  let s = { ...Yt, ...e },
    r = {
      submitCount: 0,
      isDirty: !1,
      isReady: !1,
      isLoading: H(s.defaultValues),
      isValidating: !1,
      isSubmitted: !1,
      isSubmitting: !1,
      isSubmitSuccessful: !1,
      isValid: !1,
      touchedFields: {},
      dirtyFields: {},
      validatingFields: {},
      errors: s.errors || {},
      disabled: s.disabled || !1,
    },
    n = {},
    o = E(s.defaultValues) || E(s.values) ? S(s.defaultValues || s.values) || {} : {},
    l = s.shouldUnregister ? {} : S(o),
    d = { action: !1, mount: !1, watch: !1, keepIsValid: !1 },
    u = {
      mount: new Set(),
      disabled: new Set(),
      unMount: new Set(),
      array: new Set(),
      watch: new Set(),
      registerName: new Set(),
    },
    j,
    I = 0;
  const z = {
      isDirty: !1,
      dirtyFields: !1,
      validatingFields: !1,
      touchedFields: !1,
      isValidating: !1,
      isValid: !1,
      errors: !1,
    },
    p = { ...z };
  let N = { ...p };
  const x = { array: Xe(), state: Xe() },
    X = s.criteriaMode === G.all,
    B = (t) => (i) => {
      (clearTimeout(I), (I = setTimeout(t, i)));
    },
    Z = async (t) => {
      if (!d.keepIsValid && !s.disabled && (p.isValid || N.isValid || t)) {
        let i;
        (s.resolver
          ? ((i = L((await K()).errors)), q())
          : (i = await v({ fields: n, onlyCheckValid: !0, eventType: le.VALID })),
          i !== r.isValid && x.state.next({ isValid: i }));
      }
    },
    q = (t, i) => {
      !s.disabled &&
        (p.isValidating || p.validatingFields || N.isValidating || N.validatingFields) &&
        ((t || Array.from(u.mount)).forEach((a) => {
          a && (i ? k(r.validatingFields, a, i) : D(r.validatingFields, a));
        }),
        x.state.next({
          validatingFields: r.validatingFields,
          isValidating: !L(r.validatingFields),
        }));
    },
    _ = (t) => {
      const i = he(o, l),
        a = Bt(t);
      k(r.dirtyFields, a, m(i, a));
    },
    ee = (t, i = [], a, y, f = !0, c = !0) => {
      if (y && a && !s.disabled) {
        if (((d.action = !0), c && Array.isArray(m(n, t)))) {
          const h = a(m(n, t), y.argA, y.argB);
          f && k(n, t, h);
        }
        if (c && Array.isArray(m(r.errors, t))) {
          const h = a(m(r.errors, t), y.argA, y.argB);
          (f && k(r.errors, t, h), Zt(r.errors, t));
        }
        if ((p.touchedFields || N.touchedFields) && c && Array.isArray(m(r.touchedFields, t))) {
          const h = a(m(r.touchedFields, t), y.argA, y.argB);
          f && k(r.touchedFields, t, h);
        }
        ((p.dirtyFields || N.dirtyFields) && _(t),
          x.state.next({
            name: t,
            isDirty: w(t, i),
            dirtyFields: r.dirtyFields,
            errors: r.errors,
            isValid: r.isValid,
          }));
      } else k(l, t, i);
    },
    te = (t, i) => {
      (k(r.errors, t, i), x.state.next({ errors: r.errors }));
    },
    C = (t) => {
      ((r.errors = t), x.state.next({ errors: r.errors, isValid: !1 }));
    },
    ue = (t, i, a, y) => {
      const f = m(n, t);
      if (f) {
        const c = m(l, t, A(a) ? m(o, t) : a);
        (A(c) || (y && y.defaultChecked) || i ? k(l, t, i ? c : st(f._f)) : $(t, c),
          d.mount && !d.action && Z());
      }
    },
    de = (t, i, a, y, f) => {
      let c = !1,
        h = !1;
      const b = { name: t };
      if (!s.disabled) {
        if (!a || y) {
          (p.isDirty || N.isDirty) &&
            ((h = r.isDirty), (r.isDirty = b.isDirty = w()), (c = h !== b.isDirty));
          const V = se(m(o, t), i);
          ((h = !!m(r.dirtyFields, t)),
            V ? D(r.dirtyFields, t) : k(r.dirtyFields, t, !0),
            (b.dirtyFields = r.dirtyFields),
            (c = c || ((p.dirtyFields || N.dirtyFields) && h !== !V)));
        }
        if (a) {
          const V = m(r.touchedFields, t);
          V ||
            (k(r.touchedFields, t, a),
            (b.touchedFields = r.touchedFields),
            (c = c || ((p.touchedFields || N.touchedFields) && V !== a)));
        }
        c && f && x.state.next(b);
      }
      return c ? b : {};
    },
    ke = (t, i, a, y) => {
      const f = m(r.errors, t),
        c = (p.isValid || N.isValid) && Q(i) && r.isValid !== i;
      if (
        (s.delayError && a
          ? ((j = B(() => te(t, a))), j(s.delayError))
          : (clearTimeout(I), (j = null), a ? k(r.errors, t, a) : D(r.errors, t)),
        (a ? !se(f, a) : f) || !L(y) || c)
      ) {
        const h = { ...y, ...(c && Q(i) ? { isValid: i } : {}), errors: r.errors, name: t };
        ((r = { ...r, ...h }), x.state.next(h));
      }
    },
    K = async (t) => (
      q(t, !0),
      await s.resolver(
        l,
        s.context,
        qt(t || u.mount, n, s.criteriaMode, s.shouldUseNativeValidation)
      )
    ),
    ie = async (t) => {
      const { errors: i } = await K(t);
      if ((q(t), t))
        for (const a of t) {
          const y = m(i, a);
          y ? k(r.errors, a, y) : D(r.errors, a);
        }
      else r.errors = i;
      return i;
    },
    ce = async ({ name: t, eventType: i }) => {
      if (e.validate) {
        const a = await e.validate({ formValues: l, formState: r, name: t, eventType: i });
        if (E(a))
          for (const y in a)
            a[y] && _e(`${je}.${y}`, { message: M(a.message) ? a.message : '', type: W.validate });
        else M(a) || !a ? _e(je, { message: a || '', type: W.validate }) : $e(je);
        return a;
      }
      return !0;
    },
    v = async ({
      fields: t,
      onlyCheckValid: i,
      name: a,
      eventType: y,
      context: f = { valid: !0, runRootValidation: !1 },
    }) => {
      if (
        e.validate &&
        ((f.runRootValidation = !0), !(await ce({ name: a, eventType: y })) && ((f.valid = !1), i))
      )
        return f.valid;
      for (const c in t) {
        const h = t[c];
        if (h) {
          const { _f: b, ...V } = h;
          if (b) {
            const O = u.array.has(b.name),
              J = h._f && $t(h._f);
            J && p.validatingFields && q([b.name], !0);
            const U = await ut(h, u.disabled, l, X, s.shouldUseNativeValidation && !i, O);
            if (
              (J && p.validatingFields && q([b.name]),
              (U[b.name] && ((f.valid = !1), i)) ||
                (!i &&
                  (m(U, b.name)
                    ? O
                      ? Kt(r.errors, U, b.name)
                      : k(r.errors, b.name, U[b.name])
                    : D(r.errors, b.name)),
                e.shouldUseNativeValidation && U[b.name]))
            )
              break;
          }
          !L(V) && (await v({ context: f, onlyCheckValid: i, fields: V, name: c, eventType: y }));
        }
      }
      return f.valid;
    },
    F = () => {
      for (const t of u.unMount) {
        const i = m(n, t);
        i && (i._f.refs ? i._f.refs.every((a) => !Ce(a)) : !Ce(i._f.ref)) && Ae(t);
      }
      u.unMount = new Set();
    },
    w = (t, i) => !s.disabled && (t && i && k(l, t, i), !se(Be(), o)),
    T = (t, i, a) => Ot(t, u, { ...(d.mount ? l : A(i) ? o : M(t) ? { [t]: i } : i) }, a, i),
    Y = (t) => Le(m(d.mount ? l : o, t, s.shouldUnregister ? m(o, t, []) : [])),
    $ = (t, i, a = {}) => {
      const y = m(n, t);
      let f = i;
      if (y) {
        const c = y._f;
        c &&
          (!c.disabled && k(l, t, gt(i, c)),
          (f = Ve(c.ref) && P(i) ? '' : i),
          yt(c.ref)
            ? [...c.ref.options].forEach((h) => (h.selected = f.includes(h.value)))
            : c.refs
              ? be(c.ref)
                ? c.refs.forEach((h) => {
                    (!h.defaultChecked || !h.disabled) &&
                      (Array.isArray(f)
                        ? (h.checked = !!f.find((b) => b === h.value))
                        : (h.checked = f === h.value || !!f));
                  })
                : c.refs.forEach((h) => (h.checked = h.value === f))
              : Ie(c.ref)
                ? (c.ref.value = '')
                : ((c.ref.value = f), c.ref.type || x.state.next({ name: t, values: S(l) })));
      }
      ((a.shouldDirty || a.shouldTouch) && de(t, f, a.shouldTouch, a.shouldDirty, !0),
        a.shouldValidate && pe(t));
    },
    fe = (t, i, a) => {
      for (const y in i) {
        if (!i.hasOwnProperty(y)) return;
        const f = i[y],
          c = t + '.' + y,
          h = m(n, c);
        (u.array.has(t) || E(f) || (h && !h._f)) && !ae(f) ? fe(c, f, a) : $(c, f, a);
      }
    },
    re = (t, i, a = {}) => {
      const y = m(n, t),
        f = u.array.has(t),
        c = S(i);
      (k(l, t, c),
        f
          ? (x.array.next({ name: t, values: S(l) }),
            (p.isDirty || p.dirtyFields || N.isDirty || N.dirtyFields) &&
              a.shouldDirty &&
              (_(t), x.state.next({ name: t, dirtyFields: r.dirtyFields, isDirty: w(t, c) })))
          : y && !y._f && !P(c)
            ? fe(t, c, a)
            : $(t, c, a),
        nt(t, u)
          ? x.state.next({ ...r, name: t, values: S(l) })
          : x.state.next({ name: d.mount ? t : void 0, values: S(l) }));
    },
    ve = async (t) => {
      d.mount = !0;
      const i = t.target;
      let a = i.name,
        y = !0;
      const f = m(n, a),
        c = (V) => {
          y = Number.isNaN(V) || (ae(V) && isNaN(V.getTime())) || se(V, m(l, a, V));
        },
        h = it(s.mode),
        b = it(s.reValidateMode);
      if (f) {
        let V, O;
        const J = i.type ? st(f._f) : Dt(t),
          U = t.type === le.BLUR || t.type === le.FOCUS_OUT,
          pt =
            (!Wt(f._f) && !e.validate && !s.resolver && !m(r.errors, a) && !f._f.deps) ||
            zt(U, m(r.touchedFields, a), r.isSubmitted, b, h),
          Ne = nt(a, u, U);
        (k(l, a, J),
          U
            ? (!i || !i.readOnly) && (f._f.onBlur && f._f.onBlur(t), j && j(0))
            : f._f.onChange && f._f.onChange(t));
        const Se = de(a, J, U),
          At = !L(Se) || Ne;
        if ((!U && x.state.next({ name: a, type: t.type, values: S(l) }), pt))
          return (
            (p.isValid || N.isValid) && (s.mode === 'onBlur' ? U && Z() : U || Z()),
            At && x.state.next({ name: a, ...(Ne ? {} : Se) })
          );
        if (
          (!s.resolver && e.validate && (await ce({ name: a, eventType: t.type })),
          !U && Ne && x.state.next({ ...r }),
          s.resolver)
        ) {
          const { errors: Ye } = await K([a]);
          if ((q([a]), c(J), y)) {
            const Et = lt(r.errors, n, a),
              Je = lt(Ye, n, Et.name || a);
            ((V = Je.error), (a = Je.name), (O = L(Ye)));
          }
        } else
          (q([a], !0),
            (V = (await ut(f, u.disabled, l, X, s.shouldUseNativeValidation))[a]),
            q([a]),
            c(J),
            y &&
              (V
                ? (O = !1)
                : (p.isValid || N.isValid) &&
                  (O = await v({ fields: n, onlyCheckValid: !0, name: a, eventType: t.type }))));
        y &&
          (f._f.deps && (!Array.isArray(f._f.deps) || f._f.deps.length > 0) && pe(f._f.deps),
          ke(a, O, V, Se));
      }
    },
    Pe = (t, i) => {
      if (m(r.errors, i) && t.focus) return (t.focus(), 1);
    },
    pe = async (t, i = {}) => {
      let a, y;
      const f = me(t);
      if (s.resolver) {
        const c = await ie(A(t) ? t : f);
        ((a = L(c)), (y = t ? !f.some((h) => m(c, h)) : a));
      } else
        t
          ? ((y = (
              await Promise.all(
                f.map(async (c) => {
                  const h = m(n, c);
                  return await v({ fields: h && h._f ? { [c]: h } : h, eventType: le.TRIGGER });
                })
              )
            ).every(Boolean)),
            !(!y && !r.isValid) && Z())
          : (y = a = await v({ fields: n, name: t, eventType: le.TRIGGER }));
      return (
        x.state.next({
          ...(!M(t) || ((p.isValid || N.isValid) && a !== r.isValid) ? {} : { name: t }),
          ...(s.resolver || !t ? { isValid: a } : {}),
          errors: r.errors,
        }),
        i.shouldFocus && !y && ge(n, Pe, t ? f : u.mount),
        y
      );
    },
    Be = (t, i) => {
      let a = { ...(d.mount ? l : o) };
      return (
        i && (a = ft(i.dirtyFields ? r.dirtyFields : r.touchedFields, a)),
        A(t) ? a : M(t) ? m(a, t) : t.map((y) => m(a, y))
      );
    },
    qe = (t, i) => ({
      invalid: !!m((i || r).errors, t),
      isDirty: !!m((i || r).dirtyFields, t),
      error: m((i || r).errors, t),
      isValidating: !!m(r.validatingFields, t),
      isTouched: !!m((i || r).touchedFields, t),
    }),
    $e = (t) => {
      const i = t ? me(t) : void 0;
      (i?.forEach((a) => D(r.errors, a)),
        i
          ? i.forEach((a) => {
              x.state.next({ name: a, errors: r.errors });
            })
          : x.state.next({ errors: {} }));
    },
    _e = (t, i, a) => {
      const y = (m(n, t, { _f: {} })._f || {}).ref,
        f = m(r.errors, t) || {},
        { ref: c, message: h, type: b, ...V } = f;
      (k(r.errors, t, { ...V, ...i, ref: y }),
        x.state.next({ name: t, errors: r.errors, isValid: !1 }),
        a && a.shouldFocus && y && y.focus && y.focus());
    },
    vt = (t, i) =>
      H(t) ? x.state.subscribe({ next: (a) => 'values' in a && t(T(void 0, i), a) }) : T(t, i, !0),
    We = (t) =>
      x.state.subscribe({
        next: (i) => {
          Gt(t.name, i.name, t.exact) &&
            Ht(i, t.formState || p, kt, t.reRenderRoot) &&
            t.callback({ values: { ...l }, ...r, ...i, defaultValues: o });
        },
      }).unsubscribe,
    _t = (t) => (
      (d.mount = !0),
      (N = { ...N, ...t.formState }),
      We({ ...t, formState: { ...z, ...t.formState } })
    ),
    Ae = (t, i = {}) => {
      for (const a of t ? me(t) : u.mount)
        (u.mount.delete(a),
          u.array.delete(a),
          i.keepValue || (D(n, a), D(l, a)),
          !i.keepError && D(r.errors, a),
          !i.keepDirty && D(r.dirtyFields, a),
          !i.keepTouched && D(r.touchedFields, a),
          !i.keepIsValidating && D(r.validatingFields, a),
          !s.shouldUnregister && !i.keepDefaultValue && D(o, a));
      (x.state.next({ values: S(l) }),
        x.state.next({ ...r, ...(i.keepDirty ? { isDirty: w() } : {}) }),
        !i.keepIsValid && Z());
    },
    He = ({ disabled: t, name: i }) => {
      if ((Q(t) && d.mount) || t || u.disabled.has(i)) {
        const f = u.disabled.has(i) !== !!t;
        (t ? u.disabled.add(i) : u.disabled.delete(i), f && d.mount && !d.action && Z());
      }
    },
    Ee = (t, i = {}) => {
      let a = m(n, t);
      const y = Q(i.disabled) || Q(s.disabled),
        f = !u.registerName.has(t) && a && !a._f.mount;
      return (
        k(n, t, {
          ...(a || {}),
          _f: { ...(a && a._f ? a._f : { ref: { name: t } }), name: t, mount: !0, ...i },
        }),
        u.mount.add(t),
        a && !f
          ? He({ disabled: Q(i.disabled) ? i.disabled : s.disabled, name: t })
          : ue(t, !0, i.value),
        {
          ...(y ? { disabled: i.disabled || s.disabled } : {}),
          ...(s.progressive
            ? {
                required: !!i.required,
                min: ye(i.min),
                max: ye(i.max),
                minLength: ye(i.minLength),
                maxLength: ye(i.maxLength),
                pattern: ye(i.pattern),
              }
            : {}),
          name: t,
          onChange: ve,
          onBlur: ve,
          ref: (c) => {
            if (c) {
              (u.registerName.add(t), Ee(t, i), u.registerName.delete(t), (a = m(n, t)));
              const h =
                  (A(c.value) &&
                    c.querySelectorAll &&
                    c.querySelectorAll('input,select,textarea')[0]) ||
                  c,
                b = Mt(h),
                V = a._f.refs || [];
              if (b ? V.find((O) => O === h) : h === a._f.ref) return;
              (k(n, t, {
                _f: {
                  ...a._f,
                  ...(b
                    ? {
                        refs: [...V.filter(Ce), h, ...(Array.isArray(m(o, t)) ? [{}] : [])],
                        ref: { type: h.type, name: t },
                      }
                    : { ref: h }),
                },
              }),
                ue(t, !1, void 0, h));
            } else
              ((a = m(n, t, {})),
                a._f && (a._f.mount = !1),
                (s.shouldUnregister || i.shouldUnregister) &&
                  !(Nt(u.array, t) && d.action) &&
                  u.unMount.add(t));
          },
        }
      );
    },
    De = () => s.shouldFocusError && ge(n, Pe, u.mount),
    Vt = (t) => {
      Q(t) &&
        (x.state.next({ disabled: t }),
        ge(
          n,
          (i, a) => {
            const y = m(n, a);
            y &&
              ((i.disabled = y._f.disabled || t),
              Array.isArray(y._f.refs) &&
                y._f.refs.forEach((f) => {
                  f.disabled = y._f.disabled || t;
                }));
          },
          0,
          !1
        ));
    },
    Ge = (t, i) => async (a) => {
      let y;
      a && (a.preventDefault && a.preventDefault(), a.persist && a.persist());
      let f = S(l);
      if ((x.state.next({ isSubmitting: !0 }), s.resolver)) {
        const { errors: c, values: h } = await K();
        (q(), (r.errors = c), (f = S(h)));
      } else await v({ fields: n, eventType: le.SUBMIT });
      if (u.disabled.size) for (const c of u.disabled) D(f, c);
      if ((D(r.errors, ct), L(r.errors))) {
        x.state.next({ errors: {} });
        try {
          await t(f, a);
        } catch (c) {
          y = c;
        }
      } else (i && (await i({ ...r.errors }, a)), De(), setTimeout(De));
      if (
        (x.state.next({
          isSubmitted: !0,
          isSubmitting: !1,
          isSubmitSuccessful: L(r.errors) && !y,
          submitCount: r.submitCount + 1,
          errors: r.errors,
        }),
        y)
      )
        throw y;
    },
    Ft = (t, i = {}) => {
      m(n, t) &&
        (A(i.defaultValue)
          ? re(t, S(m(o, t)))
          : (re(t, i.defaultValue), k(o, t, S(i.defaultValue))),
        i.keepTouched || D(r.touchedFields, t),
        i.keepDirty || (D(r.dirtyFields, t), (r.isDirty = i.defaultValue ? w(t, S(m(o, t))) : w())),
        i.keepError || (D(r.errors, t), p.isValid && Z()),
        x.state.next({ ...r }));
    },
    ze = (t, i = {}) => {
      const a = t ? S(t) : o,
        y = S(a),
        f = L(t),
        c = f ? o : y;
      if ((i.keepDefaultValues || (o = a), !i.keepValues)) {
        if (i.keepDirtyValues) {
          const h = new Set([...u.mount, ...Object.keys(he(o, l))]);
          for (const b of Array.from(h)) {
            const V = m(r.dirtyFields, b),
              O = m(l, b),
              J = m(c, b);
            V && !A(O) ? k(c, b, O) : !V && !A(J) && re(b, J);
          }
        } else {
          if (Re && A(t))
            for (const h of u.mount) {
              const b = m(n, h);
              if (b && b._f) {
                const V = Array.isArray(b._f.refs) ? b._f.refs[0] : b._f.ref;
                if (Ve(V)) {
                  const O = V.closest('form');
                  if (O) {
                    O.reset();
                    break;
                  }
                }
              }
            }
          if (i.keepFieldsRef) for (const h of u.mount) re(h, m(c, h));
          else n = {};
        }
        ((l = s.shouldUnregister ? (i.keepDefaultValues ? S(o) : {}) : S(c)),
          x.array.next({ values: { ...c } }),
          x.state.next({ values: { ...c } }));
      }
      ((u = {
        mount: i.keepDirtyValues ? u.mount : new Set(),
        unMount: new Set(),
        array: new Set(),
        registerName: new Set(),
        disabled: new Set(),
        watch: new Set(),
        watchAll: !1,
        focus: '',
      }),
        (d.mount =
          !p.isValid || !!i.keepIsValid || !!i.keepDirtyValues || (!s.shouldUnregister && !L(c))),
        (d.watch = !!s.shouldUnregister),
        (d.keepIsValid = !!i.keepIsValid),
        (d.action = !1),
        i.keepErrors || (r.errors = {}),
        x.state.next({
          submitCount: i.keepSubmitCount ? r.submitCount : 0,
          isDirty: f ? !1 : i.keepDirty ? r.isDirty : !!(i.keepDefaultValues && !se(t, o)),
          isSubmitted: i.keepIsSubmitted ? r.isSubmitted : !1,
          dirtyFields: f
            ? {}
            : i.keepDirtyValues
              ? i.keepDefaultValues && l
                ? he(o, l)
                : r.dirtyFields
              : i.keepDefaultValues && t
                ? he(o, t)
                : i.keepDirty
                  ? r.dirtyFields
                  : {},
          touchedFields: i.keepTouched ? r.touchedFields : {},
          errors: i.keepErrors ? r.errors : {},
          isSubmitSuccessful: i.keepIsSubmitSuccessful ? r.isSubmitSuccessful : !1,
          isSubmitting: !1,
          defaultValues: o,
        }));
    },
    Ze = (t, i) => ze(H(t) ? t(l) : t, { ...s.resetOptions, ...i }),
    wt = (t, i = {}) => {
      const a = m(n, t),
        y = a && a._f;
      if (y) {
        const f = y.refs ? y.refs[0] : y.ref;
        f.focus &&
          setTimeout(() => {
            (f.focus(), i.shouldSelect && H(f.select) && f.select());
          });
      }
    },
    kt = (t) => {
      r = { ...r, ...t };
    },
    Ke = {
      control: {
        register: Ee,
        unregister: Ae,
        getFieldState: qe,
        handleSubmit: Ge,
        setError: _e,
        _subscribe: We,
        _runSchema: K,
        _updateIsValidating: q,
        _focusError: De,
        _getWatch: T,
        _getDirty: w,
        _setValid: Z,
        _setFieldArray: ee,
        _setDisabledField: He,
        _setErrors: C,
        _getFieldArray: Y,
        _reset: ze,
        _resetDefaultValues: () =>
          H(s.defaultValues) &&
          s.defaultValues().then((t) => {
            (Ze(t, s.resetOptions), x.state.next({ isLoading: !1 }));
          }),
        _removeUnmounted: F,
        _disableForm: Vt,
        _subjects: x,
        _proxyFormState: p,
        get _fields() {
          return n;
        },
        get _formValues() {
          return l;
        },
        get _state() {
          return d;
        },
        set _state(t) {
          d = t;
        },
        get _defaultValues() {
          return o;
        },
        get _names() {
          return u;
        },
        set _names(t) {
          u = t;
        },
        get _formState() {
          return r;
        },
        get _options() {
          return s;
        },
        set _options(t) {
          s = { ...s, ...t };
        },
      },
      subscribe: _t,
      trigger: pe,
      register: Ee,
      handleSubmit: Ge,
      watch: vt,
      setValue: re,
      getValues: Be,
      reset: Ze,
      resetField: Ft,
      clearErrors: $e,
      unregister: Ae,
      setError: _e,
      setFocus: wt,
      getFieldState: qe,
    };
  return { ...Ke, formControl: Ke };
}
function Qt(e = {}) {
  const s = R.useRef(void 0),
    r = R.useRef(void 0),
    [n, o] = R.useState({
      isDirty: !1,
      isValidating: !1,
      isLoading: H(e.defaultValues),
      isSubmitted: !1,
      isSubmitting: !1,
      isSubmitSuccessful: !1,
      isValid: !1,
      submitCount: 0,
      dirtyFields: {},
      touchedFields: {},
      validatingFields: {},
      errors: e.errors || {},
      disabled: e.disabled || !1,
      isReady: !1,
      defaultValues: H(e.defaultValues) ? void 0 : e.defaultValues,
    });
  if (!s.current)
    if (e.formControl)
      ((s.current = { ...e.formControl, formState: n }),
        e.defaultValues &&
          !H(e.defaultValues) &&
          e.formControl.reset(e.defaultValues, e.resetOptions));
    else {
      const { formControl: d, ...u } = Jt(e);
      s.current = { ...u, formState: n };
    }
  const l = s.current.control;
  return (
    (l._options = e),
    Tt(() => {
      const d = l._subscribe({
        formState: l._proxyFormState,
        callback: () => o({ ...l._formState }),
        reRenderRoot: !0,
      });
      return (o((u) => ({ ...u, isReady: !0 })), (l._formState.isReady = !0), d);
    }, [l]),
    R.useEffect(() => l._disableForm(e.disabled), [l, e.disabled]),
    R.useEffect(() => {
      (e.mode && (l._options.mode = e.mode),
        e.reValidateMode && (l._options.reValidateMode = e.reValidateMode));
    }, [l, e.mode, e.reValidateMode]),
    R.useEffect(() => {
      e.errors && (l._setErrors(e.errors), l._focusError());
    }, [l, e.errors]),
    R.useEffect(() => {
      e.shouldUnregister && l._subjects.state.next({ values: l._getWatch() });
    }, [l, e.shouldUnregister]),
    R.useEffect(() => {
      if (l._proxyFormState.isDirty) {
        const d = l._getDirty();
        d !== n.isDirty && l._subjects.state.next({ isDirty: d });
      }
    }, [l, n.isDirty]),
    R.useEffect(() => {
      var d;
      e.values && !se(e.values, r.current)
        ? (l._reset(e.values, { keepFieldsRef: !0, ...l._options.resetOptions }),
          (!((d = l._options.resetOptions) === null || d === void 0) && d.keepIsValid) ||
            l._setValid(),
          (r.current = e.values),
          o((u) => ({ ...u })))
        : l._resetDefaultValues();
    }, [l, e.values]),
    R.useEffect(() => {
      (l._state.mount || (l._setValid(), (l._state.mount = !0)),
        l._state.watch && ((l._state.watch = !1), l._subjects.state.next({ ...l._formState })),
        l._removeUnmounted());
    }),
    (s.current.formState = R.useMemo(() => Ct(n, l), [l, n])),
    s.current
  );
}
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const Xt = (e) => e.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(),
  xt = (...e) =>
    e
      .filter((s, r, n) => !!s && s.trim() !== '' && n.indexOf(s) === r)
      .join(' ')
      .trim();
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var er = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const tr = ne.forwardRef(
  (
    {
      color: e = 'currentColor',
      size: s = 24,
      strokeWidth: r = 2,
      absoluteStrokeWidth: n,
      className: o = '',
      children: l,
      iconNode: d,
      ...u
    },
    j
  ) =>
    ne.createElement(
      'svg',
      {
        ref: j,
        ...er,
        width: s,
        height: s,
        stroke: e,
        strokeWidth: n ? (Number(r) * 24) / Number(s) : r,
        className: xt('lucide', o),
        ...u,
      },
      [...d.map(([I, z]) => ne.createElement(I, z)), ...(Array.isArray(l) ? l : [l])]
    )
);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const xe = (e, s) => {
  const r = ne.forwardRef(({ className: n, ...o }, l) =>
    ne.createElement(tr, { ref: l, iconNode: s, className: xt(`lucide-${Xt(e)}`, n), ...o })
  );
  return ((r.displayName = `${e}`), r);
};
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const rr = [['path', { d: 'M20 6 9 17l-5-5', key: '1gmf2c' }]],
  sr = xe('Check', rr);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const ir = [
    [
      'path',
      {
        d: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4',
        key: 'tonef',
      },
    ],
    ['path', { d: 'M9 18c-4.51 2-5-2-7-2', key: '9comsn' }],
  ],
  ar = xe('Github', ir);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const nr = [
    [
      'path',
      {
        d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z',
        key: 'c2jq9f',
      },
    ],
    ['rect', { width: '4', height: '12', x: '2', y: '9', key: 'mk3on5' }],
    ['circle', { cx: '4', cy: '4', r: '2', key: 'bt5ra8' }],
  ],
  lr = xe('Linkedin', nr);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const or = [['path', { d: 'M21 12a9 9 0 1 1-6.219-8.56', key: '13zald' }]],
  ur = xe('LoaderCircle', or);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ const dr = [
    ['rect', { width: '20', height: '16', x: '2', y: '4', rx: '2', key: '18n3k1' }],
    ['path', { d: 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7', key: '1ocrg3' }],
  ],
  cr = xe('Mail', dr);
function mr() {
  const [e, s] = ne.useState('idle'),
    [r, n] = ne.useState(''),
    {
      register: o,
      handleSubmit: l,
      reset: d,
      formState: { errors: u },
    } = Qt(),
    j = async (I) => {
      (s('loading'), n(''));
      try {
        if (
          !(
            await fetch('/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(I),
            })
          ).ok
        )
          throw new Error('Failed to send message');
        (s('success'), d());
      } catch (z) {
        (console.error('Contact form error:', z),
          s('error'),
          n('Failed to send message. Please try again or email directly.'));
      }
    };
  return g.jsx('section', {
    id: 'contacto',
    className: 'py-20 bg-surface',
    children: g.jsxs('div', {
      className: 'max-w-6xl mx-auto px-6',
      children: [
        g.jsxs('h2', {
          className: 'text-3xl md:text-4xl font-bold font-heading text-text-primary mb-12',
          children: ['Contact', g.jsx('span', { className: 'text-accent-cyan', children: 'o' })],
        }),
        g.jsxs('div', {
          className: 'grid md:grid-cols-2 gap-12',
          children: [
            g.jsxs('div', {
              children: [
                g.jsx('p', {
                  className: 'text-lg text-text-secondary mb-8',
                  children:
                    '¿Tenés un proyecto en mente? ¿Querés trabajar juntos? Escribime y te respondo lo antes posible.',
                }),
                g.jsxs('div', {
                  className: 'space-y-4',
                  children: [
                    g.jsxs('a', {
                      href: 'mailto:gomezukalil@gmail.com',
                      className:
                        'flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors',
                      children: [
                        g.jsx(cr, { className: 'w-5 h-5' }),
                        g.jsx('span', { children: 'gomezukalil@gmail.com' }),
                      ],
                    }),
                    g.jsxs('a', {
                      href: 'https://linkedin.com/in/matiaskalil',
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      className:
                        'flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors',
                      children: [
                        g.jsx(lr, { className: 'w-5 h-5' }),
                        g.jsx('span', { children: 'LinkedIn' }),
                      ],
                    }),
                    g.jsxs('a', {
                      href: 'https://github.com/matiaskalil',
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      className:
                        'flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors',
                      children: [
                        g.jsx(ar, { className: 'w-5 h-5' }),
                        g.jsx('span', { children: 'GitHub' }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            g.jsxs('form', {
              onSubmit: l(j),
              className: 'space-y-4',
              children: [
                g.jsxs('div', {
                  children: [
                    g.jsx('label', {
                      htmlFor: 'name',
                      className: 'block text-sm text-text-secondary mb-2',
                      children: 'Nombre',
                    }),
                    g.jsx('input', {
                      ...o('name', { required: 'Name is required' }),
                      type: 'text',
                      id: 'name',
                      className:
                        'w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-text-primary focus:border-accent-cyan focus:outline-none transition-colors',
                      placeholder: 'Tu nombre',
                    }),
                    u.name &&
                      g.jsx('span', {
                        className: 'text-red-500 text-sm',
                        children: u.name.message,
                      }),
                  ],
                }),
                g.jsxs('div', {
                  children: [
                    g.jsx('label', {
                      htmlFor: 'email',
                      className: 'block text-sm text-text-secondary mb-2',
                      children: 'Email',
                    }),
                    g.jsx('input', {
                      ...o('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      }),
                      type: 'email',
                      id: 'email',
                      className:
                        'w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-text-primary focus:border-accent-cyan focus:outline-none transition-colors',
                      placeholder: 'tu@email.com',
                    }),
                    u.email &&
                      g.jsx('span', {
                        className: 'text-red-500 text-sm',
                        children: u.email.message,
                      }),
                  ],
                }),
                g.jsxs('div', {
                  children: [
                    g.jsx('label', {
                      htmlFor: 'subject',
                      className: 'block text-sm text-text-secondary mb-2',
                      children: 'Asunto',
                    }),
                    g.jsx('input', {
                      ...o('subject', { required: 'Subject is required' }),
                      type: 'text',
                      id: 'subject',
                      className:
                        'w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-text-primary focus:border-accent-cyan focus:outline-none transition-colors',
                      placeholder: '¿De qué se trata?',
                    }),
                    u.subject &&
                      g.jsx('span', {
                        className: 'text-red-500 text-sm',
                        children: u.subject.message,
                      }),
                  ],
                }),
                g.jsxs('div', {
                  children: [
                    g.jsx('label', {
                      htmlFor: 'message',
                      className: 'block text-sm text-text-secondary mb-2',
                      children: 'Mensaje',
                    }),
                    g.jsx('textarea', {
                      ...o('message', { required: 'Message is required' }),
                      id: 'message',
                      rows: 5,
                      className:
                        'w-full px-4 py-3 bg-surface-2 border border-border rounded-lg text-text-primary focus:border-accent-cyan focus:outline-none transition-colors resize-none',
                      placeholder: 'Tu mensaje...',
                    }),
                    u.message &&
                      g.jsx('span', {
                        className: 'text-red-500 text-sm',
                        children: u.message.message,
                      }),
                  ],
                }),
                g.jsxs('button', {
                  type: 'submit',
                  disabled: e === 'loading' || e === 'success',
                  className:
                    'w-full px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2',
                  children: [
                    e === 'loading' && g.jsx(ur, { className: 'w-5 h-5 animate-spin' }),
                    e === 'success' && g.jsx(sr, { className: 'w-5 h-5' }),
                    e === 'loading'
                      ? 'Enviando...'
                      : e === 'success'
                        ? 'Enviado!'
                        : 'Enviar mensaje',
                  ],
                }),
                e === 'error' &&
                  g.jsx(Qe.div, {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    className:
                      'p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-500 text-sm',
                    children: r,
                  }),
                e === 'success' &&
                  g.jsx(Qe.div, {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    className:
                      'p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-500 text-sm',
                    children: '¡Mensaje enviado! Te responderé pronto.',
                  }),
              ],
            }),
          ],
        }),
      ],
    }),
  });
}
export { mr as default };
