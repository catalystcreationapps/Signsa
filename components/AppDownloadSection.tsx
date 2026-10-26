'use client'

import { ArrowUpRight, Sparkles, Smartphone, ShieldCheck, Flame, Bell, QrCode } from 'lucide-react'

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.wulooj.signburger.sa&hl=en-US'
const APPLE_APP_STORE_URL = 'https://apps.apple.com/sa/app/sign-burger-%D8%B3%D8%A7%D9%8A%D9%86-%D8%A8%D8%B1%D8%AC%D8%B1/id6748125819'

export default function AppDownloadSection() {
  return (
    <section className="app-download-section section-pad" id="app" aria-label="Sign Mobile App">
      <div className="section-kicker">
        <span>04</span>
        <span>SIGN IN YOUR POCKET</span>
      </div>

      <div className="app-download-card">
        <div className="app-card-grain" />

        <div className="app-content-col">
          <div className="app-pill">
            <Sparkles className="w-3.5 h-3.5 text-[#ff7c97]" />
            <span>Official Sign Burger Mobile App</span>
          </div>

          <h2 className="app-title">
            Skip the wait.<br />
            <em>Fresh on demand.</em>
          </h2>

          <p className="app-desc">
            Order ahead for speedy drive-thru pickup, unlock exclusive app-only deals on Sign Beef and Breakfast meals, track your fresh order in real time, and locate the nearest of our 38 branches across Saudi Arabia.
          </p>

          <div className="app-perks-list">
            <div className="app-perk">
              <span className="perk-bullet">⚡</span>
              <span>Express Drive-Thru & Curbside Pickup</span>
            </div>
            <div className="app-perk">
              <span className="perk-bullet">🎁</span>
              <span>Exclusive App Deals & Morning Bundles</span>
            </div>
            <div className="app-perk">
              <span className="perk-bullet">📍</span>
              <span>Live Order Tracking Across 38 Branches</span>
            </div>
          </div>

          {/* Store Badges */}
          <div className="store-buttons-group">
            {/* Apple App Store */}
            <a
              href={APPLE_APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="store-badge-btn apple-badge"
              aria-label="Download Sign Burger on Apple App Store"
            >
              <svg className="store-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.9.04-2 .6-2.65 1.36-.58.67-1.09 1.74-.96 2.78 1.01.08 2.06-.52 2.69-1.27z" />
              </svg>
              <div className="store-badge-text">
                <small>Download on the</small>
                <b>Apple App Store</b>
              </div>
            </a>

            {/* Google Play Store */}
            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="store-badge-btn google-badge"
              aria-label="Get Sign Burger on Google Play"
            >
              <svg className="store-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a2.235 2.235 0 0 1-.61-.926V2.74c.14-.367.355-.688.609-.926zm11.242 11.245l2.094-2.094L4.858 3.513l10.373 9.873.38-.327.38.327-.38.327zm-1.06 1.06l-2.094 2.094 7.247 4.14-5.153-6.234zm5.556-3.06l2.977 1.701c.907.518.907 1.36 0 1.878l-2.977 1.7-2.39-2.64 2.39-2.639z" />
              </svg>
              <div className="store-badge-text">
                <small>GET IT ON</small>
                <b>Google Play</b>
              </div>
            </a>
          </div>
        </div>

        {/* Visual Phone Showcase */}
        <div className="app-visual-col">
          <div className="phone-mockup-frame">
            <div className="phone-screen">
              <div className="phone-notch" />
              <div className="phone-header-bar">
                <span className="app-brand-mark">Sign<i>®</i></span>
                <span className="phone-badge">App Only -20%</span>
              </div>
              <div className="phone-card-preview">
                <img
                  src="/menu/sign-beef-meal.png"
                  alt="Sign Beef Meal on app"
                  className="phone-food-img"
                />
                <div className="phone-food-meta">
                  <b>Sign Beef Meal</b>
                  <span>24 SR · Smashed Angus</span>
                </div>
              </div>
              <div className="phone-quick-actions">
                <div className="phone-action-btn">Drive-Thru Pickup 🚗</div>
                <div className="phone-action-btn secondary">Order in 1 Tap ✨</div>
              </div>
            </div>
            <div className="phone-ambient-glow" />
          </div>
        </div>
      </div>
    </section>
  )
}
