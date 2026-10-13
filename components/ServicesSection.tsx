'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Service } from '@/types';

interface ServicesSectionProps {
  services?: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Reference items matching the exact design provided
  const featuredServices = [
    {
      id: 'accounting-bookkeeping',
      title: 'Accounting & Bookkeeping',
      description:
        'Accurate and up-to-date financial records to help you make informed decisions.',
      imageUrl: '/images/service-accounting.jpg',
      link: '/services/bookkeeping-and-accounting',
    },
    {
      id: 'tax-planning-gst',
      title: 'Tax Planning & GST',
      description:
        'Strategic tax planning and end-to-end GST compliance for businesses and individuals.',
      imageUrl: '/images/service-tax-gst.jpg',
      link: '/services/gst-filing',
    },
    {
      id: 'audit-assurance',
      title: 'Audit & Assurance',
      description:
        'Independent audit and assurance services to ensure transparency and trust.',
      imageUrl: '/images/service-audit-assurance.jpg',
      link: '/services/audit-and-assurance',
    },
  ];

  // Auto-sliding effect strictly for mobile screens (< 768px)
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused && typeof window !== 'undefined' && window.innerWidth < 768) {
        setActiveIndex((prev) => {
          const next = (prev + 1) % featuredServices.length;
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
  }, [isPaused, featuredServices.length]);

  // Track active slide on manual swipe
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      if (container.clientWidth > 0) {
        const newIndex = Math.round(container.scrollLeft / container.clientWidth);
        if (
          newIndex >= 0 &&
          newIndex < featuredServices.length &&
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

  return (
    <section className="w-full bg-[#FFFFFF] py-8 sm:py-12 lg:py-16 border-b border-gray-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            {/* Eyebrow with gold accent line */}
            <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
              <span className="text-[10.5px] sm:text-xs font-bold uppercase tracking-wider text-[#D97706]">
                OUR SERVICES
              </span>
              <span className="w-7 sm:w-10 h-[1.5px] bg-[#D97706]" />
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-[#071A3D] font-serif tracking-tight leading-tight">
              How we help your business
            </h2>
          </div>

          {/* View All Services Link */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors group flex-shrink-0"
            >
              <span>View all services</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 1. Laptop & Desktop View: Normal 3-Column Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
          {featuredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Image Container with subtle hover zoom */}
              <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden">
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
              </div>

              {/* Card Body */}
              <div className="p-5 lg:p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg lg:text-xl font-bold text-[#071A3D] mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-[13.5px] lg:text-sm text-gray-600 leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>

                <Link
                  href={service.link}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors group/link mt-auto"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
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
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="w-full min-w-full flex-shrink-0 snap-center px-1"
              >
                <div className="group bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col w-full">
                  {/* Image Container */}
                  <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden">
                    <Image
                      src={service.imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#071A3D] mb-1.5 leading-snug">
                        {service.title}
                      </h3>

                      <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed mb-3">
                        {service.description}
                      </p>
                    </div>

                    <Link
                      href={service.link}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors mt-auto"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Dots Pagination for Mobile Auto-Slider */}
          <div className="flex items-center justify-center gap-2 mt-3.5">
            {featuredServices.map((service, idx) => (
              <button
                key={service.id}
                type="button"
                onClick={() => scrollToCard(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? 'w-6 bg-[#F59E0B]'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
