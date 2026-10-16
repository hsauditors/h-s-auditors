'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Service } from '@/types';

interface ServicesSectionProps {
  services?: Service[];
}

function getServiceImage(service: Service): string {
  if (service.image_url) return service.image_url;
  const slug = (service.slug || '').toLowerCase();
  if (slug.includes('audit')) return '/images/service-audit-assurance.jpg';
  if (slug.includes('tax') || slug.includes('gst')) return '/images/service-tax-gst.jpg';
  return '/images/service-accounting.jpg';
}

export function ServicesSection({ services = [] }: ServicesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const displayServices = (services || []).filter((s) => s.is_active !== false);

  // Auto-sliding effect strictly for mobile screens (< 768px)
  useEffect(() => {
    if (displayServices.length <= 1) return;

    const timer = setInterval(() => {
      if (!isPaused && typeof window !== 'undefined' && window.innerWidth < 768) {
        setActiveIndex((prev) => {
          const next = (prev + 1) % displayServices.length;
          if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            container.scrollTo({
              left: next * container.clientWidth,
              behavior: 'smooth',
            });
          }
          return next;
        });
      }
    }, 3200);

    return () => clearInterval(timer);
  }, [isPaused, displayServices.length]);

  // Track active slide on manual swipe
  const handleScroll = () => {
    if (scrollContainerRef.current && displayServices.length > 0) {
      const container = scrollContainerRef.current;
      if (container.clientWidth > 0) {
        const newIndex = Math.round(container.scrollLeft / container.clientWidth);
        if (
          newIndex >= 0 &&
          newIndex < displayServices.length &&
          newIndex !== activeIndex
        ) {
          setActiveIndex(newIndex);
        }
      }
    }
  };

  // Jump to specific slide when tapping dot indicators
  const scrollToCard = (idx: number) => {
    setActiveIndex(idx);
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollTo({
        left: idx * container.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleTouchStart = () => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  };

  if (displayServices.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#FFFFFF] py-10 sm:py-14 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-10">
          <div>
            {/* Eyebrow with gold accent line */}
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2.5">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#e6c645]">
                CORE PRACTICE AREAS
              </span>
            </div>

            {/* Title - formatted in two lines on mobile */}
            <h2 className="text-[21px] xs:text-2xl sm:text-3xl lg:text-[38px] font-bold text-[#2b2d54] tracking-tight leading-[1.2] max-w-[210px] xs:max-w-[240px] sm:max-w-none">
              Accounting, Audit &amp; <br className="sm:hidden" />
              Advisory
            </h2>
          </div>

          <div className="flex items-center flex-shrink-0 pb-1 sm:pb-1.5">
            <Link
              href="/services"
              className="inline-flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-semibold text-[#2b2d54] hover:text-[#e6c645] transition-colors group whitespace-nowrap"
            >
              <span>View all services</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#fcdd5e] transition-transform duration-150 group-hover:translate-x-1 flex-shrink-0" />
            </Link>
          </div>
        </div>

        {/* 1. Laptop & Desktop View: Curated Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayServices.map((service, idx) => {
            const imageUrl = getServiceImage(service);
            const linkHref = service.cta_url || `/services#${service.slug}`;
            const serviceIndex = String(idx + 1).padStart(2, '0');

            return (
              <div
                key={service.id || service.slug}
                className="group bg-white rounded-2xl shadow-[0_4px_20px_rgba(10,19,34,0.04)] hover:shadow-[0_16px_36px_rgba(10,19,34,0.08)] transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image Container with subtle hover zoom */}
                <div className="relative w-full aspect-[16/10] bg-stone-100 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={service.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Card Body */}
                <div className="p-5 lg:p-6 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    {/* Category Index Tag */}
                    <span className="text-[10px] font-mono tracking-widest text-[#2b2d54] uppercase font-bold block mb-1.5">
                      SERVICE {serviceIndex}
                    </span>

                    <h3 className="text-lg lg:text-xl font-bold text-[#2b2d54] mb-2 leading-snug group-hover:text-[#2b2d54] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-[13.5px] lg:text-sm text-slate-600 leading-relaxed mb-5 font-normal">
                      {service.short_description || service.long_description}
                    </p>
                  </div>

                  <Link
                    href={linkHref}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#2b2d54] hover:text-[#e6c645] transition-colors group/link mt-auto pt-3"
                  >
                    <span>{service.cta_text || 'Learn More'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#fcdd5e] transition-transform duration-150 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Mobile View (< md): Auto-Sliding Carousel with Indicators */}
        <div className="block md:hidden">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="flex overflow-x-auto pb-3 pt-1 snap-x snap-mandatory scroll-smooth scrollbar-none w-full"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayServices.map((service, idx) => {
              const imageUrl = getServiceImage(service);
              const linkHref = service.cta_url || `/services#${service.slug}`;
              const serviceIndex = String(idx + 1).padStart(2, '0');

              return (
                <div
                  key={service.id || service.slug}
                  className="w-full min-w-full flex-shrink-0 snap-center px-1"
                >
                  <div className="group bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col w-full">
                    {/* Image Container */}
                    <div className="relative w-full aspect-[16/10] bg-stone-100 overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={service.title}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="100vw"
                      />
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-[#2b2d54] uppercase font-bold block mb-1">
                          SERVICE {serviceIndex}
                        </span>

                        <h3 className="text-base sm:text-lg font-bold text-[#2b2d54] mb-1.5 leading-snug">
                          {service.title}
                        </h3>

                        <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-3">
                          {service.short_description || service.long_description}
                        </p>
                      </div>

                      <Link
                        href={linkHref}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#2b2d54] hover:text-[#e6c645] transition-colors mt-auto pt-2"
                      >
                        <span>{service.cta_text || 'Learn More'}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#fcdd5e]" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Dots Pagination for Mobile Auto-Slider */}
          {displayServices.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              {displayServices.map((service, idx) => (
                <button
                  key={service.id || service.slug || idx}
                  type="button"
                  onClick={() => scrollToCard(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? 'w-6 bg-[#fcdd5e]'
                      : 'w-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
