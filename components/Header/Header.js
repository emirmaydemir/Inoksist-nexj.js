// components/Header.js
"use client"; // Header bileşenini client bileşeni olarak işaretleyin

import React, { useRef, useState, useEffect } from "react";
import image from "@/assets/all-images/inoksist.png";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link"; // Next.js Link bileşeni
import "@/styles/header.css";
import allProducts from "@/assets/data/allProducts";
import LanguageChanger from "@/components/LanguageChanger"; // Yeni dil değiştirici

const socialLinks = [
  {
    url: "https://www.trendyol.com/inoksist",
    icon: "ri-shopping-cart-line",
    display: "trendyol",
  },
  {
    url: "https://www.instagram.com/inoksistendustriyel/",
    icon: "ri-instagram-line",
    display: "instagram",
  },
  {
    url: "https://www.linkedin.com/inoksist/",
    icon: "ri-linkedin-line",
    display: "linkedin",
  },
  {
    url: "https://maps.app.goo.gl/1Fprbr4QfXuRa9j76",
    icon: "ri-map-pin-line",
    display: "maps",
  },
];

const Header = ({ navLinks, search }) => {
  const menuRef = useRef(null);
  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  // --ARAMA İÇİN--
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const resultsRef = useRef(null);
  const searchBoxRef = useRef(null);

  // Arama fonksiyonu
  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setSearchTerm(searchQuery);

    if (searchQuery.trim()) {
      const results = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  // Tıklama dışı olaylarını kontrol etme
  const handleClickOutside = (event) => {
    if (
      resultsRef.current &&
      !resultsRef.current.contains(event.target) &&
      searchBoxRef.current &&
      !searchBoxRef.current.contains(event.target)
    ) {
      setSearchResults([]);
    }
  };

  // Seçim yapıldığında arama sonuçlarını temizleme
  const handleResultClick = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      {/* ============ header top ============ */}
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="8" md="8" sm="8">
              <div className="header__top__left">
                <Link href="/home" className="header__top__help">
                  <img
                    src={image}
                    alt="İnoksist"
                    className="header__top__logo"
                    aria-label="Ana Sayfaya Git"
                  />
                </Link>
                <a
                  href="mailto:info@inoksist.com.tr"
                  className="header__top__help"
                >
                  <i className="ri-mail-fill"></i> info@inoksist.com.tr
                </a>
                <a href="tel:+902125497055" className="header__top__help">
                  <i className="ri-phone-fill"></i> +90 (212) 549 70 55
                </a>
              </div>
            </Col>

            <Col lg="4" md="4" sm="4">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-4">
                {socialLinks.map((item, index) => (
                  <a
                    href={item.url}
                    key={index}
                    className="d-flex align-items-center gap-1"
                    aria-label={`${item.display} sayfamızı ziyaret edin`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={item.icon}></i>
                  </a>
                ))}
                {/* Bayrak değiştirici */}
                <LanguageChanger className="flag-btn" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}
      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <div className="nav__item-container" key={index}>
                    <Link
                      href={item.path}
                      aria-label={`${item.display} sayfasına git`}
                      className={(navClass) =>
                        navClass.isActive
                          ? "nav__active nav__item"
                          : "nav__item"
                      }
                    >
                      {item.display}
                    </Link>

                    {/* Eğer alt menü varsa göster */}
                    {item.subMenu && (
                      <div className="sub__menu">
                        {item.subMenu.map((subItem, subIndex) => (
                          <Link
                            href={subItem.path}
                            className="sub__menu-item"
                            key={subIndex}
                            aria-label={`Kategorimizdeki ${subItem.display} sayfasına git`}
                          >
                            {subItem.display}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {/* Bayrak değiştirici */}
                <LanguageChanger className="flag-btn2" />
              </div>
            </div>

            {/* Arama kutusu */}
            <div className="nav__right">
              <div className="search__box" ref={searchBoxRef}>
                <input
                  type="text"
                  placeholder={search.display}
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>

              {/* Arama sonuçlarını göster */}
              {searchResults.length > 0 && (
                <div className="search-results" ref={resultsRef}>
                  {searchResults.map((product, index) => (
                    <Link
                      href={`/products/${product.category}/${product.name}`}
                      key={index}
                      className="search-result-card"
                      onClick={handleResultClick}
                      aria-label={`${product.name} ürününün detaylarını görüntüle`}
                    >
                      <img src={product.imgUrl} alt={product.name} />
                      <p>{product.name}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
