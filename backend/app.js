import express from "express";
import mariadb from "mariadb";
import cors from "cors";

const DUMMY_FASTENER_DATA = [
  {
    id: 18,
    name: {
      tr: "DIN 1587 Kör Somun",
      en: "DIN 1587 Hexagon Domed Cap Nuts High Type",
    },
    title2: {
      tr: "Kör Somun",
      en: "Hexagon Domed Cap Nuts",
    },
    title3: {
      tr: "Kör Somun",
      en: "Cap Nuts",
    },
    images: [
      "https://res.cloudinary.com/di9qvtepw/image/upload/q_auto/v1726932479/1_qi56ao.jpg",
      "https://res.cloudinary.com/di9qvtepw/image/upload/q_auto/v1726932479/2_lvp8ms.jpg",
    ],
    imgUrl:
      "https://res.cloudinary.com/di9qvtepw/image/upload/q_auto/v1726932479/1_qi56ao.jpg",
    categoryId: 1,
    category: "fastenerData",
    description: {
      tr: "Türkçe açıklama",
      en: "English description",
    },
    specifications: [
      {
        headers: ["d", "m", "h", "s", "e", "⬢"],
        data: [
          ["M3", "2,4", "7", "5,5", "6,01", "5,5", "5,5"],
          // Diğer satırlar burada
        ],
      },
    ],
  },
  // Diğer ürünler
];

// MariaDB bağlantısı
const pool = mariadb.createPool({
  host: "localhost:3306", // Plesk'e göre MariaDB host
  user: "inoksist_com_tr_inoksist", // MariaDB kullanıcı adı
  password: "inoksist123", // MariaDB şifresi
  database: "inoksist_com_tr_db_inoksist", // MariaDB'deki veritabanı adı
  connectionLimit: 5, // Maksimum bağlantı sayısı
});

function initDb() {
  db.prepare(
    `CREATE TABLE IF NOT EXISTS fastenerData (
      id INTEGER PRIMARY KEY,
      name_tr TEXT,
      name_en TEXT,
      title2_tr TEXT,
      title2_en TEXT,
      title3_tr TEXT,
      title3_en TEXT,
      imgUrl TEXT,
      images TEXT,
      categoryId INTEGER,
      category TEXT,
      description_tr TEXT,
      description_en TEXT,
      specifications TEXT)`
  ).run();
}

function insertFastenerData() {
  const insert = db.prepare(`
    INSERT INTO fastenerData (
      id, name_tr, name_en, title2_tr, title2_en, title3_tr, title3_en, imgUrl, images, categoryId, category, description_tr, description_en, specifications
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  DUMMY_FASTENER_DATA.forEach((data) => {
    insert.run(
      data.id,
      data.name.tr,
      data.name.en,
      data.title2.tr,
      data.title2.en,
      data.title3.tr,
      data.title3.en,
      data.imgUrl,
      JSON.stringify(data.images),
      data.categoryId,
      data.category,
      data.description.tr,
      data.description.en,
      JSON.stringify(data.specifications)
    );
  });
}

app.get("/fasteners", (req, res) => {
  const fasteners = db.prepare("SELECT * FROM fastenerData").all();
  res.json(fasteners);
});
