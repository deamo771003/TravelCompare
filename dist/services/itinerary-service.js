"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../db/models");
const itineraryService = {
    getIndexData: (req, cb) => {
        // 抓出前10 名最多人加入Favorite 的Itinerary
        // 取出Itinerary 表include model Favorite.count
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
      ) AS FavoriteCount
      FROM Itineraries AS I
      LEFT JOIN Origins AS O ON I.originId = O.id
      LEFT JOIN Countries AS C ON I.countryId = C.id
      LEFT JOIN Agencies AS A ON I.agencyId = A.id
      ORDER BY FavoriteCount DESC;
    `;
        models_1.sequelize.query(query, { model: models_1.Itinerary, mapToModel: true })
            .then(itinerary => {
            if (cb) {
                cb(null, {
                    status: 'success',
                    user: itinerary
                });
            }
        })
            .catch(err => {
            if (cb) {
                cb(err);
            }
        });
    }
};
exports.default = itineraryService;
