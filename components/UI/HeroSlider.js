"use client";
import React from "react";
import Slider from "react-slick";
import { Container } from "reactstrap";
import Link from "next/link"; // Next.js Link kullanımı

import "@/styles/hero-slider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSlider = ({ sliderContent }) => {
  const settings = {
    fade: true,
    speed: 1800,
    autoplaySpeed: 3000,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };

  return (
    <Slider {...settings} className="hero__slider">
      {sliderContent.map((slide, index) => (
        <div
          key={index}
          className={`slider__item slider__item-0${index + 1} mt0`}
        >
          <Container>
            <div className="slider__content ">
              <h4 className="text-light mb-3">{slide.title}</h4>
              <h1 className="text-light mb-4">{slide.heading}</h1>
              <button className="btn reserve__btn mt-4">
                <Link href={slide.link} aria-label="İletişim sayfasına git">
                  {slide.buttonText} {/* <a> etiketini kaldırın */}
                </Link>
              </button>
            </div>
          </Container>
        </div>
      ))}
    </Slider>
  );
};

export default HeroSlider;
