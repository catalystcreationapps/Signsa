'use client'

import { useEffect, useRef } from 'react'
import { X, Flame, Sparkles, Smartphone, MapPin } from 'lucide-react'
import gsap from 'gsap'

export interface MenuItemData {
  name: string
  nameAr?: string
  category: 'burgers' | 'boxes' | 'sides' | 'drinks' | 'desserts' | 'morning'
  price: string
  kcal: string
  image: string
  tag: string
  description: string
  ingredients?: string[]
  nutrition?: {
    protein: string
    carbs: string
    fat: string
  }
  spicyLevel?: number
}

interface ItemModalProps {
  item: MenuItemData | null
  onClose: () => void
}

export default function ItemModal({ item, onClose }: ItemModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!item) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    // GSAP entrance
    if (backdropRef.current && contentRef.current) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      )
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.2)' }
      )
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [item, onClose])

  if (!item) return null

  const handleClose = () => {
    if (backdropRef.current && contentRef.current) {
      gsap.to(contentRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.96,
        duration: 0.2,
        ease: 'power2.in',
      })
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: onClose,
      })
    } else {
      onClose()
    }
  }

  return (
    <div className="item-modal-overlay" ref={modalRef} role="dialog" aria-modal="true">
      <div className="modal-backdrop" ref={backdropRef} onClick={handleClose} />
      <div className="modal-content" ref={contentRef}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="modal-grid">
          <div className="modal-media">
            <img src={item.image} alt={item.name} className="modal-img" />
            <span className="modal-tag-chip">{item.tag}</span>
          </div>

          <div className="modal-body">
            <div className="modal-header">
              <span className="modal-eyebrow">Sign Signature Recipe</span>
              <h3 className="modal-title">{item.name}</h3>
              {item.nameAr && <span className="modal-arabic-title">{item.nameAr}</span>}
              <div className="modal-price-bar">
                <span className="modal-price">
                  {item.price} <small>SR</small>
                </span>
                <span className="modal-kcal">{item.kcal}</span>
              </div>
            </div>

            <p className="modal-desc">{item.description}</p>

            {item.spicyLevel !== undefined && item.spicyLevel > 0 && (
              <div className="modal-spice-bar">
                <span className="spice-label">Spice Intensity:</span>
                <div className="spice-icons">
                  {[1, 2, 3].map((lvl) => (
                    <Flame
                      key={lvl}
                      className={`spice-icon ${lvl <= item.spicyLevel! ? 'active' : ''}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {item.ingredients && item.ingredients.length > 0 && (
              <div className="modal-ingredients">
                <span className="section-subtitle">Crafted with:</span>
                <div className="ingredient-chips">
                  {item.ingredients.map((ing) => (
                    <span key={ing} className="chip">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {item.nutrition && (
              <div className="modal-nutrition-grid">
                <div className="nutrition-box">
                  <span className="nut-val">{item.nutrition.protein}</span>
                  <span className="nut-lbl">Protein</span>
                </div>
                <div className="nutrition-box">
                  <span className="nut-val">{item.nutrition.carbs}</span>
                  <span className="nut-lbl">Carbs</span>
                </div>
                <div className="nutrition-box">
                  <span className="nut-val">{item.nutrition.fat}</span>
                  <span className="nut-lbl">Fats</span>
                </div>
              </div>
            )}

            <div className="modal-cta-row">
              <a
                href="#app"
                className="button button-pink modal-order-btn"
                onClick={handleClose}
              >
                <Smartphone className="w-4 h-4" />
                <span>Order on Sign App ({item.price} SR)</span>
              </a>
              <a
                href="#branches"
                className="button button-light modal-order-btn"
                onClick={handleClose}
              >
                <MapPin className="w-4 h-4" />
                <span>Find in 38 Branches</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
