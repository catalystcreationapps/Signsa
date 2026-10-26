'use client'

import { useState, useEffect, useRef } from 'react'
import {
  ArrowDown,
  ArrowUpRight,
  Clock3,
  MapPin,
  Menu,
  X,
  Sparkles,
  Smartphone,
} from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import GoogleMapSection from '@/components/GoogleMapSection'
import ItemModal, { MenuItemData } from '@/components/ItemModal'
import ReviewsSection from '@/components/ReviewsSection'
import AppDownloadSection from '@/components/AppDownloadSection'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.wulooj.signburger.sa&hl=en-US'
const APPLE_APP_STORE_URL = 'https://apps.apple.com/sa/app/sign-burger-%D8%B3%D8%A7%D9%8A%D9%86-%D8%A8%D8%B1%D8%AC%D8%B1/id6748125819'

// OFFICIAL LIVE MENU DATA FROM SIGNSA.COM USING LOCAL IMAGES
const menuItemsData: MenuItemData[] = [
  {
    name: 'Sign Beef Meal',
    nameAr: 'وجبة ساين لحم',
    category: 'burgers',
    price: '24',
    kcal: '917 Kcal',
    image: '/menu/sign-beef-meal.png',
    tag: 'Signature',
    description: 'Fresh 100% Angus beef patty smashed crispy on high heat, melted American cheese, grilled onions, crunchy pickles, and our signature secret pink Sign sauce on toasted brioche.',
    ingredients: ['100% Angus Beef', 'Toasted Brioche Bun', 'American Cheddar', 'Grilled Onions', 'Secret Pink Sauce'],
    nutrition: { protein: '38g', carbs: '44g', fat: '28g' },
    spicyLevel: 0,
  },
  {
    name: 'Sign Chicken Meal',
    nameAr: 'وجبة ساين دجاج',
    category: 'burgers',
    price: '24',
    kcal: '827 Kcal',
    image: '/menu/sign-chicken-meal.png',
    tag: 'Popular',
    description: 'Juicy golden-fried fresh chicken fillet, homemade fresh slaw, melted cheese, and garlic herb mayo inside a soft pillowy bun.',
    ingredients: ['Fresh Fried Chicken Breast', 'Homemade Slaw', 'Garlic Herb Mayo', 'Brioche Bun'],
    nutrition: { protein: '34g', carbs: '48g', fat: '22g' },
    spicyLevel: 0,
  },
  {
    name: 'Sign Spicy Chicken Meal',
    nameAr: 'وجبة ساين دجاج سبايسي',
    category: 'burgers',
    price: '24',
    kcal: '827 Kcal',
    image: '/menu/sign-spicy-chicken-meal.png',
    tag: 'Spicy',
    description: 'Fiery spiced crispy chicken fillet dipped in spicy seasoning, pickled jalapeños, spicy mayo, and crisp lettuce for a bold kick.',
    ingredients: ['Spiced Chicken Fillet', 'Spicy Seasoning', 'Jalapeños', 'Spicy Sign Mayo'],
    nutrition: { protein: '35g', carbs: '47g', fat: '25g' },
    spicyLevel: 3,
  },
  {
    name: 'Sign Falafel Meal',
    nameAr: 'وجبة ساين فلافل',
    category: 'morning',
    price: '12',
    kcal: '471 Kcal',
    image: '/menu/sign-falafel-meal.png',
    tag: 'Morning Fresh',
    description: 'Golden crunchy herbal falafel patties, fresh tomatoes, mint, crunchy pickles, and rich creamy tahini sauce inside warm fresh bread.',
    ingredients: ['Crispy Falafel', 'Fresh Tahini', 'Tomatoes & Mint', 'Pickles'],
    nutrition: { protein: '16g', carbs: '52g', fat: '14g' },
    spicyLevel: 0,
  },
  {
    name: 'Sign Halloumi Meal',
    nameAr: 'وجبة ساين حلومي',
    category: 'morning',
    price: '14',
    kcal: '393 Kcal',
    image: '/menu/sign-halloumi-meal.png',
    tag: 'Morning Special',
    description: 'Pan-seared premium Halloumi cheese slices, fresh rocca, ripe tomatoes, and fragrant zaatar pesto glaze served warm.',
    ingredients: ['Seared Halloumi', 'Wild Rocca', 'Sliced Tomatoes', 'Zaatar Olive Oil Glaze'],
    nutrition: { protein: '20g', carbs: '28g', fat: '18g' },
    spicyLevel: 0,
  },
  {
    name: 'Sign Morning Box',
    nameAr: 'بوكس الصباح ساين',
    category: 'morning',
    price: '22',
    kcal: '864 Kcal',
    image: '/menu/sign-morning-box.png',
    tag: 'Morning Box',
    description: 'The complete Riyadh morning package. Combination of Halloumi & Falafel sandwiches, fresh sides, and morning beverage.',
    ingredients: ['Assorted Morning Sandwiches', 'Crispy Hash / Fries', 'Morning Beverage'],
    nutrition: { protein: '32g', carbs: '88g', fat: '32g' },
  },
  {
    name: 'Box (4)',
    nameAr: 'بوكس (4)',
    category: 'boxes',
    price: '88',
    kcal: '3488 Kcal',
    image: '/menu/Box-of-4.png',
    tag: '4 Burgers + 4 Fries',
    description: 'Choice of 4 signature beef or chicken burgers, 4 golden seasoned french fries, and signature dipping sauces.',
    ingredients: ['4 Sign Burgers', '4 Seasoned Fries', 'Assorted Dips'],
    nutrition: { protein: '140g', carbs: '210g', fat: '110g' },
  },
  {
    name: 'Box (6)',
    nameAr: 'بوكس (6)',
    category: 'boxes',
    price: '132',
    kcal: '5232 Kcal',
    image: '/menu/Box-of-6.png',
    tag: '6 Burgers + 6 Fries',
    description: 'The ultimate gathering feast. 6 fresh burgers of your choice, 6 crispy fries, and full sauce rack for the whole table.',
    ingredients: ['6 Gourmet Burgers', '6 Golden Fries', 'Sign Sauce Caddy'],
    nutrition: { protein: '210g', carbs: '315g', fat: '165g' },
  },
  {
    name: 'Sign Fries',
    nameAr: 'بطاطس ساين',
    category: 'sides',
    price: '7',
    kcal: '307 Kcal',
    image: '/menu/Sign-Fries-new.png',
    tag: 'Side',
    description: 'Fresh skin-on golden potatoes fried to crunch and tossed in our proprietary herb paprika sea salt.',
    ingredients: ['Golden Potatoes', 'Sign Herb Dust', 'Sea Salt'],
    nutrition: { protein: '4g', carbs: '39g', fat: '15g' },
  },
  {
    name: 'Sign Bites',
    nameAr: 'ساين بايتس',
    category: 'sides',
    price: '12',
    kcal: '440 Kcal',
    image: '/menu/sign-bites.png',
    tag: 'Crispy',
    description: 'Bite-sized tender fresh chicken nuggets coated in seasoned breading with your choice of dipping sauce.',
    ingredients: ['Chicken Tenderloin', 'Crispy Crumb', 'Signature Seasoning'],
    nutrition: { protein: '24g', carbs: '20g', fat: '16g' },
  },
  {
    name: 'Sign Sauce',
    nameAr: 'صوص ساين',
    category: 'sides',
    price: '3',
    kcal: '165 Kcal',
    image: '/menu/sign-sauce.png',
    tag: 'Dip',
    description: 'Our proprietary pink secret blend of tangy pickles, subtle smoked spices, and velvety creaminess.',
    ingredients: ['Cream Base', 'Pickle Relish', 'Smoked Spices'],
    nutrition: { protein: '1g', carbs: '4g', fat: '16g' },
  },
  {
    name: 'Sign Ice Cream',
    nameAr: 'آيسكريم ساين',
    category: 'desserts',
    price: '10',
    kcal: '595 Kcal',
    image: '/menu/sign-ice-cream-1.png',
    tag: 'Sweet',
    description: 'Rich velvety soft-serve ice cream swirled fresh with decadent toppings.',
    ingredients: ['Fresh Dairy Cream', 'Vanilla Bean', 'Signature Toppings'],
    nutrition: { protein: '7g', carbs: '52g', fat: '18g' },
  },
  {
    name: 'Soft Drinks',
    nameAr: 'مشروبات غازية',
    category: 'drinks',
    price: '6',
    kcal: 'Chilled & Fizzy',
    image: '/menu/soft-drink.png',
    tag: 'Refresh',
    description: 'Served ice-cold with your choice of favorite sodas.',
    nutrition: { protein: '0g', carbs: '35g', fat: '0g' },
  },
]

const categories = [
  { id: 'all', label: 'All Menu' },
  { id: 'burgers', label: 'Burgers 🍔' },
  { id: 'morning', label: 'Morning & Breakfast ☀️' },
  { id: 'boxes', label: 'Boxes & Feasts 📦' },
  { id: 'sides', label: 'Sides & Dips 🍟' },
  { id: 'desserts', label: 'Desserts & Drinks 🍦' },
]

export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedItem, setSelectedItem] = useState<MenuItemData | null>(null)
  const [scrolled, setScrolled] = useState(false)

  const heroRef = useRef<HTMLElement>(null)
  const stickerRef = useRef<HTMLDivElement>(null)
  const menuGridRef = useRef<HTMLDivElement>(null)

  // Filtered menu
  const displayedItems = menuItemsData.filter((item) => {
    if (activeCategory === 'all') return true
    if (activeCategory === 'desserts') return item.category === 'desserts' || item.category === 'drinks'
    if (activeCategory === 'boxes') return item.category === 'boxes'
    if (activeCategory === 'morning') return item.category === 'morning'
    return item.category === activeCategory
  })

  // Track header scroll state
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // GSAP Animations setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Entrance timeline
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      heroTl
        .from('.site-header', {
          y: -30,
          opacity: 0,
          duration: 0.8,
        })
        .from(
          '.hero-eyebrow',
          {
            opacity: 0,
            y: 15,
            duration: 0.6,
          },
          '-=0.4'
        )
        .from(
          '.hero-title-line',
          {
            y: 50,
            opacity: 0,
            duration: 0.9,
            stagger: 0.15,
            skewY: 2,
          },
          '-=0.3'
        )
        .from(
          '.hero-copy',
          {
            opacity: 0,
            y: 20,
            duration: 0.7,
          },
          '-=0.5'
        )
        .from(
          '.hero-actions',
          {
            opacity: 0,
            y: 25,
            duration: 0.6,
          },
          '-=0.4'
        )
        .from(
          stickerRef.current,
          {
            scale: 0,
            rotation: -45,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
          },
          '-=0.5'
        )

      // Continuous gentle sticker rotation & scroll velocity responsiveness
      if (stickerRef.current) {
        gsap.to(stickerRef.current, {
          rotation: '+=360',
          duration: 25,
          repeat: -1,
          ease: 'none',
        })

        gsap.to(stickerRef.current, {
          rotation: '+=180',
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }

      // Hero Parallax Background
      gsap.to('.hero-background', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // 2. Story Section reveals
      gsap.from('#story .section-kicker', {
        opacity: 0,
        x: -30,
        duration: 0.8,
        scrollTrigger: {
          trigger: '#story',
          start: 'top 80%',
        },
      })

      gsap.from('.intro-grid h2', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.intro-grid',
          start: 'top 80%',
        },
      })

      gsap.from('.intro-copy', {
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.intro-copy',
          start: 'top 80%',
        },
      })

      // Rotating S Orbit Mark
      gsap.to('.orbit-mark', {
        rotation: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: '#story',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Vision row cards stagger
      gsap.from('.vision-card-item', {
        y: 45,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.vision-row',
          start: 'top 85%',
        },
      })

      // 3. Menu cards scroll stagger
      gsap.from('.menu-card', {
        y: 40,
        opacity: 0,
        scale: 0.96,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#menu',
          start: 'top 75%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  // Animate menu grid smoothly on tab switch
  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId)
    if (menuGridRef.current) {
      gsap.fromTo(
        menuGridRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: 'power2.out' }
      )
    }
  }

  return (
    <main className="site-shell">
      {/* Dynamic Header */}
      <header className={`site-header-wrapper ${scrolled ? 'scrolled-nav' : ''}`}>
        <div className="site-header">
          <a className="brand" href="#top" aria-label="Sign home">
            <span>Sign</span>
            <i>®</i>
          </a>

          <nav className={mobileOpen ? 'nav mobile-visible' : 'nav'} aria-label="Primary navigation">
            <a href="#story" onClick={() => setMobileOpen(false)}>Our story</a>
            <a href="#menu" onClick={() => setMobileOpen(false)}>Menu</a>
            <a href="#branches" onClick={() => setMobileOpen(false)}>Branches & Map</a>
            <a href="#app" onClick={() => setMobileOpen(false)}>Official App 📱</a>
            <a href="#reviews" onClick={() => setMobileOpen(false)}>Reviews</a>
            <a className="nav-order" href="#app" onClick={() => setMobileOpen(false)}>
              Order Now <ArrowUpRight aria-hidden="true" />
            </a>
          </nav>

          <div className="header-actions-right">
            <a className="nav-order desktop-order-btn" href="#app">
              Order Now <ArrowUpRight aria-hidden="true" />
            </a>

            <button
              className="menu-toggle"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="top" ref={heroRef}>
        <div className="hero-background" />
        <div className="grain" />

        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">RIYADH · SAUDI ARABIA · SINCE 2021</p>
          <h1 className="hero-title">
            <span className="hero-title-line block">A little</span>
            <span className="hero-title-line block"><em>extraordinary.</em></span>
          </h1>
          <p className="hero-copy">
            Fresh burgers, morning breakfast & good times on hand across 38 branches in Saudi Arabia.
          </p>
          <div className="hero-actions">
            <a className="button button-light" href="#menu">
              Explore Official Menu <ArrowDown aria-hidden="true" />
            </a>
            <a className="button button-pink hero-branches-btn" href="#branches">
              <MapPin className="w-4 h-4" /> Find 38 Branches
            </a>
            <a className="button button-light" href="#app">
              <Smartphone className="w-4 h-4 text-[#ff7c97]" /> Download App
            </a>
            <span className="scroll-note">
              Scroll to discover <span className="line" />
            </span>
          </div>
        </div>

        <div className="hero-sticker" ref={stickerRef} aria-hidden="true">
          FRESH<br />
          <b>ON</b><br />
          HAND
        </div>
      </section>

      {/* Story Section */}
      <section className="intro section-pad" id="story">
        <div className="section-kicker">
          <span>01</span>
          <span>THE SIGN STORY</span>
        </div>
        <div className="intro-grid">
          <h2>
            Made to be<br />
            <em>remembered.</em>
          </h2>
          <div className="intro-copy">
            <p className="lead">
              High-value food in terms of taste, freshness, affordability, and genuine culinary experience.
            </p>
            <p>
              It began as a mere idea in Riyadh, and through determination, Sign transformed that concept into a tangible reality. The story of Sign originated with Abeer Al Rajhi, an ambitious woman who not only conceptualized a business but also made people feel integral to its journey. Today, Sign stands as one of the premier burger establishments with 38 branches across Saudi Arabia.
            </p>
            <a className="text-link" href="#branches">
              Locate Our Branches in Saudi Arabia <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="vision-row">
          <div className="vision-card-item">
            <span className="mini-label">OUR VISION</span>
            <h3>
              To be the leading<br />
              burger brand in all aspects.
            </h3>
            <p className="vision-desc">High-value food in terms of taste, freshness, affordability, and experience.</p>
          </div>
          <div className="vision-card-item">
            <span className="mini-label">OUR MISSION</span>
            <h3>
              To offer a fresh meal that<br />
              exceeds every customer experience.
            </h3>
            <p className="vision-desc">Crafted fast, served hot, and priced with complete transparency.</p>
          </div>
          <div className="orbit-mark" aria-hidden="true">
            S
          </div>
        </div>
      </section>

      {/* Continuous Value Marquee */}
      <section className="marquee" aria-label="Sign values">
        <div className="marquee-content">
          <span>100% FRESH ANGUS BEEF</span> ✳
          <span>MORNING FALAFEL & HALLOUMI</span> ✳
          <span>SECRET PINK SAUCE</span> ✳
          <span>38 BRANCHES ACROSS KSA</span> ✳
          <span>OPEN 6 AM — 4 AM</span> ✳
          <span>CRISPY CHICKEN TENDERS</span> ✳
          <span>SIGN BITES & FRIES</span> ✳
          <span>ORDER ON OFFICIAL APP</span> ✳
          <span>100% FRESH ANGUS BEEF</span> ✳
          <span>MORNING FALAFEL & HALLOUMI</span> ✳
          <span>SECRET PINK SAUCE</span> ✳
        </div>
      </section>

      {/* Menu Section */}
      <section className="menu-section section-pad" id="menu">
        <div className="section-kicker">
          <span>02</span>
          <span>FEATURED MENU · SIGNSA.COM</span>
        </div>

        <div className="menu-heading">
          <div>
            <h2>
              Come hungry.<br />
              <em>Leave happy.</em>
            </h2>
          </div>
          <p>
            The official Sign menu featuring our signature Angus smash meals, morning breakfast sandwiches, crispy sides, and sweet desserts. Click any item for details.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="menu-category-nav" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`category-pill ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="menu-grid" ref={menuGridRef}>
          {displayedItems.map((item, index) => (
            <article
              className={`menu-card card-${index + 1}`}
              key={item.name}
              onClick={() => setSelectedItem(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setSelectedItem(item)
              }}
            >
              <div className="menu-image-wrap official-menu-wrap">
                <img
                  src={item.image}
                  alt={item.name}
                  loading={index > 3 ? 'lazy' : 'eager'}
                  className="official-product-img"
                />
                <span className="menu-tag">{item.tag}</span>
                <div className="menu-card-hover-overlay">
                  <span>View Details & Nutrition</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="menu-card-info">
                <div>
                  <h3>{item.name}</h3>
                  <p className="card-sub-info">
                    {item.kcal} {item.nameAr && <span className="arabic-name">· {item.nameAr}</span>}
                  </p>
                </div>
                <strong>
                  {item.price} <small>SR</small>
                </strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* REAL Interactive Google Map Component */}
      <GoogleMapSection />

      {/* Official Sign Burger Mobile App Section */}
      <AppDownloadSection />

      {/* Customer & Press Reviews */}
      <div id="reviews">
        <ReviewsSection />
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <a className="brand footer-brand" href="#top">
            <span>Sign</span>
            <i>®</i>
          </a>
          <h2>
            Good food.<br />
            <em>Good sign.</em>
          </h2>
          <div className="footer-action-wrap">
            <a className="button button-pink" href="#app">
              Order on Mobile App <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Footer App Badges Row */}
        <div className="footer-app-badges-row">
          <div className="footer-app-text">
            <span>Download Sign Burger App for iPhone & Android:</span>
          </div>
          <div className="footer-badges-group">
            <a
              href={APPLE_APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-badge-link"
              title="Sign Burger on App Store"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.9.04-2 .6-2.65 1.36-.58.67-1.09 1.74-.96 2.78 1.01.08 2.06-.52 2.69-1.27z" />
              </svg>
              <span>App Store</span>
            </a>
            <a
              href={GOOGLE_PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-badge-link"
              title="Sign Burger on Google Play"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a2.235 2.235 0 0 1-.61-.926V2.74c.14-.367.355-.688.609-.926zm11.242 11.245l2.094-2.094L4.858 3.513l10.373 9.873.38-.327.38.327-.38.327zm-1.06 1.06l-2.094 2.094 7.247 4.14-5.153-6.234zm5.556-3.06l2.977 1.701c.907.518.907 1.36 0 1.878l-2.977 1.7-2.39-2.64 2.39-2.639z" />
              </svg>
              <span>Google Play</span>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Sign Restaurant (signsa.com) · Kingdom of Saudi Arabia</p>
          <div className="socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <span aria-hidden="true">◎</span> Instagram
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TikTok ↗</a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">X ↗</a>
          </div>
          <a
            href="#top"
            className="back-top"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            Back to top <ArrowUpRight />
          </a>
        </div>
      </footer>

      {/* Interactive Item Modal (Nutrition, Ingredients & Direct App Order) */}
      <ItemModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </main>
  )
}
