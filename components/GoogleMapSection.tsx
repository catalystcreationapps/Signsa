'use client'

import { useState, useRef } from 'react'
import { MapPin, Clock3, Phone, Navigation, Copy, Check, ExternalLink, ShieldCheck, Search } from 'lucide-react'
import gsap from 'gsap'

export interface Branch {
  id: string
  name: string
  nameAr: string
  neighborhood: string
  address: string
  hours: string
  phone: string
  query: string
  googleMapsUrl: string
  features: string[]
  status: string
}

export const officialBranchesData: Branch[] = [
  {
    id: 'king-fahd',
    name: 'King Fahd Road',
    nameAr: 'طريق الملك فهد - العارض',
    neighborhood: 'Al Arid / North Riyadh',
    address: 'King Fahd Rd, Al Arid, Riyadh 11543, Saudi Arabia',
    hours: 'Open daily · 6:00 AM — 4:00 AM (Breakfast & Late Night)',
    phone: '+966 9200 33494',
    query: 'Sign Burger, King Fahd Rd, Al Arid, Riyadh',
    googleMapsUrl: 'https://maps.app.goo.gl/2s5W1LRU7fgkkEoU8',
    features: ['Drive-Thru', 'Morning Breakfast', 'Dine-In', '22h Service'],
    status: 'Open Now',
  },
  {
    id: 'al-thoumamah',
    name: 'Al Thoumamah Road',
    nameAr: 'طريق الثمامة - الياسمين',
    neighborhood: 'Al Yasmin / Sahafah',
    address: 'Al Thoumamah Rd 3534, Riyadh 13315, Saudi Arabia',
    hours: 'Open daily · 6:00 AM — 4:00 AM',
    phone: '+966 9200 33494',
    query: 'Sign Burger, Al Thoumamah Rd, Riyadh',
    googleMapsUrl: 'https://maps.app.goo.gl/iwi41Tk4cY4vwNTm9',
    features: ['Curbside Pickup', 'Outdoor Seating', 'Dine-In', 'Drive-Thru'],
    status: 'Open Now',
  },
  {
    id: 'an-nasr',
    name: 'An Nasr Road',
    nameAr: 'طريق النصر',
    neighborhood: 'South Riyadh',
    address: '2565 An Nasr Road, 8374, Riyadh 14515, Saudi Arabia',
    hours: 'Open daily · 6:00 AM — 4:00 AM',
    phone: '+966 9200 33494',
    query: 'Sign Burger, 2565 An Nasr Road, Riyadh',
    googleMapsUrl: 'https://maps.app.goo.gl/m2UQnENaPbiT4SiP8',
    features: ['Drive-Thru', 'Dine-In', 'Takeaway', 'Breakfast Menu'],
    status: 'Open Now',
  },
  {
    id: 'al-suwaidi',
    name: 'Al Suwaidi Al Gharbi',
    nameAr: 'الدائري الجنوبي - السويدي الغربي',
    neighborhood: 'South Ring Road',
    address: 'Southern Ring Branch Rd, Al Suwaidi Al Gharbi, Riyadh 12993, Saudi Arabia',
    hours: 'Open daily · 6:00 AM — 4:00 AM',
    phone: '+966 9200 33494',
    query: 'Sign Burger, Southern Ring Branch Rd, Al Suwaidi, Riyadh',
    googleMapsUrl: 'https://maps.app.goo.gl/vkgYsDLd9WZUT91b9',
    features: ['Drive-Thru', 'Family Section', 'Dine-In'],
    status: 'Open Now',
  },
  {
    id: 'ishbiliyah',
    name: 'Ishbiliyah',
    nameAr: 'إشبيلية - طريق الشيخ جابر',
    neighborhood: 'East Riyadh',
    address: 'Al Sheikh Jaber Al Ahmad Al Sabah, Ishbiliyah, Riyadh 13236, Saudi Arabia',
    hours: 'Open daily · 6:00 AM — 4:00 AM',
    phone: '+966 9200 33494',
    query: 'Sign Burger, Al Sheikh Jaber, Ishbiliyah, Riyadh',
    googleMapsUrl: 'https://maps.app.goo.gl/3DRZTYTpK3qqt62V9',
    features: ['Drive-Thru', 'Takeaway', 'Dine-In', 'Breakfast & Burgers'],
    status: 'Open Now',
  },
  {
    id: 'dhahrat-laban',
    name: 'Dhahrat Laban',
    nameAr: 'ظهرة لبن - شارع الطائف',
    neighborhood: 'West Riyadh',
    address: '4722 Al Taif St, Dhahrat Laban, Riyadh 13753, Saudi Arabia',
    hours: 'Open daily · 6:00 AM — 4:00 AM',
    phone: '+966 9200 33494',
    query: 'Sign Burger, Al Taif St, Dhahrat Laban, Riyadh',
    googleMapsUrl: 'https://maps.app.goo.gl/WPcnBNYbPyFUZ5hL9',
    features: ['Drive-Thru', 'Quick Curbside', 'Dine-In'],
    status: 'Open Now',
  },
]

export default function GoogleMapSection() {
  const [activeBranchIndex, setActiveBranchIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const [mapLoading, setMapLoading] = useState(true)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const infoCardRef = useRef<HTMLDivElement>(null)

  const activeBranch = officialBranchesData[activeBranchIndex]

  const handleBranchChange = (index: number) => {
    if (index === activeBranchIndex) return

    setMapLoading(true)

    // GSAP animated transition
    if (mapContainerRef.current && infoCardRef.current) {
      gsap.to(infoCardRef.current, {
        opacity: 0.25,
        y: 8,
        duration: 0.2,
        onComplete: () => {
          setActiveBranchIndex(index)
          gsap.to(infoCardRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: 'power2.out',
          })
        },
      })
    } else {
      setActiveBranchIndex(index)
    }
  }

  const handleCopyAddress = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(activeBranch.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    }
  }

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    activeBranch.query
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`

  return (
    <section className="branches section-pad" id="branches">
      <div className="section-kicker">
        <span>03</span>
        <span>FIND YOUR SIGN IN RIYADH & KSA</span>
      </div>

      <div className="branches-layout">
        <div className="branches-info-col">
          <span className="eyebrow-accent">38 Branches Across Saudi Arabia</span>
          <h2>
            Your table<br />
            <em>is waiting.</em>
          </h2>
          <p>
            Whether it&apos;s a 6 AM fresh Halloumi or Falafel morning breakfast, or a late-night Angus Beef smash burger, our 38 branches across Saudi Arabia are ready to welcome you.
          </p>

          <div className="branch-tabs" role="tablist" aria-label="Sign restaurant branches">
            {officialBranchesData.map((branch, index) => {
              const isActive = activeBranchIndex === index
              return (
                <button
                  key={branch.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`branch-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => handleBranchChange(index)}
                >
                  <div className="branch-tab-text">
                    <span className="branch-name">{branch.name}</span>
                    <span className="branch-sub">{branch.neighborhood} · {branch.nameAr}</span>
                  </div>
                  <Navigation className="branch-arrow" aria-hidden="true" />
                </button>
              )
            })}
          </div>

          <div className="branch-quick-stats">
            <div className="stat-pill">
              <ShieldCheck className="stat-icon" />
              <span>Official Branches from SignSA.com</span>
            </div>
            <div className="stat-pill">
              <Clock3 className="stat-icon" />
              <span>Hours: 6:00 AM — 4:00 AM (Breakfast + Lunch + Dinner)</span>
            </div>
          </div>
        </div>

        {/* Real Interactive Google Map Card */}
        <div className="map-wrapper" ref={mapContainerRef}>
          <div className="map-header-bar">
            <div className="live-pill">
              <span className="live-dot" />
              <span>{activeBranch.status}</span>
            </div>
            <span className="map-label-tag">Google Maps Live View</span>
            <a
              href={activeBranch.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="open-gmaps-link"
              title="Open branch in Google Maps App"
            >
              Open in Google Maps <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="map-frame-container">
            {mapLoading && (
              <div className="map-skeleton">
                <div className="map-spinner" />
                <span>Loading Google Maps location...</span>
              </div>
            )}
            <iframe
              title={`Google Map showing ${activeBranch.name} branch`}
              src={mapEmbedUrl}
              className="google-map-iframe"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setMapLoading(false)}
            />
          </div>

          {/* Interactive Details Overlay Card */}
          <div className="map-card-copy" ref={infoCardRef}>
            <div className="card-top-row">
              <span className="branch-badge">NOW SERVING · {activeBranch.neighborhood.toUpperCase()}</span>
              <span className="branch-arabic-tag">{activeBranch.nameAr}</span>
            </div>

            <b className="branch-title">{activeBranch.name}</b>

            <p className="branch-address">
              <MapPin className="address-icon" />
              <span>{activeBranch.address}</span>
            </p>

            <div className="branch-meta-row">
              <small className="branch-hours">
                <Clock3 className="w-3.5 h-3.5" />
                {activeBranch.hours}
              </small>
              <a href={`tel:${activeBranch.phone}`} className="branch-phone-link">
                <Phone className="w-3.5 h-3.5" />
                {activeBranch.phone}
              </a>
            </div>

            <div className="branch-features-tags">
              {activeBranch.features.map((feat) => (
                <span key={feat} className="feature-chip">{feat}</span>
              ))}
            </div>

            <div className="map-actions-group">
              <a
                href={activeBranch.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button-directions"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <button
                type="button"
                className="button-copy-address"
                onClick={handleCopyAddress}
                aria-label="Copy branch address"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
