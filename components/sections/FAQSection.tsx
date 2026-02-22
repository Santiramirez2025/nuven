'use client'

import { useEffect, useRef, useState } from 'react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FAQ_ITEMS } from '@/data/faq'

export function FAQSection() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const toggle = (id: string) =>
    setOpenId((prev) => (prev === id ? null : id))

  return (
    <>
      <style>{`
        .faq-section {
          background: #080c0a;
          padding: 96px 24px;
        }

        .faq-inner {
          max-width: 720px;
          margin: 0 auto;
        }

        /* ── Header ── */
        .faq-header {
          margin-bottom: 48px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .faq-header.visible { opacity: 1; transform: translateY(0); }

        .faq-h2 {
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 900;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: #e8ede9;
          margin: 16px 0 0;
          text-wrap: balance;
        }
        .faq-h2 .muted { color: #5a7066; }

        /* ── List ── */
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        /* ── Item ── */
        .faq-item {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          overflow: hidden;
          opacity: 0;
          transform: translateY(12px);
          transition:
            opacity 0.45s ease,
            transform 0.45s ease,
            border-color 0.2s;
        }
        .faq-item.shown { opacity: 1; transform: translateY(0); }
        .faq-item.open  { border-color: rgba(76,186,122,0.2); }
        .faq-item:not(.open):hover { border-color: rgba(255,255,255,0.1); }

        /* ── Button ── */
        .faq-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 20px;
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
        }

        .faq-question {
          font-size: 15px;
          font-weight: 600;
          color: #e8ede9;
          letter-spacing: -0.01em;
          line-height: 1.35;
          flex: 1;
          transition: color 0.2s;
        }

        .faq-item.open .faq-question { color: #fff; }

        .faq-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #3d5247;
          transition: border-color 0.2s, color 0.2s, transform 0.3s ease;
        }

        .faq-item.open .faq-icon {
          border-color: rgba(76,186,122,0.3);
          color: #4cba7a;
          transform: rotate(45deg);
        }

        /* ── Answer — CSS grid trick ── */
        .faq-body-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.32s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .faq-item.open .faq-body-wrap { grid-template-rows: 1fr; }

        .faq-body-inner { overflow: hidden; }

        .faq-answer {
          padding: 0 20px 18px;
          font-size: 14px;
          color: #5a7066;
          line-height: 1.75;
          margin: 0;
          border-top: 1px solid rgba(255,255,255,0.04);
          padding-top: 14px;
        }

        @media (max-width: 560px) {
          .faq-section { padding: 64px 20px; }
          .faq-btn     { padding: 16px 16px; }
          .faq-answer  { padding: 12px 16px 16px; }
        }
      `}</style>

      <section ref={ref} id="faq" className="faq-section">
        <div className="faq-inner">

          <div className={`faq-header ${visible ? 'visible' : ''}`}>
            <SectionLabel>Preguntas frecuentes</SectionLabel>
            <h2 className="faq-h2">
              Todo lo que{' '}
              <span className="muted">necesitás saber.</span>
            </h2>
          </div>

          <div className="faq-list" role="list">
            {FAQ_ITEMS.map((item, i) => (
              <FAQItem
                key={item.id}
                item={item}
                index={i}
                visible={visible}
                open={openId === item.id}
                onToggle={() => toggle(item.id)}
              />
            ))}
          </div>

        </div>
      </section>
    </>
  )
}

function FAQItem({
  item, index, visible, open, onToggle,
}: {
  item: { id: string; question: string; answer: string }
  index: number
  visible: boolean
  open: boolean
  onToggle: () => void
}) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setShown(true), index * 70)
    return () => clearTimeout(t)
  }, [visible, index])

  return (
    <div
      className={`faq-item ${shown ? 'shown' : ''} ${open ? 'open' : ''}`}
      role="listitem"
    >
      <button
        className="faq-btn"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-answer-${item.id}`}
      >
        <span className="faq-question">{item.question}</span>
        <span className="faq-icon" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>

      <div className="faq-body-wrap">
        <div className="faq-body-inner">
          <p
            id={`faq-answer-${item.id}`}
            className="faq-answer"
            role="region"
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}