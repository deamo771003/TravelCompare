import { Request } from 'express'
import { CallbackError } from '../interfaces/error-interface'
import { Itinerary, sequelize } from '../db/models'

type SuccessCallback = (err: CallbackError | null, data?: any) => void

const itineraryService = {
  getIndexData: (req?: Request, cb?: SuccessCallback) => {
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
      ) AS favoriteCount
      FROM Itineraries AS I
      LEFT JOIN Origins AS O ON I.originId = O.id
      LEFT JOIN Countries AS C ON I.countryId = C.id
      LEFT JOIN Agencies AS A ON I.agencyId = A.id
      ORDER BY FavoriteCount DESC;
    `
    sequelize.query(query, { model: Itinerary, mapToModel: true })
      .then(itinerary => {
        if (cb) {
          cb(null, {
          status: 'success',
          user: itinerary
        })
        }
      })
      .catch(err => {
        if (cb) {
          cb(err as CallbackError)
        }
      })
  }
}

export default itineraryService