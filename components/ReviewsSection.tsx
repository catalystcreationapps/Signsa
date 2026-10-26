'use client'

import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    quote: "Sign completely redefined what a quick burger experience in Riyadh should feel like. The beef is seasoned to perfection.",
    author: "Time Out Riyadh",
    role: "Food & Drink Awards",
    rating: 5,
  },
  {
    quote: "The Sign Beef Meal with signature fries is our weekend family staple. Never disappoints, always hot and incredibly fresh.",
    author: "Faisal Al-Otaibi",
    role: "Riyadh Resident & Food Blogger",
    rating: 5,
  },
  {
    quote: "A local pride. Abeer Al Rajhi turned a genuine passion into one of Saudi Arabia's most loved gourmet burger brands.",
    author: "Arab News Lifestyle",
    role: "Culinary Spotlight",
    rating: 5,
  },
]

export default function ReviewsSection() {
  return (
    <section className="reviews-section section-pad" aria-label="Customer reviews">
      <div className="section-kicker">
        <span>04</span>
        <span>WHAT RIYADH IS SAYING</span>
      </div>

      <div className="reviews-heading">
        <h2>
          Loved across<br />
          <em>the capital.</em>
        </h2>
        <p>
          From late-night cravings in Al Malqa to family weekend boxes in Al Nakheel, here is what makes Sign a Riyadh favourite.
        </p>
      </div>

      <div className="reviews-grid">
        {testimonials.map((t, i) => (
          <div key={i} className="review-card">
            <div className="review-stars">
              {[...Array(t.rating)].map((_, idx) => (
                <Star key={idx} className="w-4 h-4 fill-[#ff7c97] text-[#ff7c97]" />
              ))}
            </div>
            <p className="review-quote">&ldquo;{t.quote}&rdquo;</p>
            <div className="review-author-info">
              <b>{t.author}</b>
              <span>{t.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
