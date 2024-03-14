"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../db/models");
const itineraryService = {
    //! HTTP 請求回傳的資料通常會用 cb ，所以箭頭函式沒有 return 任何值，故給函數返回類型是 void
    getIndexData: (req, cb) => {
        // 抓出前 10 名最多人加入 Favorite 的 Itinerary
        // 取出 Itinerary 表 include model Favorite.count
        const query = `
      SELECT TOP 10 
      I.id,
      I.name,
      I.startDate,
      I.endDate,
      I.cost,
      I.details,
      I.image,
      I.formed,
      O.name AS originName,
      C.name AS countryName,
      A.name AS agencyName,
      (
        SELECT COUNT(*)
        FROM Favorites AS F
        WHERE F.itineraryId = I.id
      ) AS favoriteCount
      FROM Itineraries AS I
      LEFT JOIN Origins AS O ON I.originId = O.id
      LEFT JOIN Countries AS C ON I.countryId = C.id
      LEFT JOIN Agencies AS A ON I.agencyId = A.id
      ORDER BY FavoriteCount DESC;
    `;
        models_1.sequelize.query(query, { model: models_1.Itinerary, mapToModel: true })
            //! TS 無法判別 db query 出的資料型別有哪些只能使用 any，在 cb 再行定義
            .then((itineraries) => {
            cb(null, {
                status: 'success',
                user: itineraries
            });
        })
            .catch(err => {
            cb(err);
        });
    }
};
exports.default = itineraryService;
